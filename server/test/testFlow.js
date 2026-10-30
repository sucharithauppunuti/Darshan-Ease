const http = require('http');

const request = (path, method = 'GET', body = null, token = null) => {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname: 'localhost',
      port: 7000,
      path: `/api${path}`,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    };

    const req = http.request(options, (res) => {
      let resBody = '';
      res.on('data', (chunk) => (resBody += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(resBody);
          resolve({ status: res.statusCode, data: parsed });
        } catch {
          resolve({ status: res.statusCode, raw: resBody });
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
};

async function runTests() {
  console.log('🧪 Starting DarshanEase Comprehensive Automated Verification...\n');
  let passed = 0;
  let failed = 0;

  const test = (name, condition) => {
    if (condition) {
      console.log(`✅ PASS: ${name}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${name}`);
      failed++;
    }
  };

  try {
    // 1. Health check
    const health = await request('/health');
    test('API Health Check is Online', health.status === 200 && health.data.status === 'online');

    // 2. Devotee Login
    const devLogin = await request('/auth/login', 'POST', {
      email: 'devotee@example.com',
      password: 'Devotee@123'
    });
    test('Devotee Login (JWT Generated)', devLogin.status === 200 && !!devLogin.data.token);
    const devoteeToken = devLogin.data.token;

    // 3. Admin Login
    const admLogin = await request('/auth/login', 'POST', {
      email: 'admin@darshanease.com',
      password: 'Admin@123'
    });
    test('Admin Login (JWT Generated)', admLogin.status === 200 && admLogin.data.user.role === 'admin');
    const adminToken = admLogin.data.token;

    // 4. Role Protection Check (Devotee blocked from admin route)
    const unauthorizedCheck = await request('/admin/dashboard-stats', 'GET', null, devoteeToken);
    test('Role Protection: Devotee rejected from /api/admin (403 Forbidden)', unauthorizedCheck.status === 403);

    // 5. Admin Dashboard Stats
    const statsCheck = await request('/admin/dashboard-stats', 'GET', null, adminToken);
    test('Admin Dashboard Stats Retrievable', statsCheck.status === 200 && statsCheck.data.stats.totalTemples >= 16);

    // 6. Temple Search
    const temples = await request('/temples?limit=20');
    test('Fetch Temples List (Contains all 16 shrines)', temples.status === 200 && temples.data.count >= 16);
    const sampleTemple = temples.data.temples[0];

    // 7. Temple Details & Darshan Types
    const templeDetails = await request(`/temples/${sampleTemple._id}`);
    test('Temple Details with Darshan Types fetched', templeDetails.status === 200 && templeDetails.data.darshanTypes.length > 0);
    const sampleDarshanType = templeDetails.data.darshanTypes[0];

    // 8. Slot Availability
    const today = new Date().toISOString().split('T')[0];
    const availability = await request(
      `/slots/availability?templeId=${sampleTemple._id}&darshanTypeId=${sampleDarshanType._id}&date=${today}`
    );
    test('Slot Availability for Today fetched', availability.status === 200 && availability.data.slots.length > 0);
    const sampleSlot = availability.data.slots[0];
    const initialRemaining = sampleSlot.remainingCapacity;

    // 9. Atomic Booking Reservation
    const newBooking = await request(
      '/bookings',
      'POST',
      {
        templeId: sampleTemple._id,
        darshanTypeId: sampleDarshanType._id,
        slotId: sampleSlot._id,
        devotees: [
          { name: 'Kavita Verma', age: 29, gender: 'Female', idType: 'Aadhaar', idNumber: 'XXXX-9901' },
          { name: 'Ananya Verma', age: 7, gender: 'Female', idType: 'None', idNumber: '' }
        ],
        contactPhone: '+91 9811223344',
        contactEmail: 'kavita@test.com',
        paymentId: 'pay_test_suite_123'
      },
      devoteeToken
    );
    test('Atomic Booking Created with Reference & Snapshots', newBooking.status === 201 && !!newBooking.data.booking.bookingReference);
    const createdBookingId = newBooking.data.booking._id;

    // 10. Check Capacity Reduced Atomically
    const recheckAvailability = await request(
      `/slots/availability?templeId=${sampleTemple._id}&darshanTypeId=${sampleDarshanType._id}&date=${today}`
    );
    const updatedSlot = recheckAvailability.data.slots.find((s) => s._id === sampleSlot._id);
    test(
      'Atomic Slot Capacity Decremented by Devotee Count (2)',
      updatedSlot && updatedSlot.remainingCapacity === initialRemaining - 2
    );

    // 11. Devotee Notifications Received
    const notifs = await request('/notifications', 'GET', null, devoteeToken);
    test('In-App Notification Center received confirmation', notifs.status === 200 && notifs.data.notifications.length > 0);

    // 12. Devotee Booking History
    const myBookings = await request('/bookings/my?status=upcoming', 'GET', null, devoteeToken);
    test('Booking History reflects newly reserved visit', myBookings.status === 200 && myBookings.data.bookings.length > 0);

    // 13. Cancellation & Capacity Release Exactly Once
    const cancellation = await request(
      `/bookings/${createdBookingId}/cancel`,
      'PATCH',
      { reason: 'Automated test suite cancellation verification' },
      devoteeToken
    );
    test('Booking Cancellation succeeded', cancellation.status === 200 && cancellation.data.booking.status === 'cancelled');

    // 14. Verify Capacity Released Back
    const releaseCheck = await request(
      `/slots/availability?templeId=${sampleTemple._id}&darshanTypeId=${sampleDarshanType._id}&date=${today}`
    );
    const releasedSlot = releaseCheck.data.slots.find((s) => s._id === sampleSlot._id);
    test('Slot Capacity Released Atomically back to initial level', releasedSlot && releasedSlot.remainingCapacity === initialRemaining);

    // 15. Duplicate Cancellation Blocked
    const duplicateCancel = await request(`/bookings/${createdBookingId}/cancel`, 'PATCH', {}, devoteeToken);
    test('Duplicate Cancellation Prevented (Cannot re-cancel)', duplicateCancel.status === 400);

    console.log(`\n========================================`);
    console.log(`Test Results: ${passed} Passed, ${failed} Failed`);
    console.log(`========================================\n`);

    if (failed === 0) {
      console.log('🎉 ALL SYSTEM CHECKS AND END-TO-END FLOWS VERIFIED SUCCESSFULLY!');
      process.exit(0);
    } else {
      process.exit(1);
    }
  } catch (err) {
    console.error('Test execution failed:', err);
    process.exit(1);
  }
}

runTests();
