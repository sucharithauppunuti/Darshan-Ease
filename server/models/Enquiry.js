const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    enquiryReference: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    enquiryType: {
      type: String,
      enum: ['Package', 'Custom Plan', 'Pandit Puja', 'Group Darshan', 'Assistance', 'General'],
      default: 'General'
    },
    name: {
      type: String,
      required: [true, 'Devotee name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Contact email is required'],
      trim: true
    },
    phone: {
      type: String,
      required: [true, 'Contact phone is required'],
      trim: true
    },
    destination: {
      type: String,
      default: ''
    },
    templeName: {
      type: String,
      default: ''
    },
    packageTitle: {
      type: String,
      default: ''
    },
    serviceName: {
      type: String,
      default: ''
    },
    preferredDate: {
      type: String,
      default: ''
    },
    travelersCount: {
      type: Number,
      default: 1
    },
    groupSize: {
      type: Number,
      default: 1
    },
    departureCity: {
      type: String,
      default: ''
    },
    budgetPreference: {
      type: String,
      default: 'Standard Comfort'
    },
    specialRequests: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['Requested', 'Pending Confirmation', 'Confirmed', 'Cancelled', 'Completed'],
      default: 'Requested'
    },
    adminNotes: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

enquirySchema.index({ user: 1, createdAt: -1 });
enquirySchema.index({ status: 1 });
enquirySchema.index({ enquiryType: 1 });

module.exports = mongoose.model('Enquiry', enquirySchema);
