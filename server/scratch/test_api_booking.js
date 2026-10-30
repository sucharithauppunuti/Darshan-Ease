const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const http = require('http');

async function test() {
  await mongoose.connect('mongodb://127.0.0.1:27017/darshanease');
  const User = mongoose.model('User', new mongoose.Schema({}, { strict: false }));
  const DarshanSlot = mongoose.model('DarshanSlot', new mongoose.Schema({}, { strict: false }));
  const DarshanType = mongoose.model('DarshanType', new mongoose.Schema({}, { strict: false }));
  const Temple = mongoose.model('Temple', new mongoose.Schema({}, { strict: false }));

  const user = await User.findOne({ email: 'devotee@example.com' });
  const token = jwt.sign({ id: user._id }, 'darshanease_super_secret_jwt_key_2026', { expiresIn: '7d' });
  console.log('Generated token for user:', user.name);

  // Pick a slot
  const slot = await DarshanSlot.findOne({ status: 'active', bookedCount: 0 });
  console.log('Testing with slot:', {
    slotId: slot._id.toString(),
    temple: slot.temple.toString(),
    darshanType: slot.darshanType.toString(),
    date: slot.date,
    capacity: slot.capacity,
    bookedCount: slot.bookedCount
  });

  const payload = JSON.stringify({
    templeId: slot.temple.toString(),
    darshanTypeId: slot.darshanType.toString(),
    slotId: slot._id.toString(),
    devotees: [
      { name: 'Devotee One', age: 32, gender: 'Male', idType: 'Aadhaar', idNumber: '999988887777' }
    ],
    contactPhone: '9876543210',
    contactEmail: 'devotee@example.com',
    paymentId: 'PAY_TEST_' + Date.now(),
    razorpayOrderId: 'ORD_TEST_' + Date.now()
  });

  const req = http.request('http://localhost:7000/api/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload),
      'Authorization': 'Bearer ' + token
    }
  }, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      console.log('HTTP Status:', res.statusCode);
      console.log('Response body:', body);
      process.exit(0);
    });
  });

  req.write(payload);
  req.end();
}

test().catch(console.error);
