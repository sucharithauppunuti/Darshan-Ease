const mongoose = require('mongoose');

const darshanSlotSchema = new mongoose.Schema(
  {
    temple: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Temple',
      required: [true, 'Temple reference is required']
    },
    darshanType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DarshanType',
      required: [true, 'Darshan type reference is required']
    },
    date: {
      type: String, // Stored as YYYY-MM-DD for timezone-safe date matching
      required: [true, 'Slot date is required (YYYY-MM-DD)'],
      trim: true
    },
    startTime: {
      type: String,
      required: [true, 'Start time is required'],
      trim: true
    },
    endTime: {
      type: String,
      required: [true, 'End time is required'],
      trim: true
    },
    capacity: {
      type: Number,
      required: [true, 'Capacity is required'],
      min: [1, 'Capacity must be at least 1']
    },
    bookedCount: {
      type: Number,
      default: 0,
      min: [0, 'Booked count cannot be negative']
    },
    status: {
      type: String,
      enum: ['active', 'blocked', 'inactive'],
      default: 'active'
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual for remaining capacity
darshanSlotSchema.virtual('remainingCapacity').get(function () {
  return Math.max(0, this.capacity - (this.bookedCount || 0));
});

// Virtual for availability label
darshanSlotSchema.virtual('availabilityStatus').get(function () {
  if (this.status === 'blocked') return 'Blocked';
  if (this.status === 'inactive') return 'Inactive';
  const remaining = Math.max(0, this.capacity - (this.bookedCount || 0));
  if (remaining <= 0) return 'Full';
  if (remaining / this.capacity <= 0.25) return 'Filling Fast';
  return 'Available';
});

darshanSlotSchema.index({ temple: 1, darshanType: 1, date: 1, startTime: 1 }, { unique: true });

module.exports = mongoose.model('DarshanSlot', darshanSlotSchema);
