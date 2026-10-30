const mongoose = require('mongoose');

async function run() {
  await mongoose.connect('mongodb://127.0.0.1:27017/darshanease');
  const DarshanType = mongoose.model('DarshanType', new mongoose.Schema({}, { strict: false }));
  const Temple = mongoose.model('Temple', new mongoose.Schema({}, { strict: false }));
  
  const temples = await Temple.find({}, { name: 1, deity: 1, city: 1 });
  for (let i = 0; i < temples.length; i++) {
    const t = temples[i];
    const types = await DarshanType.find({ temple: t._id });
    console.log(`[${i+1}] ${t.name} (${t.city}): ${types.length} types -> ` + types.map(dt => `${dt.name} (₹${dt.chargePerDevotee})`).join(' | '));
  }
  process.exit(0);
}
run().catch(console.error);
