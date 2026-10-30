const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Temple = require('../models/Temple');
const DarshanType = require('../models/DarshanType');
const DarshanSlot = require('../models/DarshanSlot');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/darshanease';

const slotTimings = [
  { startTime: '06:00 AM', endTime: '08:30 AM', capacity: 100 },
  { startTime: '09:00 AM', endTime: '11:30 AM', capacity: 120 },
  { startTime: '01:30 PM', endTime: '04:00 PM', capacity: 80 },
  { startTime: '05:00 PM', endTime: '07:30 PM', capacity: 110 }
];

const formatDate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

async function provisionAllSlots() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB at:', MONGODB_URI);

    const temples = await Temple.find({ status: 'active' });
    console.log(`🏛️ Found ${temples.length} active temples. Generating slots for the next 30 days...`);

    // Next 30 days
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push(formatDate(d));
    }

    let totalCreatedOrEnsured = 0;

    for (const temple of temples) {
      const darshanTypes = await DarshanType.find({ temple: temple._id, status: 'active' });
      if (darshanTypes.length === 0) {
        console.warn(`⚠️ Temple "${temple.name}" has no active darshan types!`);
        continue;
      }

      let templeSlots = 0;
      for (const dt of darshanTypes) {
        for (const dateStr of dates) {
          for (const timing of slotTimings) {
            try {
              const res = await DarshanSlot.findOneAndUpdate(
                {
                  temple: temple._id,
                  darshanType: dt._id,
                  date: dateStr,
                  startTime: timing.startTime
                },
                {
                  $setOnInsert: {
                    temple: temple._id,
                    darshanType: dt._id,
                    date: dateStr,
                    startTime: timing.startTime,
                    endTime: timing.endTime,
                    capacity: timing.capacity,
                    bookedCount: 0,
                    status: 'active'
                  }
                },
                { upsert: true, new: true }
              );
              totalCreatedOrEnsured++;
              templeSlots++;
            } catch (err) {
              // Ignore duplicate collisions if any
            }
          }
        }
      }
      console.log(`  ✓ ${temple.name.padEnd(35)}: ${templeSlots} slots active for next 30 days`);
    }

    console.log(`\n🎉 Successfully verified and provisioned slots across all ${temples.length} temples!`);
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error provisioning slots:', err);
    process.exit(1);
  }
}

provisionAllSlots();
