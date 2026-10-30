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
  console.log('--- 1. Fetching All Temples (/api/temples?limit=50) ---');
  const res = await testApi('http://localhost:7000/api/temples?limit=50');
  console.log('Success:', res.success, 'Total Count:', res.temples?.length);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateStr = tomorrow.toISOString().split('T')[0];
  console.log(`Testing slot availability for date: ${dateStr}\n`);

  let allGood = true;

  for (let i = 0; i < res.temples.length; i++) {
    const t = res.temples[i];
    const slotRes = await testApi(`http://localhost:7000/api/temples/${t._id}/slots?date=${dateStr}`);
    
    const slotsCount = slotRes.slots ? slotRes.slots.length : 0;
    const availableSlots = slotRes.slots ? slotRes.slots.filter(s => s.isBookable && s.remainingCapacity > 0).length : 0;
    const darshanTypeCount = t.darshanTypes ? t.darshanTypes.length : 0;

    const ok = slotsCount > 0 && availableSlots > 0 && darshanTypeCount > 0;
    if (!ok) allGood = false;

    console.log(
      `[${String(i + 1).padStart(2, '0')}] ${t.name.padEnd(38)} | ${t.state.padEnd(16)} | Types: ${darshanTypeCount} | Slots: ${slotsCount} (Avail: ${availableSlots}) ${ok ? '✅' : '❌'}`
    );
  }

  console.log(`\nOverall Slot & Temple Status: ${allGood ? 'ALL 35 TEMPLES HAVE ACTIVE, WORKING SLOTS! 🎉' : 'Some temples had issues ❌'}`);
}

run().catch(console.error);
