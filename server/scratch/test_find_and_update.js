const mongoose = require('mongoose');
const DarshanSlot = require('../models/DarshanSlot');

mongoose.connect('mongodb://127.0.0.1:27017/darshanease').then(async () => {
  const slot = await DarshanSlot.findOne({ status: 'active' });
  const strId = slot._id.toString();
  console.log('Testing slot string ID:', strId);

  const res1 = await DarshanSlot.findOneAndUpdate(
    {
      _id: strId,
      status: 'active',
      $expr: { $lte: [{ $add: ['$bookedCount', 1] }, '$capacity'] }
    },
    { $inc: { bookedCount: 0 } },
    { new: true }
  );
  console.log('Match with string ID and $expr:', Boolean(res1));
  process.exit(0);
});
