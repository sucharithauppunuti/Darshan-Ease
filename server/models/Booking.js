const mongoose = require('mongoose');

const devoteeDetailSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Devotee name is required'],
      trim: true
    },
    age: {
      type: Number,
      required: [true, 'Devotee age is required'],
      min: [1, 'Age must be at least 1'],
      max: [120, 'Age must be valid']
    },
    gender: {
      type: String,
      set: (v) => {
        if (!v) return 'Male';
        const s = String(v).trim().toLowerCase();
        return s === 'female' ? 'Female' : s === 'other' ? 'Other' : 'Male';
      },
      enum: ['Male', 'Female', 'Other', 'male', 'female', 'other'],
      default: 'Male'
    },
    idType: {
      type: String,
      set: (v) => {
        if (!v) return 'Aadhaar';
        const s = String(v).trim();
        return s.charAt(0).toUpperCase() + s.slice(1);
      },
      default: 'Aadhaar'
    },
    idNumber: {
      type: String,
      default: '',
      trim: true
    }
  },
  { _id: false }
);

const bookingSchema = new mongoose.Schema(
  {
    bookingReference: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Devotee user reference is required']
    },
    temple: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Temple',
      required: true
    },
    templeSnapshot: {
      name: { type: String, required: true },
      deity: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      address: { type: String, required: true },
      image: { type: String, default: '' }
    },
    darshanType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DarshanType',
      required: true
    },
    darshanTypeSnapshot: {
      name: { type: String, required: true },
      chargePerDevotee: { type: Number, default: 0 }
    },
    slot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DarshanSlot',
      required: true
    },
    slotSnapshot: {
      date: { type: String, required: true },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true }
    },
    devotees: {
      type: [devoteeDetailSchema],
      required: true,
      validate: [v => Array.isArray(v) && v.length > 0, 'At least one devotee detail is required']
    },
    devoteeCount: {
      type: Number,
      required: true,
      min: [1, 'Devotee count must be at least 1']
    },
    chargePerDevotee: {
      type: Number,
      default: 0
    },
    totalAmount: {
      type: Number,
      default: 0
    },
    contactPhone: {
      type: String,
      required: [true, 'Contact phone number is required'],
      trim: true
    },
    contactEmail: {
      type: String,
      required: [true, 'Contact email is required'],
      trim: true
    },
    paymentStatus: {
      type: String,
      enum: ['free', 'pending', 'paid'],
      default: 'free'
    },
    paymentId: {
      type: String,
      default: ''
    },
    razorpayOrderId: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['requested', 'pending', 'confirmed', 'cancelled', 'completed'],
      default: 'confirmed'
    },
    cancellationReason: {
      type: String,
      default: ''
    },
    cancelledAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

bookingSchema.index({ user: 1, createdAt: -1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ 'slotSnapshot.date': 1 });

module.exports = mongoose.model('Booking', bookingSchema);
