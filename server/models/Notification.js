const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Notification recipient is required']
    },
    title: {
      type: String,
      required: [true, 'Notification title is required'],
      trim: true
    },
    message: {
      type: String,
      required: [true, 'Notification message is required']
    },
    type: {
      type: String,
      enum: ['booking_confirmed', 'booking_cancelled', 'reminder', 'schedule_change', 'system', 'general', 'enquiry_update'],
      default: 'system'
    },
    isRead: {
      type: Boolean,
      default: false
    },
    bookingReference: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

notificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 });

module.exports = mongoose.model('Notification', notificationSchema);
