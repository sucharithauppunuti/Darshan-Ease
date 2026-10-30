const mongoose = require('mongoose');

const darshanTypeSchema = new mongoose.Schema(
  {
    temple: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Temple',
      required: [true, 'Temple reference is required']
    },
    name: {
      type: String,
      required: [true, 'Darshan type name is required'],
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    chargePerDevotee: {
      type: Number,
      required: [true, 'Charge per devotee is required'],
      min: [0, 'Charge cannot be negative'],
      default: 0
    },
    pricePerPerson: {
      type: Number,
      min: [0, 'Price per person cannot be negative'],
      default: function () {
        return this.chargePerDevotee || 0;
      }
    },
    currency: {
      type: String,
      default: 'INR'
    },
    eligibility: {
      type: String,
      default: 'Open to all devotees with valid government photo identification'
    },
    duration: {
      type: String,
      default: '30-45 minutes'
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    },
    activeStatus: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    },
    priceVerificationStatus: {
      type: String,
      enum: ['verified', 'demo', 'official', 'unverified'],
      default: 'verified'
    },
    officialSourceUrl: {
      type: String,
      default: ''
    },
    dressCode: {
      type: String,
      default: 'Traditional Indian attire'
    },
    reportingNotice: {
      type: String,
      default: 'Please report 30 minutes prior to slot start time at the reporting counter.'
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual for templeId
darshanTypeSchema.virtual('templeId').get(function () {
  return this.temple;
});

// Middleware to sync chargePerDevotee and pricePerPerson, and status with activeStatus
darshanTypeSchema.pre('save', function (next) {
  if (this.pricePerPerson !== undefined && this.pricePerPerson !== null) {
    this.chargePerDevotee = this.pricePerPerson;
  } else if (this.chargePerDevotee !== undefined) {
    this.pricePerPerson = this.chargePerDevotee;
  }
  if (this.status) {
    this.activeStatus = this.status;
  } else if (this.activeStatus) {
    this.status = this.activeStatus;
  }
  next();
});

darshanTypeSchema.index({ temple: 1, status: 1 });

module.exports = mongoose.model('DarshanType', darshanTypeSchema);

