const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const User = require('../models/User');
const Temple = require('../models/Temple');
const DarshanType = require('../models/DarshanType');
const DarshanSlot = require('../models/DarshanSlot');
const Booking = require('../models/Booking');
const Notification = require('../models/Notification');
const Enquiry = require('../models/Enquiry');

const {
  seedTemples
} = require('./seedData');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/darshanease';

const slotTimings = [
  { startTime: '06:00 AM', endTime: '08:30 AM', capacity: 100 },
  { startTime: '09:00 AM', endTime: '11:30 AM', capacity: 120 },
  { startTime: '01:30 PM', endTime: '04:00 PM', capacity: 80 },
  { startTime: '05:00 PM', endTime: '07:30 PM', capacity: 110 }
];

// Helper to format date YYYY-MM-DD
const formatDate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const runSeed = async () => {
  try {
    console.log('🔄 Connecting to MongoDB at:', MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected. Dropping existing database to ensure clean schema and indexes...');

    await mongoose.connection.dropDatabase();

    console.log('👤 Seeding Admin & Devotee accounts...');
    const adminUser = await User.create({
      name: 'DarshanEase Administrator',
      email: process.env.ADMIN_SEED_EMAIL || 'admin@gmail.com',
      phone: '+91 9876543210',
      password: process.env.ADMIN_SEED_PASSWORD || 'Admin@123',
      role: 'admin'
    });

    const devoteeUser = await User.create({
      name: 'Ramesh Sharma',
      email: 'devotee@example.com',
      phone: '+91 9845012345',
      password: 'Devotee@123',
      role: 'devotee'
    });

    console.log(`✅ Admin created: ${adminUser.email}`);
    console.log(`✅ Devotee created: ${devoteeUser.email}`);

    console.log('🌍 Seeding Pilgrimage Destinations...');
    const createdDestinations = await Destination.insertMany(seedDestinations);
    console.log(`✅ Seeded ${createdDestinations.length} sacred destinations.`);

    console.log('🏛️ Seeding 16 Famous Temples, Darshan Types, and Slots...');
    let totalSlotsCreated = 0;
    const createdTemples = [];
    let seededFirstDarshanType = null;
    let seededFirstSlot = null;

    // Dates for next 14 days
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push(formatDate(d));
    }

    for (const templeData of seedTemples) {
      const { darshanTypes, ...templeInfo } = templeData;
      const temple = await Temple.create(templeInfo);
      createdTemples.push(temple);

      // Create Darshan Types
      for (const dtData of darshanTypes) {
        const darshanType = await DarshanType.create({
          temple: temple._id,
          ...dtData
        });

        if (!seededFirstDarshanType) seededFirstDarshanType = darshanType;

        // Create Slots for the first 5 temples for all 14 days, and 4 days for others
        const daysToSeed = createdTemples.length <= 5 ? dates : dates.slice(0, 4);

        for (const dateStr of daysToSeed) {
          for (const timing of slotTimings) {
            const slot = await DarshanSlot.create({
              temple: temple._id,
              darshanType: darshanType._id,
              date: dateStr,
              startTime: timing.startTime,
              endTime: timing.endTime,
              capacity: timing.capacity,
              bookedCount: 0,
              status: 'active'
            });
            if (!seededFirstSlot) seededFirstSlot = slot;
            totalSlotsCreated++;
          }
        }
      }
    }
    console.log(`✅ Seeded ${createdTemples.length} temples & ${totalSlotsCreated} slots.`);

    console.log('🎫 Provisioning Initial Devotee Bookings & Enquiries...');
    // Create a demo confirmed booking for devotee
    const firstTemple = createdTemples[1] || createdTemples[0]; // Kashi Vishwanath
    const bookingSlot = await DarshanSlot.findOne({ temple: firstTemple._id, status: 'active' });
    const bookingDt = await DarshanType.findOne({ temple: firstTemple._id });

    if (bookingSlot && bookingDt) {
      await Booking.create({
        bookingReference: 'DE-2026-881923',
        user: devoteeUser._id,
        temple: firstTemple._id,
        templeSnapshot: {
          name: firstTemple.name,
          deity: firstTemple.deity,
          city: firstTemple.city,
          state: firstTemple.state,
          address: firstTemple.address,
          image: firstTemple.images[0]
        },
        darshanType: bookingDt._id,
        darshanTypeSnapshot: {
          name: bookingDt.name,
          chargePerDevotee: bookingDt.chargePerDevotee
        },
        slot: bookingSlot._id,
        slotSnapshot: {
          date: bookingSlot.date,
          startTime: bookingSlot.startTime,
          endTime: bookingSlot.endTime
        },
        devotees: [
          {
            name: 'Ramesh Sharma',
            age: 48,
            gender: 'Male',
            idType: 'Aadhaar',
            idNumber: '9845-1234-5678'
          },
          {
            name: 'Sunita Sharma',
            age: 45,
            gender: 'Female',
            idType: 'Aadhaar',
            idNumber: '9845-8765-4321'
          }
        ],
        devoteeCount: 2,
        chargePerDevotee: bookingDt.chargePerDevotee,
        totalAmount: bookingDt.chargePerDevotee * 2,
        contactPhone: devoteeUser.phone,
        contactEmail: devoteeUser.email,
        paymentStatus: 'paid',
        paymentId: 'PAY_DEMO_SEED_01',
        status: 'confirmed'
      });

      // Update slot booked count atomically
      await DarshanSlot.findByIdAndUpdate(bookingSlot._id, { $inc: { bookedCount: 2 } });
    }

    // Seed sample enquiries for devotee
    await Enquiry.create({
      enquiryReference: 'ENQ-2026-442190',
      user: devoteeUser._id,
      enquiryType: 'Package',
      name: 'Ramesh Sharma',
      email: 'devotee@example.com',
      phone: '+91 9845012345',
      destination: 'Ayodhya',
      packageTitle: 'Ayodhya Darshan Special',
      preferredDate: dates[5],
      travelersCount: 4,
      groupSize: 4,
      departureCity: 'Lucknow',
      budgetPreference: 'Deluxe Comfort',
      specialRequests: 'Elderly parents traveling, wheelchair assistance requested at temple entrance.',
      status: 'Pending Confirmation'
    });

    await Enquiry.create({
      enquiryReference: 'ENQ-2026-993144',
      user: devoteeUser._id,
      enquiryType: 'Pandit Puja',
      name: 'Ramesh Sharma',
      email: 'devotee@example.com',
      phone: '+91 9845012345',
      destination: 'Varanasi',
      templeName: 'Kashi Vishwanath Temple',
      serviceName: 'Rudrabhishek with Ganga Jal',
      preferredDate: dates[7],
      travelersCount: 2,
      groupSize: 2,
      message: 'Seeking special dawn Rudrabhishek at Manikarnika Ghat with Pandit Kameshwar Shastri.',
      status: 'Requested'
    });

    // Seed notifications
    await Notification.create({
      recipient: devoteeUser._id,
      title: 'Welcome to DarshanEase',
      message: 'Namaste Ramesh Ji! Welcome to DarshanEase - your trusted companion for sacred temple darshans and spiritual pilgrimages across India.',
      type: 'general'
    });

    await Notification.create({
      recipient: devoteeUser._id,
      title: 'Booking Confirmed: Kashi Vishwanath Temple',
      message: `Your sacred darshan pass (Ref: DE-2026-881923) has been confirmed for ${bookingSlot ? bookingSlot.date : 'upcoming date'}. You can download and present your digital pass at Gate No. 4.`,
      type: 'booking_confirmed',
      bookingReference: 'DE-2026-881923'
    });

    console.log('🎉 Seed completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error during seeding:', err);
    process.exit(1);
  }
};

runSeed();
