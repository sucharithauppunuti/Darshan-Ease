const DarshanSlot = require('../models/DarshanSlot');
const Temple = require('../models/Temple');
const DarshanType = require('../models/DarshanType');
const Booking = require('../models/Booking');
const Notification = require('../models/Notification');

// Format date as YYYY-MM-DD
const getTodayString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const slotTimings = [
  { startTime: '06:00 AM', endTime: '08:30 AM', capacity: 100 },
  { startTime: '09:00 AM', endTime: '11:30 AM', capacity: 120 },
  { startTime: '01:30 PM', endTime: '04:00 PM', capacity: 80 },
  { startTime: '05:00 PM', endTime: '07:30 PM', capacity: 110 }
];

const ensureSlotsForDate = async (templeId, darshanTypeId, date) => {
  try {
    let types = [];
    if (darshanTypeId) {
      const dt = await DarshanType.findById(darshanTypeId);
      if (dt && dt.status === 'active') types.push(dt);
    } else {
      types = await DarshanType.find({ temple: templeId, status: 'active' });
    }

    for (const dt of types) {
      for (const timing of slotTimings) {
        try {
          await DarshanSlot.findOneAndUpdate(
            {
              temple: templeId,
              darshanType: dt._id,
              date: date,
              startTime: timing.startTime
            },
            {
              $setOnInsert: {
                temple: templeId,
                darshanType: dt._id,
                date: date,
                startTime: timing.startTime,
                endTime: timing.endTime,
                capacity: timing.capacity,
                bookedCount: 0,
                status: 'active'
              }
            },
            { upsert: true, new: true }
          );
        } catch (e) {
          // Ignore collision
        }
      }
    }
  } catch (err) {
    console.error('Error auto-ensuring slots:', err);
  }
};

// @desc    Get slots for a specific temple (optionally filtered by darshanTypeId and date)
// @route   GET /api/temples/:id/slots
// @access  Public
exports.getTempleSlots = async (req, res, next) => {
  try {
    const templeId = req.params.id;
    const { darshanTypeId, date } = req.query;
    const query = { temple: templeId, status: 'active' };
    if (darshanTypeId) query.darshanType = darshanTypeId;
    if (date) query.date = date;
    else query.date = { $gte: getTodayString() };

    let slots = await DarshanSlot.find(query)
      .populate('darshanType', 'name chargePerDevotee pricePerPerson')
      .sort({ date: 1, startTime: 1 });

    // Auto-provision if requested date >= today has no slots scheduled
    if (slots.length === 0 && date && date >= getTodayString()) {
      await ensureSlotsForDate(templeId, darshanTypeId, date);
      slots = await DarshanSlot.find(query)
        .populate('darshanType', 'name chargePerDevotee pricePerPerson')
        .sort({ date: 1, startTime: 1 });
    }

    const formattedSlots = slots.map(slot => {
      const remaining = Math.max(0, slot.capacity - (slot.bookedCount || 0));
      let statusLabel = 'Available';
      if (slot.status === 'blocked') statusLabel = 'Blocked';
      else if (slot.status === 'inactive') statusLabel = 'Inactive';
      else if (remaining <= 0) statusLabel = 'Full';
      else if (remaining / slot.capacity <= 0.25) statusLabel = 'Filling Fast';

      return {
        id: slot._id,
        _id: slot._id,
        temple: slot.temple,
        darshanType: slot.darshanType,
        date: slot.date,
        startTime: slot.startTime,
        endTime: slot.endTime,
        capacity: slot.capacity,
        bookedCount: slot.bookedCount,
        remainingCapacity: remaining,
        status: slot.status,
        availabilityStatus: statusLabel,
        isBookable: slot.status === 'active' && remaining > 0
      };
    });

    res.status(200).json({
      success: true,
      count: formattedSlots.length,
      slots: formattedSlots
    });
  } catch (err) {
    next(err);
  }
};


// @desc    Get slot availability for devotee booking
// @route   GET /api/slots/availability
// @access  Public
exports.getSlotAvailability = async (req, res, next) => {
  try {
    const { templeId, darshanTypeId, date } = req.query;

    if (!templeId || !darshanTypeId || !date) {
      return res.status(400).json({
        success: false,
        message: 'Please provide templeId, darshanTypeId, and date'
      });
    }

    const todayStr = getTodayString();
    if (date < todayStr) {
      return res.status(400).json({
        success: false,
        message: 'Cannot check or book slots for past dates'
      });
    }

    // Verify temple & darshan type are active
    const temple = await Temple.findById(templeId);
    if (!temple || temple.status !== 'active') {
      return res.status(404).json({
        success: false,
        message: 'Temple not found or currently inactive'
      });
    }

    const darshanType = await DarshanType.findById(darshanTypeId);
    if (!darshanType || darshanType.status !== 'active') {
      return res.status(404).json({
        success: false,
        message: 'Darshan type not found or currently inactive'
      });
    }

    // Fetch slots
    let slots = await DarshanSlot.find({
      temple: templeId,
      darshanType: darshanTypeId,
      date
    }).sort({ startTime: 1 });

    // Auto-provision if requested date >= today has no slots scheduled
    if (slots.length === 0 && date >= todayStr) {
      await ensureSlotsForDate(templeId, darshanTypeId, date);
      slots = await DarshanSlot.find({
        temple: templeId,
        darshanType: darshanTypeId,
        date
      }).sort({ startTime: 1 });
    }

    const formattedSlots = slots.map(slot => {
      const remaining = Math.max(0, slot.capacity - (slot.bookedCount || 0));
      let statusLabel = 'Available';
      if (slot.status === 'blocked') statusLabel = 'Blocked';
      else if (slot.status === 'inactive') statusLabel = 'Inactive';
      else if (remaining <= 0) statusLabel = 'Full';
      else if (remaining / slot.capacity <= 0.25) statusLabel = 'Filling Fast';

      return {
        id: slot._id,
        _id: slot._id,
        date: slot.date,
        startTime: slot.startTime,
        endTime: slot.endTime,
        capacity: slot.capacity,
        bookedCount: slot.bookedCount,
        remainingCapacity: remaining,
        status: slot.status,
        availabilityStatus: statusLabel,
        isBookable: slot.status === 'active' && remaining > 0
      };
    });

    res.status(200).json({
      success: true,
      date,
      count: formattedSlots.length,
      slots: formattedSlots
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all slots for Admin management
// @route   GET /api/admin/slots
// @access  Private (Admin only)
exports.getAdminSlots = async (req, res, next) => {
  try {
    const { templeId, darshanTypeId, date, status, limit = 100, page = 1 } = req.query;
    const query = {};

    if (templeId) query.temple = templeId;
    if (darshanTypeId) query.darshanType = darshanTypeId;
    if (date) query.date = date;
    if (status && status !== 'all') query.status = status;

    const parsedPage = parseInt(page, 10) || 1;
    const parsedLimit = parseInt(limit, 10) || 100;
    const skip = (parsedPage - 1) * parsedLimit;

    const total = await DarshanSlot.countDocuments(query);
    const slots = await DarshanSlot.find(query)
      .populate('temple', 'name city state')
      .populate('darshanType', 'name chargePerDevotee')
      .sort({ date: -1, startTime: 1 })
      .skip(skip)
      .limit(parsedLimit);

    res.status(200).json({
      success: true,
      total,
      currentPage: parsedPage,
      totalPages: Math.ceil(total / parsedLimit),
      slots
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create a new slot
// @route   POST /api/admin/slots
// @access  Private (Admin only)
exports.createSlot = async (req, res, next) => {
  try {
    const { templeId, darshanTypeId, date, startTime, endTime, capacity } = req.body;

    if (!templeId || !darshanTypeId || !date || !startTime || !endTime || !capacity) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required slot fields'
      });
    }

    if (Number(capacity) < 1) {
      return res.status(400).json({
        success: false,
        message: 'Capacity must be at least 1'
      });
    }

    // Check for duplicate slot
    const existing = await DarshanSlot.findOne({
      temple: templeId,
      darshanType: darshanTypeId,
      date,
      startTime
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'A slot already exists for this temple, darshan type, date, and start time'
      });
    }

    const slot = await DarshanSlot.create({
      temple: templeId,
      darshanType: darshanTypeId,
      date,
      startTime,
      endTime,
      capacity: Number(capacity),
      bookedCount: 0,
      status: 'active'
    });

    res.status(201).json({
      success: true,
      message: 'Time slot created successfully',
      slot
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update an existing slot
// @route   PUT /api/admin/slots/:id
// @access  Private (Admin only)
exports.updateSlot = async (req, res, next) => {
  try {
    const { capacity, startTime, endTime } = req.body;
    const slot = await DarshanSlot.findById(req.params.id);

    if (!slot) {
      return res.status(404).json({
        success: false,
        message: 'Time slot not found'
      });
    }

    // Capacity validation: Prevent changes that would reduce capacity below confirmed reservations
    if (capacity !== undefined) {
      const newCapacity = Number(capacity);
      if (newCapacity < slot.bookedCount) {
        return res.status(400).json({
          success: false,
          message: `Cannot reduce capacity to ${newCapacity}. There are already ${slot.bookedCount} confirmed reservations for this slot.`
        });
      }
      slot.capacity = newCapacity;
    }

    if (startTime) slot.startTime = startTime;
    if (endTime) slot.endTime = endTime;

    await slot.save();

    res.status(200).json({
      success: true,
      message: 'Slot updated successfully',
      slot
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update slot status (Active/Blocked/Inactive)
// @route   PATCH /api/admin/slots/:id/status
// @access  Private (Admin only)
exports.updateSlotStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['active', 'blocked', 'inactive'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status must be active, blocked, or inactive'
      });
    }

    const slot = await DarshanSlot.findById(req.params.id)
      .populate('temple', 'name');

    if (!slot) {
      return res.status(404).json({
        success: false,
        message: 'Slot not found'
      });
    }

    slot.status = status;
    await slot.save();

    // If slot is blocked, notify devotees who have confirmed bookings
    if (status === 'blocked') {
      const activeBookings = await Booking.find({
        slot: slot._id,
        status: 'confirmed'
      });

      for (const booking of activeBookings) {
        await Notification.create({
          recipient: booking.user,
          title: `Schedule Alert: Slot Blocked for ${slot.temple.name}`,
          message: `Notice: Slot ${slot.date} (${slot.startTime} - ${slot.endTime}) has been marked as blocked by administration. Please check your booking reference ${booking.bookingReference} or contact helpdesk.`,
          type: 'schedule_change',
          bookingReference: booking.bookingReference
        });
      }
    }

    res.status(200).json({
      success: true,
      message: `Slot status updated to ${status}`,
      slot
    });
  } catch (err) {
    next(err);
  }
};
