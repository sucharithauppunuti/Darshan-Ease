const mongoose = require('mongoose');

const templeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Temple name is required'],
      trim: true,
      maxlength: 150
    },
    deity: {
      type: String,
      required: [true, 'Main deity is required'],
      trim: true
    },
    category: {
      type: String,
      enum: [
        'Jyotirlinga',
        'Shakti Peeth',
        'Vaishnava',
        'Ganesh',
        'Other Deities',
        'Jyotirlingas',
        'Shakti Peethas',
        'Vaishnava Temples',
        'Lord Ganesha Temples',
        'Other Temples',
        'Lord Ganesha'
      ],
      default: 'Vaishnava'
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    images: {
      type: [String],
      default: []
    },
    address: {
      type: String,
      required: [true, 'Full address is required']
    },
    city: {
      type: String,
      required: [true, 'City is required']
    },
    state: {
      type: String,
      required: [true, 'State is required']
    },
    contactInfo: {
      phone: { type: String, default: '+91 8000 123 456' },
      email: { type: String, default: 'helpdesk@darshanease.com' },
      website: { type: String, default: '' }
    },
    openingHours: {
      type: String,
      default: '06:00 AM - 09:00 PM'
    },
    guidelines: {
      type: String,
      default: 'Traditional dress code required (Dhoti/Kurta for men, Saree/Salwar for women). Electronic items and mobile phones are restricted inside the sanctum.'
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    },
    startingPrice: {
      type: Number,
      default: 0
    },
    isPopular: {
      type: Boolean,
      default: false
    },
    isVerified: {
      type: Boolean,
      default: true
    },
    isDemo: {
      type: Boolean,
      default: true
    },
    trustLabel: {
      type: String,
      enum: ['Official', 'Official Link-out', 'Authorized Partner', 'DarshanEase Verified', 'Information Only'],
      default: 'DarshanEase Verified'
    },
    bookingMode: {
      type: String,
      enum: ['demo_booking', 'official_linkout', 'enquiry_only', 'none'],
      default: 'demo_booking'
    },
    officialUrl: {
      type: String,
      default: ''
    },
    lastReviewedDate: {
      type: String,
      default: '2026-10-12'
    },
    accessibilityNotes: {
      type: String,
      default: 'Wheelchair ramps available at main entrance, special assistance lane for senior citizens and differently abled devotees.'
    },
    crowdLevelInfo: {
      type: String,
      default: 'Moderate crowd (approx. 45-60 min darshan queue)'
    },
    visitingInfo: {
      bestTimeToVisit: { type: String, default: 'October to March' },
      rituals: { type: [String], default: ['Suprabhatam', 'Nithya Puja', 'Maha Aarti', 'Archana'] },
      prasadTimings: { type: String, default: '09:00 AM - 08:30 PM' },
      footwearPolicy: { type: String, default: 'Secure footwear counters available at temple outer complex' }
    },
    sourceVerification: {
      isVerified: { type: Boolean, default: true },
      sourceName: { type: String, default: 'Official Shrine Board & DarshanEase Editorial Team' },
      sourceUrl: { type: String, default: '' },
      verificationNotes: { type: String, default: 'Information verified against recent official shrine notices.' }
    }
  },
  {
    timestamps: true
  }
);

templeSchema.index({ name: 'text', city: 'text', state: 'text', deity: 'text' });
templeSchema.index({ trustLabel: 1 });
templeSchema.index({ category: 1 });

module.exports = mongoose.model('Temple', templeSchema);
