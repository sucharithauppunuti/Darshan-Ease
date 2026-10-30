const express = require('express');
const router = express.Router();
const {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking
} = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createBooking);
router.get('/my', protect, getMyBookings);
router.get('/my-bookings', protect, getMyBookings);
router.patch('/:id/cancel', protect, cancelBooking);
router.post('/:id/cancel', protect, cancelBooking);
router.get('/:id', protect, getBookingById);

module.exports = router;
