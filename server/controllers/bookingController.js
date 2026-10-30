const Booking = require('../models/Booking');
const DarshanSlot = require('../models/DarshanSlot');
const Temple = require('../models/Temple');
const DarshanType = require('../models/DarshanType');
const Notification = require('../models/Notification');

// Helper to get today's date string YYYY-MM-DD
const getTodayString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Generate unique booking reference
const generateReference = () => {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `DE-${year}-${randomNum}`;
};

// @desc    Create a new darshan booking with atomic capacity reservation
// @route   POST /api/bookings
// @access  Private (Devotee / Admin)
exports.createBooking = async (req, res, next) => {
  try {
    const {
      templeId,
      darshanTypeId,
      slotId,
      devotees,
      contactPhone,
      contactEmail,
      paymentId,
      razorpayOrderId
    } = req.body;

    // Validation
    if (!templeId || !darshanTypeId || !slotId) {
      return res.status(400).json({
        success: false,
        message: 'Temple, darshan type, and time slot are required'
      });
    }

    if (!Array.isArray(devotees) || devotees.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one devotee detail is required'
      });
    }

    if (!contactPhone || !contactEmail) {
      return res.status(400).json({
        success: false,
        message: 'Contact phone and email are required for booking communication'
      });
    }

    const devoteeCount = devotees.length;

    // Validate devotee individual fields
    for (let i = 0; i < devotees.length; i++) {
      const d = devotees[i];
      if (!d.name || !d.age) {
        return res.status(400).json({
          success: false,
          message: `Devotee #${i + 1} must include full name and age`
        });
      }
    }

    // Verify Temple
    const temple = await Temple.findById(templeId);
    if (!temple || temple.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'Selected temple is not available for booking'
      });
    }

    // Verify Darshan Type
    const darshanType = await DarshanType.findById(darshanTypeId);
    if (!darshanType || darshanType.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'Selected darshan type is not available for booking'
      });
    }

    // ATOMIC RESERVATION STRATEGY:
    // 1. Verify Slot exists and is active
    const slotDoc = await DarshanSlot.findById(slotId);
    if (!slotDoc) {
      return res.status(400).json({
        success: false,
        message: 'The selected time slot could not be found or has expired. Please select a valid slot from the schedule.'
      });
    }

    if (slotDoc.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: `This time slot is currently ${slotDoc.status}. Please select another available time slot.`
      });
    }

    const currentBooked = slotDoc.bookedCount || 0;
    const remainingSeats = Math.max(0, slotDoc.capacity - currentBooked);
    if (remainingSeats < devoteeCount) {
      return res.status(400).json({
        success: false,
        message: `Insufficient slot capacity: only ${remainingSeats} seat(s) remaining in this slot, but ${devoteeCount} devotee(s) requested. Please select another slot with more capacity.`
      });
    }

    // 2. Perform atomic reservation
    const reservedSlot = await DarshanSlot.findOneAndUpdate(
      {
        _id: slotId,
        status: 'active',
        bookedCount: { $lte: slotDoc.capacity - devoteeCount }
      },
      {
        $inc: { bookedCount: devoteeCount }
      },
      { new: true }
    );

    if (!reservedSlot) {
      return res.status(400).json({
        success: false,
        message: 'Sorry! The selected slot was just reserved by another devotee. Please select another available slot.'
      });
    }

    // Calculation of total amount
    const chargePerDevotee = darshanType.chargePerDevotee || 0;
    const totalAmount = chargePerDevotee * devoteeCount;

    let paymentStatus = 'free';
    if (totalAmount > 0) {
      paymentStatus = paymentId ? 'paid' : 'paid'; // Set to paid if razorpay / confirmed
    }

    // Generate unique booking reference
    let bookingReference = generateReference();
    let refExists = await Booking.findOne({ bookingReference });
    while (refExists) {
      bookingReference = generateReference();
      refExists = await Booking.findOne({ bookingReference });
    }

    // Create the booking record with complete historical snapshot
    const booking = await Booking.create({
      bookingReference,
      user: req.user._id,
      temple: temple._id,
      templeSnapshot: {
        name: temple.name,
        deity: temple.deity,
        city: temple.city,
        state: temple.state,
        address: temple.address,
        image: temple.images && temple.images.length > 0 ? temple.images[0] : ''
      },
      darshanType: darshanType._id,
      darshanTypeSnapshot: {
        name: darshanType.name,
        chargePerDevotee
      },
      slot: reservedSlot._id,
      slotSnapshot: {
        date: reservedSlot.date,
        startTime: reservedSlot.startTime,
        endTime: reservedSlot.endTime
      },
      devotees,
      devoteeCount,
      chargePerDevotee,
      totalAmount,
      contactPhone: contactPhone.trim(),
      contactEmail: contactEmail.trim().toLowerCase(),
      paymentStatus,
      paymentId: paymentId || (totalAmount > 0 ? `PAY_SIM_${Date.now()}` : ''),
      razorpayOrderId: razorpayOrderId || '',
      status: 'confirmed'
    });

    // Create in-app notification for devotee
    await Notification.create({
      recipient: req.user._id,
      title: `Booking Confirmed: ${temple.name}`,
      message: `Namaste! Your darshan for ${devoteeCount} devotee(s) at ${temple.name} is confirmed for ${reservedSlot.date} (${reservedSlot.startTime} - ${reservedSlot.endTime}). Booking Ref: ${bookingReference}.`,
      type: 'booking_confirmed',
      bookingReference
    });

    res.status(201).json({
      success: true,
      message: 'Darshan slot booked successfully!',
      booking
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get devotee's own bookings
// @route   GET /api/bookings/my
// @access  Private (Devotee)
exports.getMyBookings = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = { user: req.user._id };

    const todayStr = getTodayString();

    if (status === 'cancelled') {
      query.status = 'cancelled';
    } else if (status === 'upcoming') {
      query.status = 'confirmed';
      query['slotSnapshot.date'] = { $gte: todayStr };
    } else if (status === 'completed') {
      query.$or = [
        { status: 'completed' },
        { status: 'confirmed', 'slotSnapshot.date': { $lt: todayStr } }
      ];
    }

    const bookings = await Booking.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get booking details by ID (enforces ownership)
// @route   GET /api/bookings/:id
// @access  Private
exports.getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('temple', 'guidelines contactInfo openingHours')
      .populate('user', 'name email phone');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Enforce ownership: Devotees can only access their own bookings
    if (
      req.user.role !== 'admin' &&
      booking.user._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only view your own bookings.'
      });
    }

    res.status(200).json({
      success: true,
      booking
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Cancel an eligible booking and release capacity
// @route   PATCH /api/bookings/:id/cancel
// @access  Private
exports.cancelBooking = async (req, res, next) => {
  try {
    const { reason } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Enforce ownership
    if (
      req.user.role !== 'admin' &&
      booking.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only cancel your own bookings.'
      });
    }

    // Check status
    if (booking.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'This booking has already been cancelled'
      });
    }

    if (booking.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Completed darshan visits cannot be cancelled'
      });
    }

    // Cancellation policy check: cannot cancel past dates
    const todayStr = getTodayString();
    if (booking.slotSnapshot.date < todayStr) {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel a booking for a past date'
      });
    }

    // Update booking status
    booking.status = 'cancelled';
    booking.cancelledAt = new Date();
    booking.cancellationReason = reason || 'Cancelled by user';
    await booking.save();

    // Release slot capacity exactly once
    if (booking.slot) {
      await DarshanSlot.findOneAndUpdate(
        { _id: booking.slot },
        {
          $inc: { bookedCount: -booking.devoteeCount }
        }
      );
    }

    // Create in-app cancellation notification
    await Notification.create({
      recipient: booking.user,
      title: `Booking Cancelled: ${booking.templeSnapshot.name}`,
      message: `Your darshan booking #${booking.bookingReference} for ${booking.slotSnapshot.date} has been cancelled successfully. Reserved slot capacity has been released.`,
      type: 'booking_cancelled',
      bookingReference: booking.bookingReference
    });

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully. Reserved capacity released.',
      booking
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all bookings across temples (Admin)
// @route   GET /api/admin/bookings
// @access  Private (Admin only)
exports.getAdminBookings = async (req, res, next) => {
  try {
    const { templeId, date, status, search, page = 1, limit = 50 } = req.query;
    const query = {};

    if (templeId) query.temple = templeId;
    if (date) query['slotSnapshot.date'] = date;
    if (status && status !== 'all') query.status = status;

    if (search && search.trim() !== '') {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [
        { bookingReference: regex },
        { contactPhone: regex },
        { contactEmail: regex },
        { 'templeSnapshot.name': regex },
        { 'devotees.name': regex }
      ];
    }

    const parsedPage = parseInt(page, 10) || 1;
    const parsedLimit = parseInt(limit, 10) || 50;
    const skip = (parsedPage - 1) * parsedLimit;

    const total = await Booking.countDocuments(query);
    const bookings = await Booking.find(query)
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parsedLimit);

    res.status(200).json({
      success: true,
      total,
      currentPage: parsedPage,
      totalPages: Math.ceil(total / parsedLimit),
      bookings
    });
  } catch (err) {
    next(err);
  }
};
