const mongoose = require('mongoose');
const DarshanSlot = require('../models/DarshanSlot');

mongoose.connect('mongodb://127.0.0.1:27017/darshanease').then(async () => {
  const all = await DarshanSlot.find();
  let count = 0;
  for (let s of all) {
    if (s.bookedCount === undefined || s.bookedCount === null || s.capacity === undefined || s.capacity === null) {
      count++;
    }
  }
  console.log('Slots missing bookedCount/capacity:', count, 'out of', all.length);
  process.exit(0);
});
