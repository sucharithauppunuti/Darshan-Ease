const express = require('express');
const router = express.Router();
const {
  getNotifications,
  markNotificationAsRead,
  markAllAsRead
} = require('../controllers/notificationController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getNotifications);
router.patch('/read-all', protect, markAllAsRead);
router.patch('/:id/read', protect, markNotificationAsRead);

module.exports = router;
