const Temple = require('../models/Temple');
const Booking = require('../models/Booking');
const DarshanSlot = require('../models/DarshanSlot');

const getTodayString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// @desc    Get Admin Dashboard Overview Stats
// @route   GET /api/admin/dashboard-stats
// @access  Private (Admin only)
exports.getDashboardStats = async (req, res, next) => {
  try {
    const todayStr = getTodayString();

    const [
      totalTemples,
      activeTemples,
      totalBookings,
      upcomingBookings,
      todayBookings,
      cancelledBookings,
      recentBookings,
      activeSlots,
      availableSlots,
      fullyBookedSlots
    ] = await Promise.all([
      Temple.countDocuments(),
      Temple.countDocuments({ status: 'active' }),
      Booking.countDocuments(),
      Booking.countDocuments({
        status: 'confirmed',
        'slotSnapshot.date': { $gte: todayStr }
      }),
      Booking.find({
        status: 'confirmed',
        'slotSnapshot.date': todayStr
      }),
      Booking.countDocuments({ status: 'cancelled' }),
      Booking.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .populate('user', 'name email phone')
        .populate('temple', 'name city state'),
      DarshanSlot.countDocuments({ status: 'active' }),
      DarshanSlot.countDocuments({
        status: 'active',
        $expr: { $gt: ['$capacity', '$bookedCount'] }
      }),
      DarshanSlot.countDocuments({
        status: 'active',
        $expr: { $gte: ['$bookedCount', '$capacity'] }
      })
    ]);

    // Calculate today's visitor count
    const todayVisitors = todayBookings.reduce((sum, b) => sum + (b.devoteeCount || 0), 0);

    // Calculate total devotees served
    const confirmedBookings = await Booking.find({ status: { $in: ['confirmed', 'completed'] } });
    const totalDevotees = confirmedBookings.reduce((sum, b) => sum + (b.devoteeCount || 0), 0);

    res.status(200).json({
      success: true,
      stats: {
        totalTemples,
        activeTemples,
        totalBookings,
        upcomingBookings,
        todayVisitors,
        cancelledBookings,
        totalDevotees,
        activeSlots,
        availableSlots,
        fullyBookedSlots,
        totalSlots: activeSlots
      },
      recentBookings
    });
  } catch (err) {
    next(err);
  }
};
