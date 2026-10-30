const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const http = require('http');

async function test() {
  await mongoose.connect('mongodb://127.0.0.1:27017/darshanease');
  const User = mongoose.model('User', new mongoose.Schema({}, { strict: false }));
  const DarshanSlot = mongoose.model('DarshanSlot', new mongoose.Schema({}, { strict: false }));
  const user = await User.findOne({ email: 'devotee@example.com' });
  const token = jwt.sign({ id: user._id }, 'darshanease_super_secret_jwt_key_2026', { expiresIn: '7d' });

  // Pick a slot on or after 2026-10-24
  let slot = await DarshanSlot.findOne({ date: { $gte: '2026-10-24' }, status: 'active' });
  if (!slot) {
    // If dates in seed were 14 days from Oct 16, create a test future slot for Oct 26
    const existing = await DarshanSlot.findOne({});
    slot = await DarshanSlot.create({
      temple: existing.temple,
      darshanType: existing.darshanType,
      date: '2026-10-26',
      startTime: '09:00 AM',
      endTime: '11:00 AM',
      capacity: 50,
      bookedCount: 0,
      status: 'active'
    });
  }

  const initialBooked = slot.bookedCount;
  console.log('Using future slot:', slot._id.toString(), slot.date, 'Initial bookedCount:', initialBooked);

  // 1. Create Booking
  const bookingPayload = JSON.stringify({
    templeId: slot.temple.toString(),
    darshanTypeId: slot.darshanType.toString(),
    slotId: slot._id.toString(),
    devotees: [{ name: 'Pilgrim Future', age: 28, gender: 'Female', idType: 'Aadhaar', idNumber: '112233445566' }],
    contactPhone: '9876543210',
    contactEmail: 'devotee@example.com',
    paymentId: 'TEST_PAID_' + Date.now(),
    razorpayOrderId: 'TEST_ORD_' + Date.now()
  });

  const bookReq = http.request('http://localhost:7000/api/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(bookingPayload),
      'Authorization': 'Bearer ' + token
    }
  }, (bookRes) => {
    let bData = '';
    bookRes.on('data', c => bData += c);
    bookRes.on('end', async () => {
      console.log('Booking creation status:', bookRes.statusCode);
      const booking = JSON.parse(bData).booking;
      const slotAfterBook = await DarshanSlot.findById(slot._id);
      console.log('Slot bookedCount after booking:', slotAfterBook.bookedCount);

      // 2. Cancel the future booking
      const cancelPayload = JSON.stringify({ reason: 'Need to reschedule yatra' });
      const cancelReq = http.request(`http://localhost:7000/api/bookings/${booking._id}/cancel`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(cancelPayload),
          'Authorization': 'Bearer ' + token
        }
      }, (cancelRes) => {
        let cData = '';
        cancelRes.on('data', c => cData += c);
        cancelRes.on('end', async () => {
          console.log('Cancellation status:', cancelRes.statusCode);
          console.log('Cancellation message:', JSON.parse(cData).message);
          const slotAfterCancel = await DarshanSlot.findById(slot._id);
          console.log('Slot bookedCount after cancellation:', slotAfterCancel.bookedCount);
          console.log('Capacity release verified:', slotAfterCancel.bookedCount === initialBooked);
          process.exit(0);
        });
      });
      cancelReq.write(cancelPayload);
      cancelReq.end();
    });
  });
  bookReq.write(bookingPayload);
  bookReq.end();
}
test().catch(console.error);
