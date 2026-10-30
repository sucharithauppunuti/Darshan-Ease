const axios = require('axios');

async function testAll() {
  const base = 'http://localhost:7000/api';
  console.log('Testing DarshanEase End-to-End APIs...');

  // 1. Devotee Login
  const devoteeLogin = await axios.post(`${base}/auth/login`, {
    email: 'devotee@example.com',
    password: 'Devotee@123'
  });
  console.log('✅ Devotee Login OK:', devoteeLogin.data.user.name, '| Role:', devoteeLogin.data.user.role);
  const devoteeToken = devoteeLogin.data.token;

  // 2. Admin Login
  const adminLogin = await axios.post(`${base}/auth/login`, {
    email: 'admin@darshanease.com',
    password: 'Admin@123'
  });
  console.log('✅ Admin Login OK:', adminLogin.data.user.name, '| Role:', adminLogin.data.user.role);
  const adminToken = adminLogin.data.token;

  // 3. Admin Dashboard Stats
  const statsRes = await axios.get(`${base}/admin/dashboard-stats`, {
    headers: { Authorization: `Bearer ${adminToken}` }
  });
  console.log('✅ Admin Dashboard Stats OK: Temples =', statsRes.data.stats.totalTemples,
    '| Packages =', statsRes.data.stats.totalPackages,
    '| Destinations =', statsRes.data.stats.totalDestinations,
    '| Providers =', statsRes.data.stats.totalProviders,
    '| Enquiries =', statsRes.data.stats.totalEnquiries);

  // 4. Create Pilgrimage Enquiry
  const enqRes = await axios.post(`${base}/enquiries`, {
    devoteeName: 'Ananya Sharma',
    devoteeEmail: 'devotee@example.com',
    devoteePhone: '+91 98765 43210',
    enquiryType: 'Package',
    templeName: 'Kashi Vishwanath Temple',
    destinationName: 'Varanasi',
    devoteeCount: 4,
    travelDate: '2026-11-20',
    budgetRange: '₹15,000 - ₹30,000 per person',
    specialRequests: 'Need wheelchair assistance for elderly parents and Ganga aarti VIP seating.'
  }, {
    headers: { Authorization: `Bearer ${devoteeToken}` }
  });
  console.log('✅ Devotee Pilgrimage Enquiry Created OK: ID =', enqRes.data.enquiry._id, '| Status =', enqRes.data.enquiry.status);

  // 5. Devotee Fetch My Enquiries
  const myEnq = await axios.get(`${base}/enquiries/my`, {
    headers: { Authorization: `Bearer ${devoteeToken}` }
  });
  console.log('✅ Devotee My Enquiries OK: Count =', myEnq.data.enquiries.length);

  // 6. Admin Update Enquiry Status
  const updateRes = await axios.put(`${base}/enquiries/${enqRes.data.enquiry._id}/status`, {
    status: 'Pending Confirmation',
    responseNotes: 'Coordinator Pandit Ji assigned. Hotel options sent to devotee email.'
  }, {
    headers: { Authorization: `Bearer ${adminToken}` }
  });
  console.log('✅ Admin Update Status OK: New Status =', updateRes.data.enquiry.status, '| Response Notes =', updateRes.data.enquiry.responseNotes);

  // 7. Check Devotee Notifications
  const notifRes = await axios.get(`${base}/notifications`, {
    headers: { Authorization: `Bearer ${devoteeToken}` }
  });
  console.log('✅ Devotee Notifications OK: Count =', notifRes.data.notifications?.length || notifRes.data.length);

  console.log('\n🎉 ALL END-TO-END FLOWS VERIFIED SUCCESSFULLY!');
}

testAll().catch((err) => {
  console.error('❌ Test Error:', err.response?.data || err.message);
  process.exit(1);
});
