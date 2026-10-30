const mongoose = require('mongoose');
const Temple = require('../models/Temple');
const DarshanType = require('../models/DarshanType');
const DarshanSlot = require('../models/DarshanSlot');

async function audit() {
  await mongoose.connect('mongodb://127.0.0.1:27017/darshanease');
  const temples = await Temple.find().sort({ name: 1 });
  console.log(`Total Temples: ${temples.length}`);

  const today = '2026-10-23';

  for (const t of temples) {
    const types = await DarshanType.find({ temple: t._id, status: 'active' });
    const slotCount = await DarshanSlot.countDocuments({
      temple: t._id,
      date: { $gte: today }
    });
    console.log(`${t.name.padEnd(38)} | State: ${t.state.padEnd(16)} | Types: ${types.length} | Future Slots: ${slotCount}`);
  }

  await mongoose.disconnect();
}

audit().catch(console.error);
