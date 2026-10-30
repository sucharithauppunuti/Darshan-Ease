const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/adminDashboardController');
const {
  getAdminSlots,
  createSlot,
  updateSlot,
  updateSlotStatus
} = require('../controllers/slotController');
const { getAllDarshanTypes } = require('../controllers/darshanTypeController');
const { getAdminBookings } = require('../controllers/bookingController');
const { protect, authorize, optionalProtect } = require('../middleware/auth');

// Allow viewing dashboard overview analytics before login
router.get('/dashboard-stats', optionalProtect, getDashboardStats);
router.get('/dashboard/stats', optionalProtect, getDashboardStats);

// Administrative operations protected with admin role
router.use(protect, authorize('admin'));

router.get('/slots', getAdminSlots);
router.post('/slots', createSlot);
router.put('/slots/:id', updateSlot);
router.patch('/slots/:id/status', updateSlotStatus);
router.get('/darshan-types', getAllDarshanTypes);
router.get('/bookings', getAdminBookings);

module.exports = router;
