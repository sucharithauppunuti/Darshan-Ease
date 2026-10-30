const mongoose = require('mongoose');

async function run() {
  await mongoose.connect('mongodb://127.0.0.1:27017/darshanease');
  const DarshanSlot = mongoose.model('DarshanSlot', new mongoose.Schema({}, { strict: false }));
  const missingBooked = await DarshanSlot.countDocuments({ bookedCount: { $exists: false } });
  const nullBooked = await DarshanSlot.countDocuments({ bookedCount: null });
  const missingCapacity = await DarshanSlot.countDocuments({ capacity: { $exists: false } });
  const inactive = await DarshanSlot.countDocuments({ status: { $ne: 'active' } });
  const total = await DarshanSlot.countDocuments({});
  console.log({ total, missingBooked, nullBooked, missingCapacity, inactive });
  process.exit(0);
}
run().catch(console.error);
