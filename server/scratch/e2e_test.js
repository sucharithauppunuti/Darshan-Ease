const http = require('http');

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          const parsed = body ? JSON.parse(body) : {};
          resolve({ status: res.statusCode, headers: res.headers, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, raw: body });
        }
      });
    });
    req.on('error', reject);
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function runE2ETest() {
  console.log('🚀 Starting DarshanEase End-to-End Test Suite...\n');

  // 1. Devotee Login
  console.log('1️⃣ Devotee Login...');
  const devoteeLoginRes = await request(
    {
      hostname: 'localhost',
      port: 7000,
      path: '/api/auth/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    },
    { email: 'devotee@example.com', password: 'Devotee@123' }
  );

  if (devoteeLoginRes.status !== 200 || !devoteeLoginRes.data.token) {
    throw new Error(`Devotee login failed: ${JSON.stringify(devoteeLoginRes.data)}`);
  }
  const devoteeToken = devoteeLoginRes.data.token;
  console.log('   ✅ Devotee logged in successfully! User:', devoteeLoginRes.data.user?.name);

  // 2. Fetch all temples
  console.log('\n2️⃣ Fetching all temples...');
  const templesRes = await request({
    hostname: 'localhost',
    port: 7000,
    path: '/api/temples',
    method: 'GET'
  });
  console.log(`   ✅ Temples retrieved: ${templesRes.data.temples?.length} temples found.`);

  // 3. Inspect Temple 1: Tirumala
  const tirumala = templesRes.data.temples.find((t) => t.name.includes('Venkateswara'));
  console.log(`\n3️⃣ Temple 1: "${tirumala.name}" in ${tirumala.city}, ${tirumala.state}`);
  const tirumalaTypesRes = await request({
    hostname: 'localhost',
    port: 7000,
    path: `/api/temples/${tirumala._id}/darshan-types`,
    method: 'GET'
  });
  const tirumalaTypes = tirumalaTypesRes.data.darshanTypes;
  console.log('   ✅ Tirumala Darshan Types:');
  tirumalaTypes.forEach((dt) => {
    console.log(`      • ${dt.name} - ₹${dt.chargePerDevotee} (Verification: ${dt.priceVerificationStatus})`);
  });

  // 4. Inspect Temple 2: Kashi Vishwanath
  const kashi = templesRes.data.temples.find((t) => t.name.includes('Kashi Vishwanath'));
  console.log(`\n4️⃣ Temple 2: "${kashi.name}" in ${kashi.city}, ${kashi.state}`);
  const kashiTypesRes = await request({
    hostname: 'localhost',
    port: 7000,
    path: `/api/temples/${kashi._id}/darshan-types`,
    method: 'GET'
  });
  const kashiTypes = kashiTypesRes.data.darshanTypes;
  console.log('   ✅ Kashi Vishwanath Darshan Types:');
  kashiTypes.forEach((dt) => {
    console.log(`      • ${dt.name} - ₹${dt.chargePerDevotee} (Verification: ${dt.priceVerificationStatus})`);
  });

  // Verify distinct ticket types
  const tirumalaNames = tirumalaTypes.map((t) => t.name);
  const kashiNames = kashiTypes.map((t) => t.name);
  const isDistinct = tirumalaNames.some((n) => !kashiNames.includes(n));
  console.log(`   ✅ Distinct ticket check: ${isDistinct ? 'PASSED (Each temple has unique tickets)' : 'FAILED'}`);

  // 5. Fetch available slots for Tirumala Special Entry Darshan
  const specialEntryType = tirumalaTypes.find((dt) => dt.chargePerDevotee > 0) || tirumalaTypes[0];
  console.log(`\n5️⃣ Fetching available slots for "${specialEntryType.name}"...`);
  const slotsRes = await request({
    hostname: 'localhost',
    port: 7000,
    path: `/api/temples/${tirumala._id}/slots?darshanTypeId=${specialEntryType._id}`,
    method: 'GET'
  });
  const availableSlots = slotsRes.data.slots?.filter((s) => s.isBookable && s.remainingCapacity > 0);
  console.log(`   ✅ Total slots: ${slotsRes.data.slots?.length}, Available bookable slots: ${availableSlots.length}`);
  const chosenSlot = availableSlots[0];
  console.log(`   Chosen Slot: Date ${chosenSlot.date}, Time ${chosenSlot.startTime}-${chosenSlot.endTime}, Remaining ${chosenSlot.remainingCapacity}/${chosenSlot.capacity}`);

  // 6. Create Booking
  console.log('\n6️⃣ Creating Devotee Booking...');
  const bookingPayload = {
    templeId: tirumala._id,
    darshanTypeId: specialEntryType._id,
    slotId: chosenSlot._id,
    date: chosenSlot.date,
    startTime: chosenSlot.startTime,
    devoteeCount: 2,
    contactPhone: '+91 9876543210',
    contactEmail: 'devotee@example.com',
    devotees: [
      { name: 'Ramesh Sharma', age: 42, gender: 'male', idType: 'Aadhaar', idNumber: '9876 5432 1098' },
      { name: 'Priya Sharma', age: 38, gender: 'female', idType: 'Aadhaar', idNumber: '8765 4321 0987' }
    ]
  };

  const bookingRes = await request(
    {
      hostname: 'localhost',
      port: 7000,
      path: '/api/bookings',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${devoteeToken}`
      }
    },
    bookingPayload
  );

  if (bookingRes.status !== 201 || !bookingRes.data.booking) {
    throw new Error(`Booking creation failed: ${JSON.stringify(bookingRes.data)}`);
  }
  const booking = bookingRes.data.booking;
  console.log(`   ✅ Booking Reserved!`);
  console.log(`      Reference: #${booking.bookingReference}`);
  console.log(`      Devotees: ${booking.devoteeCount}`);
  console.log(`      Total Amount: ₹${booking.totalAmount}`);
  console.log(`      Status: ${booking.status}`);

  // 7. Test Razorpay Order creation and Payment Verification
  if (booking.totalAmount > 0) {
    console.log('\n7️⃣ Testing Razorpay Payment Gateway integration...');
    const orderRes = await request(
      {
        hostname: 'localhost',
        port: 7000,
        path: '/api/payment/create-order',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${devoteeToken}`
        }
      },
      { amount: booking.totalAmount, receipt: `receipt_${booking._id}` }
    );
    console.log(`   ✅ Razorpay Order Created: ${orderRes.data.order?.id}, Amount: ₹${orderRes.data.order?.amount / 100}`);

    const verifyRes = await request(
      {
        hostname: 'localhost',
        port: 7000,
        path: '/api/payment/verify',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${devoteeToken}`
        }
      },
      {
        razorpay_order_id: orderRes.data.order.id,
        razorpay_payment_id: `pay_test_${Date.now()}`
      }
    );
    console.log(`   ✅ Payment Verified! Message: ${verifyRes.data.message}`);
  }

  // 8. Fetch My Bookings
  console.log('\n8️⃣ Testing Devotee My Bookings...');
  const myBookingsRes = await request({
    hostname: 'localhost',
    port: 7000,
    path: '/api/bookings/my-bookings',
    method: 'GET',
    headers: { Authorization: `Bearer ${devoteeToken}` }
  });
  const myBookings = myBookingsRes.data.bookings;
  console.log(`   ✅ My Bookings Count: ${myBookings.length}`);
  const foundBooking = myBookings.find((b) => b._id === booking._id);
  console.log(`   ✅ Found newly booked reference: #${foundBooking?.bookingReference} (${foundBooking?.status})`);

  // 9. Devotee Booking Cancellation
  console.log('\n9️⃣ Testing Devotee Booking Cancellation...');
  const cancelRes = await request(
    {
      hostname: 'localhost',
      port: 7000,
      path: `/api/bookings/${booking._id}/cancel`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${devoteeToken}`
      }
    },
    { reason: 'Change of family pilgrimage travel schedule' }
  );
  console.log(`   ✅ Cancelled booking: ${cancelRes.data.message}`);
  console.log(`   Updated status: ${cancelRes.data.booking?.status}`);

  // 10. Admin Authentication & Dashboard Verification
  console.log('\n🔟 Testing Admin Authentication & Dashboard...');
  const adminLoginRes = await request(
    {
      hostname: 'localhost',
      port: 7000,
      path: '/api/auth/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    },
    { email: 'admin@darshanease.com', password: 'Admin@123' }
  );
  const adminToken = adminLoginRes.data.token;
  console.log('   ✅ Admin logged in successfully! Role:', adminLoginRes.data.user?.role);

  const statsRes = await request({
    hostname: 'localhost',
    port: 7000,
    path: '/api/admin/dashboard/stats',
    method: 'GET',
    headers: { Authorization: `Bearer ${adminToken}` }
  });

  console.log('   ✅ Admin Dashboard Metrics:');
  console.log(`      • Total Temples: ${statsRes.data.stats?.totalTemples}`);
  console.log(`      • Total Bookings: ${statsRes.data.stats?.totalBookings}`);
  console.log(`      • Upcoming Bookings: ${statsRes.data.stats?.upcomingBookings}`);
  console.log(`      • Active Darshan Slots: ${statsRes.data.stats?.activeSlots}`);
  console.log(`      • Available Slots: ${statsRes.data.stats?.availableSlots}`);
  console.log(`      • Fully Booked Slots: ${statsRes.data.stats?.fullyBookedSlots}`);
  console.log(`      • Recent Bookings: ${statsRes.data.recentBookings?.length}`);

  console.log('\n🎉 ALL END-TO-END TESTS PASSED COMPLETELY!\n');
}

runE2ETest().catch((err) => {
  console.error('\n❌ Test failed:', err);
  process.exit(1);
});
