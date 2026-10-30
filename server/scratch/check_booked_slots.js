const mongoose = require('mongoose');
const DarshanSlot = require('../models/DarshanSlot');

mongoose.connect('mongodb://127.0.0.1:27017/darshanease').then(async () => {
  const booked = await DarshanSlot.find({ bookedCount: { $gt: 0 } });
  console.log('Slots with bookedCount > 0:', booked.length);
  for (const b of booked) {
    console.log(b._id, b.date, b.startTime, 'capacity:', b.capacity, 'bookedCount:', b.bookedCount, 'remaining:', b.capacity - b.bookedCount);
  }
  process.exit(0);
});
