const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Temple = require('../models/Temple');
const DarshanType = require('../models/DarshanType');
const DarshanSlot = require('../models/DarshanSlot');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/darshanease';

const NEW_TEMPLES = [
  {
    name: 'Shri Ram Janmabhoomi Mandir',
    deity: 'Lord Rama',
    category: 'Vaishnava',
    description: 'The revered birthplace of Lord Rama on the sacred banks of the Saryu river. A masterpiece of traditional Nagara architecture built with pink Bansi Paharpur stone, featuring magnificent carved mandapas and the holy Ram Lalla sanctum.',
    images: [
      'https://images.unsplash.com/photo-1705861144413-f09c73798a72?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80'
    ],
    address: 'Ramkot, Ayodhya, Uttar Pradesh 224123',
    city: 'Ayodhya',
    state: 'Uttar Pradesh',
    openingHours: '06:30 AM - 09:30 PM',
    guidelines: 'Traditional Indian attire recommended. Devotees are requested to leave mobile phones, smartwatches, and leather articles at secure electronic lockers outside the sanctum.',
    startingPrice: 0,
    isPopular: true,
    isVerified: true,
    trustLabel: 'DarshanEase Verified',
    darshanTypes: [
      {
        name: 'Sugam Darshan (Free General Entry)',
        description: 'Traditional queuing darshan pass through the holy sanctum for all visiting pilgrims.',
        chargePerDevotee: 0,
        durationMinutes: 45,
        duration: '45 mins',
        dressCode: 'Traditional Indian attire',
        rules: 'Baggage lockers available near gate 3. Free prasad packet provided at exit counter.'
      },
      {
        name: 'Mangala Aarti & Special Entry Pass',
        description: 'Morning sanctum viewing during divine awakening mangala aarti with special devotee queue access.',
        chargePerDevotee: 250,
        durationMinutes: 30,
        duration: '30 mins',
        dressCode: 'Strict traditional attire (Dhoti/Kurta for men, Saree/Churidar for women)',
        rules: 'Reporting time 30 minutes prior to slot start time at Gate No. 2.'
      },
      {
        name: 'Shringar Aarti Morning Seva Pass',
        description: 'Special seating access during Ram Lalla Shringar and Vedic chanting ceremony.',
        chargePerDevotee: 500,
        durationMinutes: 40,
        duration: '40 mins',
        dressCode: 'Strict traditional attire',
        rules: 'Identity verification required. Carry valid Aadhaar or government photo ID.'
      }
    ]
  },
  {
    name: 'Kukke Shri Subrahmanya Temple',
    deity: 'Lord Subrahmanya',
    category: 'Other Deities',
    description: 'Nestled amidst the lush Western Ghats of Dakshina Kannada, this sacred shrine is renowned as the ultimate refuge where Lord Subrahmanya sheltered the divine serpent king Vasuki. Widely revered across India for powerful Sarpa Samskara and Ashlesha Bali rituals.',
    images: [
      'https://images.unsplash.com/photo-1620619767323-b95a89183081?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80'
    ],
    address: 'Subrahmanya Post, Sullia Taluk, Dakshina Kannada, Karnataka 574238',
    city: 'Subrahmanya',
    state: 'Karnataka',
    openingHours: '06:00 AM - 08:30 PM',
    guidelines: 'Men must remove shirts/vests before entering the inner sanctum. Photography inside the inner prakara is strictly prohibited.',
    startingPrice: 0,
    isPopular: true,
    isVerified: true,
    trustLabel: 'DarshanEase Verified',
    darshanTypes: [
      {
        name: 'Dharma Darshanam (Free General Entry)',
        description: 'General queue darshan of Lord Subrahmanya and Vasuki serpent sanctum.',
        chargePerDevotee: 0,
        durationMinutes: 40,
        duration: '40 mins',
        dressCode: 'Men: Dhoti/Pant (Shirt removed at inner door). Women: Saree/Salwar.',
        rules: 'Kumaradhara river holy bath customary before darshan.'
      },
      {
        name: 'Sheegra Darshanam (Quick Entry Pass)',
        description: 'Expedited sanctum lane for faster darshan without extended queuing.',
        chargePerDevotee: 100,
        durationMinutes: 20,
        duration: '20 mins',
        dressCode: 'Traditional attire',
        rules: 'Direct entry via northern dwara counter with digital barcode pass.'
      },
      {
        name: 'Ashlesha Bali Special Seva Pass',
        description: 'Assisted sanctum viewing and special archana prasadam participation.',
        chargePerDevotee: 400,
        durationMinutes: 45,
        duration: '45 mins',
        dressCode: 'Traditional Dhoti/Kurta or Saree',
        rules: 'Includes special archana and Kumkum/Theertha prasadam.'
      }
    ]
  },
  {
    name: 'Jwala Ji Temple (Kangra)',
    deity: 'Goddess Jwala Ji',
    category: 'Shakti Peeth',
    description: 'One of the holy 51 Maha Shakti Peethas located in the scenic Shivalik hills of Himachal Pradesh. Devotees worship the eternal, miraculous blue flames emerging continuously from natural fissures in the rock sanctum without any fuel, personifying Goddess Sati.',
    images: [
      'https://images.unsplash.com/photo-1599818816933-72215c2ba5f8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80'
    ],
    address: 'Jawalamukhi, Kangra District, Himachal Pradesh 176031',
    city: 'Kangra',
    state: 'Himachal Pradesh',
    openingHours: '05:00 AM - 10:00 PM',
    guidelines: 'Respectful modest clothing required. Devotees may offer dry coconuts, red chunri, and misri at the designated counter.',
    startingPrice: 0,
    isPopular: true,
    isVerified: true,
    trustLabel: 'DarshanEase Verified',
    darshanTypes: [
      {
        name: 'Pavitra Jwala Darshan (Free Entry)',
        description: 'General queue viewing of the nine eternal holy flames in the sanctum pit.',
        chargePerDevotee: 0,
        durationMinutes: 30,
        duration: '30 mins',
        dressCode: 'Modest warm devotional clothing',
        rules: 'Queue moves through main temple courtyards. Free laddu prasadam provided.'
      },
      {
        name: 'Special Sandhya Aarti & Havan Seva Pass',
        description: 'Special evening aarti darshan and participation in the sanctum havan ceremony.',
        chargePerDevotee: 200,
        durationMinutes: 35,
        duration: '35 mins',
        dressCode: 'Traditional Indian clothing',
        rules: 'Report at Temple Trust office 20 mins before evening aarti timing.'
      }
    ]
  },
  {
    name: 'Khatu Shyam Ji Temple',
    deity: 'Lord Khatu Shyam',
    category: 'Vaishnava',
    description: 'Renowned throughout India as the legendary shrine of Barbarika, grandson of Bhima, who was granted the divine boon by Lord Krishna to be worshipped as Shyam in the Kaliyuga. Devotees walk across the desert carrying holy Nishan flags seeking miracles.',
    images: [
      'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1620619767323-b95a89183081?auto=format&fit=crop&w=1200&q=80'
    ],
    address: 'Khatu Shyamji, Sikar District, Rajasthan 332602',
    city: 'Sikar',
    state: 'Rajasthan',
    openingHours: '05:30 AM - 09:30 PM',
    guidelines: 'Follow queue rails. Heavy crowds on Ekadashi and Dwadashi. Drinking water and resting shades provided throughout the pilgrimage complex.',
    startingPrice: 0,
    isPopular: true,
    isVerified: true,
    trustLabel: 'DarshanEase Verified',
    darshanTypes: [
      {
        name: 'Sheesh Darshan (Free General Entry)',
        description: 'General darshan line viewing the magnificent flower-bedecked sanctum of Shyam Baba.',
        chargePerDevotee: 0,
        durationMinutes: 40,
        duration: '40 mins',
        dressCode: 'Devotional casual or traditional attire',
        rules: 'Footwear counters available at entrance. Please do not discard plastics in temple premises.'
      },
      {
        name: 'VIP Sheegra Darshan Pass',
        description: 'Priority lane pass for senior citizens and pre-booked pilgrims for swift sanctum viewing.',
        chargePerDevotee: 150,
        durationMinutes: 20,
        duration: '20 mins',
        dressCode: 'Traditional attire',
        rules: 'Show digital e-pass at VIP Gate No. 1 counter.'
      },
      {
        name: 'Mangala Aarti Special Entry Pass',
        description: 'Early morning sanctum darshan during the sacred mangala aarti with chanting and mridangam.',
        chargePerDevotee: 350,
        durationMinutes: 30,
        duration: '30 mins',
        dressCode: 'Strict traditional dress code',
        rules: 'Entry gates close 10 minutes prior to aarti start.'
      }
    ]
  },
  {
    name: 'Vishnupad Temple (Gaya)',
    deity: 'Lord Vishnu',
    category: 'Vaishnava',
    description: 'Standing on the banks of the sacred Falgu river in Bihar, this historic black basalt octagonal stone shrine enshrines the 40 cm long footprint (Dharmasila) of Lord Vishnu stamped into solid rock. The premier Hindu pilgrimage site for ancestral salvation rites.',
    images: [
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80'
    ],
    address: 'Chandradhar Path, Gaya, Bihar 823001',
    city: 'Gaya',
    state: 'Bihar',
    openingHours: '06:00 AM - 09:00 PM',
    guidelines: 'Photography prohibited inside the footprint sanctum. Strict cleanliness must be maintained near the sanctum pool.',
    startingPrice: 0,
    isPopular: false,
    isVerified: true,
    trustLabel: 'DarshanEase Verified',
    darshanTypes: [
      {
        name: 'Charan Paduka Darshan (Free Entry)',
        description: 'General sanctum queue to view and offer prayers at Lord Vishnu\'s sacred footprint.',
        chargePerDevotee: 0,
        durationMinutes: 30,
        duration: '30 mins',
        dressCode: 'Modest Indian attire',
        rules: 'Enter through main silver door. Tulsi leaf offerings accepted.'
      },
      {
        name: 'Special Tirth Seva & Archana Pass',
        description: 'Personalized archana with sacred Tulsi leaves and direct view of the footprint stone.',
        chargePerDevotee: 150,
        durationMinutes: 25,
        duration: '25 mins',
        dressCode: 'Dhoti/Kurta or Saree',
        rules: 'Purohit assistance included. Special peda prasadam provided.'
      }
    ]
  },
  {
    name: 'Omkareshwar Jyotirlinga Temple',
    deity: 'Lord Shiva',
    category: 'Jyotirlinga',
    description: 'One of the holy 12 Jyotirlingas, situated on Mandhata island in the holy Narmada river, shaped naturally like the divine Hindu syllable "Om". Features ancient Nagara spires, stone-carved colonnades, and revered Narmada jalabhishek traditions.',
    images: [
      'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80'
    ],
    address: 'Mandhata Island, Khandwa District, Madhya Pradesh 450554',
    city: 'Khandwa',
    state: 'Madhya Pradesh',
    openingHours: '05:00 AM - 09:30 PM',
    guidelines: 'Boat transfers or footbridge available to reach the island. Bilva leaves and holy river water can be carried in metal lotas.',
    startingPrice: 0,
    isPopular: true,
    isVerified: true,
    trustLabel: 'DarshanEase Verified',
    darshanTypes: [
      {
        name: 'General Omkar Darshan (Free)',
        description: 'General pilgrim queue for holy darshan of the swayambhu Omkareshwar Jyotirlinga.',
        chargePerDevotee: 0,
        durationMinutes: 40,
        duration: '40 mins',
        dressCode: 'Modest devotional clothing',
        rules: 'Bridge and ghat queues converge at the lower mandapa.'
      },
      {
        name: 'VIP Sheegra Darshan Pass',
        description: 'Expedited corridor entry directly into the Jyotirlinga Sabha Mandapa.',
        chargePerDevotee: 200,
        durationMinutes: 20,
        duration: '20 mins',
        dressCode: 'Traditional attire',
        rules: 'Dedicated e-ticket lane via northern gopuram entrance.'
      },
      {
        name: 'Maha Rudrabhishek Morning Seva Pass',
        description: 'Sanctum participation in early morning Vedic Rudra Chanting and Panchamrit Abhishekam.',
        chargePerDevotee: 500,
        durationMinutes: 45,
        duration: '45 mins',
        dressCode: 'Unstitched white Dhoti for men, Saree for women',
        rules: 'Devotees must arrive 30 minutes before 06:00 AM abhishekam.'
      }
    ]
  },
  {
    name: 'Guruvayur Shri Krishna Temple',
    deity: 'Lord Krishna',
    category: 'Vaishnava',
    description: 'Revered as the "Bhuloka Vaikuntha" (Heaven on Earth), this premier temple in Kerala enshrines the four-armed deity of Lord Krishna carved from sacred Patala Anjana stone, holding the conch, discus, mace, and lotus. Legendary for traditional percussion rituals and elephant processions.',
    images: [
      'https://images.unsplash.com/photo-1599818816933-72215c2ba5f8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1620619767323-b95a89183081?auto=format&fit=crop&w=1200&q=80'
    ],
    address: 'Guruvayur, Thrissur District, Kerala 680101',
    city: 'Guruvayur',
    state: 'Kerala',
    openingHours: '03:00 AM - 09:00 PM',
    guidelines: 'Strict Kerala temple dress code: Men must wear Mundu (Dhoti) around waist and bare torso. Women must wear Saree, Set-Mundu, or Pavada. Mobile phones strictly forbidden.',
    startingPrice: 0,
    isPopular: true,
    isVerified: true,
    trustLabel: 'DarshanEase Verified',
    darshanTypes: [
      {
        name: 'Nirmalya Darshanam (Free Entry)',
        description: 'General queue darshan of Guruvayurappan adorned with auspicious tulsi garlands.',
        chargePerDevotee: 0,
        durationMinutes: 45,
        duration: '45 mins',
        dressCode: 'Strict Kerala Mundu/Saree dress code',
        rules: 'Clockwise pradakshina inside the chuttambalam.'
      },
      {
        name: 'Special Neyyappam & Seeveli Pass',
        description: 'Assisted queue pass during the magnificent Seeveli elephant procession.',
        chargePerDevotee: 200,
        durationMinutes: 25,
        duration: '25 mins',
        dressCode: 'Strict Kerala traditional dress code',
        rules: 'Includes special Guruvayur appam/payasam prasadam.'
      },
      {
        name: 'VIP Break Darshan Pass',
        description: 'Priority sanctum viewing during non-peak midday window for registered devotees.',
        chargePerDevotee: 500,
        durationMinutes: 20,
        duration: '20 mins',
        dressCode: 'Strict Kerala traditional dress code',
        rules: 'Identity verification with digital reservation code at Nadapandal desk.'
      }
    ]
  },
  {
    name: 'Tripura Sundari Temple (Matabari)',
    deity: 'Goddess Tripura Sundari',
    category: 'Shakti Peeth',
    description: 'One of the holy 51 Maha Shakti Peethas, established in 1501 AD by Maharaja Dhanya Manikya atop a hillock resembling the back of a tortoise (Kurmapitha). Home to the sacred Kalyan Sagar lake filled with sacred giant black softshell turtles.',
    images: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80'
    ],
    address: 'Matabari, Udaipur, Gomati District, Tripura 799114',
    city: 'Udaipur',
    state: 'Tripura',
    openingHours: '05:30 AM - 08:30 PM',
    guidelines: 'Traditional modesty in clothing is expected. Peda prasad made from condensed milk is a sacred specialty.',
    startingPrice: 0,
    isPopular: false,
    isVerified: true,
    trustLabel: 'DarshanEase Verified',
    darshanTypes: [
      {
        name: 'General Devi Darshan (Free)',
        description: 'General queue entry to worship Goddess Soroshi Tripura Sundari.',
        chargePerDevotee: 0,
        durationMinutes: 30,
        duration: '30 mins',
        dressCode: 'Modest Indian attire',
        rules: 'Barefoot entry across temple courtyard.'
      },
      {
        name: 'Special Sandhya Aarti & Bhog Pass',
        description: 'Evening sanctum aarti attendance and sanctified Mahaprasad participation.',
        chargePerDevotee: 150,
        durationMinutes: 25,
        duration: '25 mins',
        dressCode: 'Traditional Indian clothing',
        rules: 'Includes authentic Matabari peda prasadam packet.'
      }
    ]
  },
  {
    name: 'Chamundeshwari Temple (Chamundi Hill)',
    deity: 'Goddess Chamundeshwari',
    category: 'Shakti Peeth',
    description: 'Majestically situated atop Chamundi Hills overlooking the royal palace city of Mysuru, this 12th-century shrine honors Goddess Durga in her ferocious Chamunda aspect who vanquished the demon Mahishasura. Famous for its towering seven-tier Gopuram and the monolithic Nandi statue.',
    images: [
      'https://images.unsplash.com/photo-1620619767323-b95a89183081?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80'
    ],
    address: 'Chamundi Hill, Mysuru, Karnataka 570010',
    city: 'Mysuru',
    state: 'Karnataka',
    openingHours: '07:30 AM - 09:00 PM',
    guidelines: 'Modest clothing required. Free multi-level car parking and KSRTC bus shuttles available from Mysuru central bus station.',
    startingPrice: 0,
    isPopular: true,
    isVerified: true,
    trustLabel: 'DarshanEase Verified',
    darshanTypes: [
      {
        name: 'Dharma Darshanam (Free Entry)',
        description: 'Traditional public queue through the royal stone corridors of the sanctum.',
        chargePerDevotee: 0,
        durationMinutes: 45,
        duration: '45 mins',
        dressCode: 'Traditional or modest casual attire',
        rules: 'Queue lines managed with covered overhead shades.'
      },
      {
        name: 'Special Entry Darshanam Pass',
        description: 'Direct access lane for quick entry into the inner silver dwara mandapa.',
        chargePerDevotee: 100,
        durationMinutes: 20,
        duration: '20 mins',
        dressCode: 'Traditional attire',
        rules: 'Entry via South counter with digital barcode confirmation.'
      },
      {
        name: 'VIP Seva & Kumkuma Archana Pass',
        description: 'Special kumkuma archana seva and close sanctum darshan of Goddess Chamundeshwari.',
        chargePerDevotee: 300,
        durationMinutes: 30,
        duration: '30 mins',
        dressCode: 'Dhoti/Kurta or Saree',
        rules: 'Includes energized kumkum prasadam and Mysore jasmine garland blessings.'
      }
    ]
  },
  {
    name: 'Baidyanath Jyotirlinga (Baba Dham)',
    deity: 'Lord Shiva',
    category: 'Jyotirlinga',
    description: 'One of the holy 12 Jyotirlingas of Lord Shiva and also revered as a Shakti Peetha. The ultimate focal point of the monumental 105 km Shravan Kanwar Yatra, where millions of devotees carry holy Ganga water barefoot from Sultanganj to offer sacred jalabhishek to the Kamana Linga.',
    images: [
      'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80'
    ],
    address: 'Shivganga Muhalla, Deoghar, Jharkhand 814112',
    city: 'Deoghar',
    state: 'Jharkhand',
    openingHours: '04:00 AM - 09:00 PM',
    guidelines: 'Devotees offering holy jalabhishek should carry clean copper lotas. Follow queue corridors around the sacred Shivganga pool.',
    startingPrice: 0,
    isPopular: true,
    isVerified: true,
    trustLabel: 'DarshanEase Verified',
    darshanTypes: [
      {
        name: 'General Jalabhishek Darshan (Free)',
        description: 'General queue entry for holy jalabhishek and prayers at Baba Baidyanath Jyotirlinga.',
        chargePerDevotee: 0,
        durationMinutes: 50,
        duration: '50 mins',
        dressCode: 'Devotional saffron or modest Indian attire',
        rules: 'Free line operates continuously except during ritual Shringar break.'
      },
      {
        name: 'Sheegra Darshan (VIP Entry Pass)',
        description: 'Special fast-track entry via the VIP corridor directly into the sanctum courtyard.',
        chargePerDevotee: 250,
        durationMinutes: 25,
        duration: '25 mins',
        dressCode: 'Traditional Indian clothing',
        rules: 'Exclusive entry pass valid for specified time window.'
      },
      {
        name: 'Shringar Aarti Night Darshan Pass',
        description: 'Solemn evening attendance during the sandalwood paste and flower Shringar aarti ritual.',
        chargePerDevotee: 500,
        durationMinutes: 35,
        duration: '35 mins',
        dressCode: 'Strict traditional attire',
        rules: 'Entry begins at 07:30 PM. Limited capacity pass.'
      }
    ]
  }
];

async function addTemples() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB at:', MONGODB_URI);

    let addedCount = 0;

    for (const tData of NEW_TEMPLES) {
      const { darshanTypes, ...templeFields } = tData;

      let existing = await Temple.findOne({ name: templeFields.name });
      let templeId;

      if (existing) {
        console.log(`ℹ️ Temple "${templeFields.name}" already exists. Updating details...`);
        await Temple.updateOne({ _id: existing._id }, { $set: templeFields });
        templeId = existing._id;
      } else {
        const created = await Temple.create(templeFields);
        templeId = created._id;
        addedCount++;
        console.log(`✨ Created new temple: "${templeFields.name}" (${templeFields.state})`);
      }

      // Create Darshan Types for this temple
      for (const dtData of darshanTypes) {
        const existingDt = await DarshanType.findOne({
          temple: templeId,
          name: dtData.name
        });

        if (existingDt) {
          await DarshanType.updateOne({ _id: existingDt._id }, { $set: { ...dtData, status: 'active' } });
        } else {
          await DarshanType.create({
            temple: templeId,
            status: 'active',
            ...dtData
          });
          console.log(`   + Added Darshan Type: "${dtData.name}" (₹${dtData.chargePerDevotee})`);
        }
      }
    }

    console.log(`\n🎉 Finished adding/updating temples. Newly added: ${addedCount}`);
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error adding new temples:', err);
    process.exit(1);
  }
}

addTemples();
