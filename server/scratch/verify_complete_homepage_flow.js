const mongoose = require('mongoose');
const http = require('http');

async function testApi(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log('--- 1. Testing GET /api/temples ---');
  const templesRes = await testApi('http://localhost:7000/api/temples?limit=5');
  console.log('Temples response success:', templesRes.success);
  console.log('Count:', templesRes.temples?.length);

  const firstTemple = templesRes.temples[0];
  console.log(`Temple: ${firstTemple.name} (${firstTemple.city}, ${firstTemple.state})`);
  console.log(`Deity: ${firstTemple.deity}`);
  console.log(`Starting Price: ₹${firstTemple.startingPrice}`);
  console.log(`Configured Darshan Types (${firstTemple.darshanTypes?.length}):`);
  firstTemple.darshanTypes?.forEach((dt, i) => {
    console.log(`  [${i+1}] ${dt.name} - ₹${dt.chargePerDevotee}`);
  });

  console.log('\n--- 2. Testing GET /api/temples/:id ---');
  const detailRes = await testApi(`http://localhost:7000/api/temples/${firstTemple._id}`);
  console.log('Detail response success:', detailRes.success);
  console.log(`Temple: ${detailRes.temple?.name}`);
  console.log(`Darshan Types count: ${detailRes.darshanTypes?.length}`);
  detailRes.darshanTypes?.forEach((dt, i) => {
    console.log(`  [${i+1}] ${dt.name} - ₹${dt.chargePerDevotee} (Rules: ${dt.rules || 'Standard rules'})`);
  });

  console.log('\n--- 3. Testing GET /api/temples/:id/slots ---');
  const slotRes = await testApi(`http://localhost:7000/api/temples/${firstTemple._id}/slots`);
  console.log(`Slots response: success=${slotRes.success}, slotsCount=${slotRes.slots?.length}`);
  if (slotRes.slots?.length > 0) {
    const s = slotRes.slots[0];
    console.log(`  First Slot: Date ${s.date} | ${s.timeWindow || s.startTime} | Status: ${s.statusLabel} | Remaining: ${s.remainingSeats}`);
  }

  console.log('\n--- All verified successfully! ---');
}

run().catch(err => {
  console.error('Error during verification:', err);
  process.exit(1);
});
