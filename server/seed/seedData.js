const seedTemples = [
  {
    name: "Sri Venkateswara Swamy Temple",
    deity: "Lord Venkateswara",
    category: "Vaishnava",
    city: "Tirumala",
    state: "Andhra Pradesh",
    address: "S Mada St, Tirumala, Tirupati, Andhra Pradesh 517504",
    description: "Perched atop the sacred Venkatadri hill in the Seshachalam range, the ancient temple of Lord Venkateswara (Balaji) is one of the world's most venerated Hindu shrines, renowned for its divine vibrations, sacred Laddu prasadam, and ancient Dravidian architecture.",
    images: [
      "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "06:00 AM - 11:00 PM",
    guidelines: "Traditional South Indian dress code strictly mandatory: Dhoti/Kurta or Pyjama with Angavastram for men, Saree, Half-saree, or Chudidar with Dupatta for women. Mobile phones and electronics prohibited.",
    startingPrice: 0,
    isPopular: true,
    isVerified: true,
    isDemo: true,
    trustLabel: "Official Link-out",
    bookingMode: "official_linkout",
    officialUrl: "https://tirupatibalaji.ap.gov.in",
    lastReviewedDate: "2026-10-10",
    accessibilityNotes: "Dedicated Supadham queue for infants & senior citizens, battery-operated golf carts across Vaikuntam complexes, wheelchair access ramps at ATC entrance.",
    crowdLevelInfo: "High footfall (Average wait time: 2 - 3.5 hours for General; 45 mins for Special Entry)",
    visitingInfo: {
      bestTimeToVisit: "September to February",
      rituals: ["Suprabhatam", "Thomala Seva", "Archana", "Kalyanotsavam", "Ekanta Seva"],
      prasadTimings: "08:00 AM - 10:30 PM (Free Annaprasadam at Tarigonda Vengamamba Complex)",
      footwearPolicy: "Free secure footwear counters available at Vaikuntam Queue Complexes"
    },
    sourceVerification: {
      isVerified: true,
      sourceName: "Tirumala Tirupati Devasthanams (TTD) Board",
      sourceUrl: "https://tirupatibalaji.ap.gov.in",
      verificationNotes: "Official guidelines synchronized with TTD Seva Online portal."
    },
    contactInfo: {
      phone: "+91 877 227 7777",
      email: "helpdesk@ttdsevaonline.com",
      website: "https://tirupatibalaji.ap.gov.in"
    },
    darshanTypes: [
      {
        name: "Sarvadarshanam (Free General Entry)",
        description: "Public queue line open to all pilgrims without ticket charge.",
        chargePerDevotee: 0,
        dressCode: "Traditional South Indian attire",
        reportingNotice: "Please report to Vaikuntam Queue Complex 2 with government photo ID."
      },
      {
        name: "Special Entry Darshan (Seeghra Darshan)",
        description: "Expedited entry line via ATC Car Parking with complimentary sacred Laddu.",
        chargePerDevotee: 300,
        dressCode: "Traditional attire mandatory",
        reportingNotice: "Report at ATC Gate with verified pass."
      },
      {
        name: "VIP Break Darshan",
        description: "Early morning consecrated darshan during morning harathi hours with minimal queue time.",
        chargePerDevotee: 1000,
        dressCode: "Dhoti/Pancha for men, Silk Saree for women",
        reportingNotice: "Report at Vaikuntam Queue Complex 1."
      }
    ]
  },
  {
    name: "Kashi Vishwanath Temple",
    deity: "Lord Shiva",
    category: "Jyotirlinga",
    city: "Varanasi",
    state: "Uttar Pradesh",
    address: "Lahori Tola, Varanasi, Uttar Pradesh 221001",
    description: "Located on the sacred western bank of the holy river Ganga, Kashi Vishwanath is one of the most revered 12 Jyotirlingas. Devotees believe taking darshan here bestows ultimate liberation (Moksha). The renovated Vishwanath Dham connects the shrine directly to the Ganga Ghats.",
    images: [
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "03:00 AM - 11:00 PM",
    guidelines: "Traditional modest attire required. Locker facilities available at the Kashi Vishwanath Corridor for phones, belts, leather articles, and footwear.",
    startingPrice: 0,
    isPopular: true,
    isVerified: true,
    isDemo: true,
    trustLabel: "DarshanEase Verified",
    bookingMode: "demo_booking",
    officialUrl: "https://shrikashivishwanath.org",
    lastReviewedDate: "2026-10-12",
    accessibilityNotes: "Escalators and hydraulic lifts available from Manikarnika and Lalita Ghat entrances to the Temple Chowk. Wheelchairs available at Helpdesk Gate 4.",
    crowdLevelInfo: "Heavy during Morning & Evening Ganga Aarti (Corridor queue approx. 30 - 60 mins)",
    visitingInfo: {
      bestTimeToVisit: "October to March (Dev Deepavali is peak period)",
      rituals: ["Mangala Aarti", "Bhog Aarti", "Sandhya Aarti", "Shringar Aarti", "Shayan Aarti"],
      prasadTimings: "06:00 AM - 09:30 PM",
      footwearPolicy: "Footwear counters available at Corridor Gate No. 4 and Lalita Ghat"
    },
    sourceVerification: {
      isVerified: true,
      sourceName: "Shri Kashi Vishwanath Temple Trust & District Administration",
      sourceUrl: "https://shrikashivishwanath.org",
      verificationNotes: "Protocol reviewed with latest Shri Kashi Vishwanath Dham guidelines."
    },
    contactInfo: {
      phone: "+91 542 239 2629",
      email: "support@shrikashivishwanath.org",
      website: "https://shrikashivishwanath.org"
    },
    darshanTypes: [
      {
        name: "Sugam Darshan (Special Entry)",
        description: "Assisted priority queue through the corridor with temple sevak guidance.",
        chargePerDevotee: 300,
        dressCode: "Modest Indian or formal clothing",
        reportingNotice: "Report at Gate No. 4 (Chhattadwar) Corridor entry."
      },
      {
        name: "Mangala Aarti Darshan",
        description: "Auspicious sanctum entry during early morning Mangala Aarti before sunrise.",
        chargePerDevotee: 500,
        dressCode: "Unstitched Dhoti for men, Saree for women",
        reportingNotice: "Report by 02:45 AM at Corridor Gate."
      },
      {
        name: "General Free Darshan",
        description: "Standard public pilgrimage line through the Vishwanath Dham precinct.",
        chargePerDevotee: 0,
        dressCode: "Modest clothing",
        reportingNotice: "Report 30 minutes before time slot."
      }
    ]
  },
  {
    name: "Somnath Temple",
    deity: "Lord Shiva",
    category: "Jyotirlinga",
    city: "Prabhas Patan",
    state: "Gujarat",
    address: "Somnath Mandir Rd, Prabhas Patan, Gujarat 362268",
    description: "The premier among the twelve holy Jyotirlingas, Somnath stands magnificently on the shores of the Arabian Sea at Triveni Sangam. Rebuilt with exquisite Chalukya stone craft, it represents the timeless eternal spirit of Indian devotion.",
    images: [
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "06:00 AM - 09:30 PM",
    guidelines: "Strict electronic check. Mobile phones, cameras, leather belts, and smart watches must be deposited in safe cloakrooms. Modest Indian clothing required.",
    startingPrice: 0,
    isPopular: true,
    isVerified: true,
    isDemo: true,
    trustLabel: "Official",
    bookingMode: "demo_booking",
    officialUrl: "https://somnath.org",
    lastReviewedDate: "2026-10-08",
    accessibilityNotes: "Wheelchairs provided free of cost with helper ramp throughout sea-face promenade and sanctum courtyard.",
    crowdLevelInfo: "Moderate (Average wait time: 30-45 mins; Sound & Light show in evening has high demand)",
    visitingInfo: {
      bestTimeToVisit: "November to February",
      rituals: ["Pratah Aarti", "Madhyahna Aarti", "Sandhya Aarti", "Sound & Light Show (Jay Somnath)"],
      prasadTimings: "07:30 AM - 08:30 PM",
      footwearPolicy: "Footwear locker booths outside Main Security Gate"
    },
    sourceVerification: {
      isVerified: true,
      sourceName: "Shree Somnath Trust (SST)",
      sourceUrl: "https://somnath.org",
      verificationNotes: "Verified with Shree Somnath Trust visitor regulations."
    },
    contactInfo: {
      phone: "+91 2876 231 200",
      email: "info@somnath.org",
      website: "https://somnath.org"
    },
    darshanTypes: [
      {
        name: "General Sea-View Darshan",
        description: "Open queue into the grand Sabha Mandapa facing the sacred Jyotirlinga.",
        chargePerDevotee: 0,
        dressCode: "Traditional or neat casual",
        reportingNotice: "Report at Digvijay Dwar."
      },
      {
        name: "Special Puja Darshan (Someshwar Mahapuja)",
        description: "Exclusive puja offering with consecrated Ganga jal and Bilva patra.",
        chargePerDevotee: 250,
        dressCode: "Dhoti/Kurta for men, Saree for women",
        reportingNotice: "Report at Trust Puja Office 15 mins prior."
      }
    ]
  },
  {
    name: "Mahakaleshwar Jyotirlinga",
    deity: "Lord Shiva",
    category: "Jyotirlinga",
    city: "Ujjain",
    state: "Madhya Pradesh",
    address: "Jaisinghpura, Ujjain, Madhya Pradesh 456006",
    description: "Famous for its world-renowned dawn Bhasma Aarti, Mahakaleshwar in Ujjain is the only south-facing (Dakshinmukhi) Jyotirlinga. The grand Mahakal Lok corridor showcases Lord Shiva's leelas through magnificent stone sculptures and murals.",
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "04:00 AM - 11:00 PM",
    guidelines: "Bhasma Aarti requires mandatory pre-registration. Unstitched pure cotton/silk Dhoti-Sola for men and Saree for women required for Garbhagriha entry.",
    startingPrice: 0,
    isPopular: true,
    isVerified: true,
    isDemo: true,
    trustLabel: "Authorized Partner",
    bookingMode: "demo_booking",
    officialUrl: "https://shrimahakaleshwar.com",
    lastReviewedDate: "2026-10-14",
    accessibilityNotes: "Golf carts operating across 900m Mahakal Lok corridor. Free wheelchair assistance for Divyang and senior citizens at Gate No. 4.",
    crowdLevelInfo: "High to Peak rush during Mondays and Shravan month (Queue: 1 - 2.5 hours)",
    visitingInfo: {
      bestTimeToVisit: "October to March",
      rituals: ["Bhasma Aarti (04:00 AM)", "Naivedya Aarti", "Sandhya Aarti", "Shayan Aarti"],
      prasadTimings: "06:30 AM - 10:00 PM (Mahakal Laddu Prasad counters)",
      footwearPolicy: "Central footwear deposit counter at Mahakal Lok parking"
    },
    sourceVerification: {
      isVerified: true,
      sourceName: "Shri Mahakaleshwar Temple Management Committee",
      sourceUrl: "https://shrimahakaleshwar.com",
      verificationNotes: "Synchronized with Ujjain Smart City Mahakal guidelines."
    },
    contactInfo: {
      phone: "+91 734 255 0563",
      email: "office@shrimahakaleshwar.com",
      website: "https://shrimahakaleshwar.com"
    },
    darshanTypes: [
      {
        name: "General Darshan (Nandi Hall)",
        description: "Pilgrim queue passing through the newly inaugurated Mahakal Lok corridor.",
        chargePerDevotee: 0,
        dressCode: "Modest Indian clothing",
        reportingNotice: "Report at Gate No. 4 (Bada Ganesh side)."
      },
      {
        name: "Sheeghra Darshan (Fast Track)",
        description: "Priority queue with direct access to Nandi Hall ramp.",
        chargePerDevotee: 250,
        dressCode: "Traditional clothing recommended",
        reportingNotice: "Report at VIP Counter Gate 1."
      },
      {
        name: "Garbhagriha Jalabhishek Pass",
        description: "Sanctum sanctorum entry to offer holy water directly upon the Jyotirlinga during designated hours.",
        chargePerDevotee: 750,
        dressCode: "Unstitched Dhoti-Kurta (Sola) for men, Traditional Saree for women",
        reportingNotice: "Report 45 minutes before allotted morning window."
      }
    ]
  },
  {
    name: "Shri Mata Vaishno Devi",
    deity: "Goddess Durga",
    category: "Shakti Peeth",
    city: "Katra",
    state: "Jammu and Kashmir",
    address: "Bhavan, Katra, Reasi District, Jammu and Kashmir 182301",
    description: "Nestled in the sacred Trikuta mountains at an elevation of 5,200 feet, the holy cave shrine of Mata Vaishno Devi manifests the unified divine energies of Maha Kali, Maha Lakshmi, and Maha Saraswati as holy natural rock Pindies.",
    images: [
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "05:00 AM - 10:00 PM (Open 24 Hours for Yatra)",
    guidelines: "Mandatory RFID Yatra Access Card registration at Katra before commencing the 12 km trek. Battery auto-cars and helicopter services available from Sanjichhat.",
    startingPrice: 0,
    isPopular: true,
    isVerified: true,
    isDemo: true,
    trustLabel: "Official Link-out",
    bookingMode: "official_linkout",
    officialUrl: "https://www.maavaishnodevi.org",
    lastReviewedDate: "2026-10-11",
    accessibilityNotes: "Battery-operated cars from Himkoti to Bhavan for senior citizens, ropeway connecting Bhavan to Bhairon Ghati, free medical dispensary camps along track.",
    crowdLevelInfo: "Moderate in weekdays, High on Navratri & weekends (Bhavan queue: 1 - 2 hours)",
    visitingInfo: {
      bestTimeToVisit: "March to November",
      rituals: ["Atka Aarti (Morning & Evening)", "Pindi Darshan", "Bhairon Nath Visit"],
      prasadTimings: "Round the clock at Shrine Board Bhojanalayas",
      footwearPolicy: "Free lockers for shoes and bags at Bhavan Bathing Ghats"
    },
    sourceVerification: {
      isVerified: true,
      sourceName: "Shri Mata Vaishno Devi Shrine Board (SMVDSB)",
      sourceUrl: "https://www.maavaishnodevi.org",
      verificationNotes: "RFID registration and helicopter policies linked to official SMVDSB portal."
    },
    contactInfo: {
      phone: "+91 1991 232 124",
      email: "feedback@maavaishnodevi.net",
      website: "https://www.maavaishnodevi.org"
    },
    darshanTypes: [
      {
        name: "General Yatra Darshan",
        description: "Continuous Holy Cave Darshan with RFID verification token.",
        chargePerDevotee: 0,
        dressCode: "Comfortable trekking wear, modest clothing inside sanctum",
        reportingNotice: "Report at Bhavan Gate No. 3 with RFID Card."
      },
      {
        name: "Atka Aarti Live Participation",
        description: "Seated consecrated participation in the sacred morning/evening Atka Aarti outside the Holy Cave.",
        chargePerDevotee: 1000,
        dressCode: "Traditional Indian attire",
        reportingNotice: "Report 1 hour prior at Atka Aarti complex."
      }
    ]
  },
  {
    name: "Shirdi Sai Baba Temple",
    deity: "Sai Baba",
    category: "Other Deities",
    city: "Shirdi",
    state: "Maharashtra",
    address: "Taluka Rahata, Shirdi, Ahmednagar, Maharashtra 423109",
    description: "The sanctified Samadhi Mandir of Sai Baba in Shirdi draws millions of devotees from around the globe seeking his universal teachings of Shraddha (Faith) and Saburi (Patience).",
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "04:00 AM - 11:15 PM",
    guidelines: "Devotees must carry biometric or photo ID. Decent attire required. Free Prasad Bhojanalaya operates near the temple complex.",
    startingPrice: 0,
    isPopular: true,
    isVerified: true,
    isDemo: true,
    trustLabel: "DarshanEase Verified",
    bookingMode: "demo_booking",
    officialUrl: "https://online.sai.org.in",
    lastReviewedDate: "2026-10-09",
    accessibilityNotes: "PRO office handles senior citizen wheelchairs, battery carts from Gate 1 to Samadhi Mandir, dedicated special lane for aged pilgrims.",
    crowdLevelInfo: "Heavy on Thursdays & Guru Purnima (Queue approx 1 - 2 hours)",
    visitingInfo: {
      bestTimeToVisit: "July to March",
      rituals: ["Kakad Aarti (04:30 AM)", "Midday Aarti", "Dhoop Aarti", "Shej Aarti (10:30 PM)"],
      prasadTimings: "06:00 AM - 10:30 PM (Sai Ladoo prasad counters)",
      footwearPolicy: "Footwear counters available at PRO Gate 1 & 2"
    },
    sourceVerification: {
      isVerified: true,
      sourceName: "Shri Saibaba Sansthan Trust (SSST)",
      sourceUrl: "https://online.sai.org.in",
      verificationNotes: "Aarti schedule and VIP pass guidelines verified with SSST."
    },
    contactInfo: {
      phone: "+91 2423 258 500",
      email: "support@sai.org.in",
      website: "https://online.sai.org.in"
    },
    darshanTypes: [
      {
        name: "General Samadhi Darshan",
        description: "Public queue through the air-conditioned pilgrim waiting complex.",
        chargePerDevotee: 0,
        dressCode: "Neat casual or traditional",
        reportingNotice: "Report at Gate No. 2."
      },
      {
        name: "VIP / Paid Pass Darshan",
        description: "Fast-track entry into Samadhi Mandir sanctum.",
        chargePerDevotee: 200,
        dressCode: "Traditional attire",
        reportingNotice: "Report at Gate No. 1 with online ticket."
      },
      {
        name: "Kakad Aarti Special Entry",
        description: "Consecrated dawn Aarti witnessing the awakening of Sai Baba.",
        chargePerDevotee: 600,
        dressCode: "Traditional Indian attire",
        reportingNotice: "Report by 03:45 AM at PRO Office."
      }
    ]
  },
  {
    name: "Jagannath Temple",
    deity: "Lord Jagannath",
    category: "Vaishnava",
    city: "Puri",
    state: "Odisha",
    address: "Grand Rd, Puri, Odisha 752001",
    description: "One of the sacred Char Dhams, the ancient 12th-century shrine of Lord Jagannath, Balabhadra, and Devi Subhadra is world-famous for its annual Ratha Yatra and the divine Mahaprasad prepared in the world's largest traditional temple kitchen.",
    images: [
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "05:00 AM - 11:00 PM",
    guidelines: "Only practicing Hindus allowed inside as per historic temple custom. Traditional unstitched clothing preferred. Mobile phones, leather items, and cameras strictly barred.",
    startingPrice: 0,
    isPopular: true,
    isVerified: true,
    isDemo: true,
    trustLabel: "Information Only",
    bookingMode: "none",
    officialUrl: "https://jagannath.nic.in",
    lastReviewedDate: "2026-10-12",
    accessibilityNotes: "North Gate (Hasti Dwara) has ramp entry. Electric shuttle service across Grand Road from Saradha Bali.",
    crowdLevelInfo: "High throughout the year (Ananda Bazar has easy access for Mahaprasad)",
    visitingInfo: {
      bestTimeToVisit: "November to February",
      rituals: ["Dwaraphita", "Mangala Alati", "Mailam", "Sandhya Alati", "Badashinghara"],
      prasadTimings: "12:00 PM - 09:00 PM (Sacred 56 Bhog Mahaprasad at Ananda Bazar)",
      footwearPolicy: "Free footwear stands operated by administration at Simhadwara"
    },
    sourceVerification: {
      isVerified: true,
      sourceName: "Shree Jagannath Temple Administration (SJTA)",
      sourceUrl: "https://jagannath.nic.in",
      verificationNotes: "Information strictly reference only. Jagannath Temple does NOT sell online darshan passes."
    },
    contactInfo: {
      phone: "+91 6752 222 002",
      email: "contact@jagannath.nic.in",
      website: "https://jagannath.nic.in"
    },
    darshanTypes: [
      {
        name: "Simhadwara General Darshan",
        description: "Traditional queue ascending the 22 sacred steps (Baisi Pahacha) to the Inner Courtyard.",
        chargePerDevotee: 0,
        dressCode: "Traditional Indian attire",
        reportingNotice: "Report at Lions Gate (Simhadwara)."
      }
    ]
  },
  {
    name: "Meenakshi Amman Temple",
    deity: "Goddess Meenakshi",
    category: "Other Deities",
    city: "Madurai",
    state: "Tamil Nadu",
    address: "Madurai Main, Madurai, Tamil Nadu 625001",
    description: "An architectural wonder of South India with twelve towering gopurams decorated with thousands of colorful mythological statues, dedicated to Goddess Meenakshi (Parvati) and Lord Sundareswarar (Shiva).",
    images: [
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "05:00 AM - 12:30 PM, 04:00 PM - 10:00 PM",
    guidelines: "Strict dress code: Dhotis or formal trousers for men; Sarees or Churidar with Dupatta for women. Jeans, shorts, and skirts prohibited. Mobile phones deposited at entrance counters.",
    startingPrice: 0,
    isPopular: true,
    isVerified: true,
    isDemo: true,
    trustLabel: "DarshanEase Verified",
    bookingMode: "demo_booking",
    officialUrl: "https://maduraimeenakshi.hrce.tn.gov.in",
    lastReviewedDate: "2026-10-07",
    accessibilityNotes: "South Tower entrance has wheelchair ramp and dedicated assistance volunteers for elderly pilgrims.",
    crowdLevelInfo: "Moderate to High during Evening Palliyarai Puja (Night Ceremony)",
    visitingInfo: {
      bestTimeToVisit: "October to March",
      rituals: ["Thiruvanandal", "Vizha Pooja", "Uchikkala Pooja", "Sayarakshai", "Palliyarai Pooja"],
      prasadTimings: "08:00 AM - 09:30 PM",
      footwearPolicy: "Footwear and mobile counter at East and West Gopuram towers"
    },
    sourceVerification: {
      isVerified: true,
      sourceName: "Tamil Nadu HR & CE Department",
      sourceUrl: "https://maduraimeenakshi.hrce.tn.gov.in",
      verificationNotes: "Verified per Tamil Nadu Temple Entry rules."
    },
    contactInfo: {
      phone: "+91 452 234 4360",
      email: "meenakshitemple@tnhrce.org",
      website: "https://maduraimeenakshi.hrce.tn.gov.in"
    },
    darshanTypes: [
      {
        name: "Dharma Darshanam (Free Entry)",
        description: "Public queue through the Thousand Pillar Hall and sanctum praakaram.",
        chargePerDevotee: 0,
        dressCode: "Traditional Dravidian attire",
        reportingNotice: "Report at East Gopuram."
      },
      {
        name: "Special Darshan Entry",
        description: "Priority corridor ticket for accelerated entry into Meenakshi and Sundareswarar shrines.",
        chargePerDevotee: 100,
        dressCode: "Traditional Indian attire",
        reportingNotice: "Report at West Tower ticket counter."
      }
    ]
  },
  {
    name: "Kedarnath Temple",
    deity: "Lord Shiva",
    category: "Jyotirlinga",
    city: "Rudraprayag",
    state: "Uttarakhand",
    address: "Kedarnath, Rudraprayag District, Uttarakhand 246445",
    description: "Perched at 3,584 meters altitude against snow-capped Himalayan peaks near the Mandakini river, Kedarnath is the highest of the 12 sacred Jyotirlingas and the focal jewel of the holy Char Dham yatra.",
    images: [
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "05:00 AM - 09:00 PM (Seasonal May to November)",
    guidelines: "Mandatory Uttarakhand Char Dham biometric registration. Warm thermal wear and physical fitness required for the 16 km mountain trek from Gaurikund. Helicopter slots must be pre-booked on IRCTC.",
    startingPrice: 0,
    isPopular: true,
    isVerified: true,
    isDemo: true,
    trustLabel: "Official Link-out",
    bookingMode: "official_linkout",
    officialUrl: "https://bked.gov.in",
    lastReviewedDate: "2026-10-13",
    accessibilityNotes: "Palki (palanquin), Kandi (basket), and pony services available at Gaurikund. Government helipads operational at Guptkashi, Phata, and Sersi.",
    crowdLevelInfo: "Peak during May-June and Autumn (Temple queue: 1.5 - 3 hours)",
    visitingInfo: {
      bestTimeToVisit: "May to June and September to October (Closed during heavy winter snow)",
      rituals: ["Maha Abhishek", "Rudrabhishek", "Shringar Aarti", "Evening Sandhya Aarti"],
      prasadTimings: "07:00 AM - 08:30 PM",
      footwearPolicy: "Footwear deposit at Temple Chowk tents"
    },
    sourceVerification: {
      isVerified: true,
      sourceName: "Shri Badrinath-Kedarnath Temple Committee (BKTC)",
      sourceUrl: "https://bked.gov.in",
      verificationNotes: "Registration and biometric mandates verified with Uttarakhand Tourism Development Board."
    },
    contactInfo: {
      phone: "+91 135 274 1600",
      email: "support@bked.gov.in",
      website: "https://bked.gov.in"
    },
    darshanTypes: [
      {
        name: "General Pilgrim Darshan",
        description: "Holy Sabha Mandapam queue to view the triangular Swayambhu Shiva Lingam.",
        chargePerDevotee: 0,
        dressCode: "Warm thermal outerwear allowed; modest clothing inside",
        reportingNotice: "Report at Temple Chowk."
      },
      {
        name: "Assisted Special Puja Darshan",
        description: "Priority early morning darshan including Kedarnath Maha-Prasad and Rudraksha beads.",
        chargePerDevotee: 1000,
        dressCode: "Traditional attire",
        reportingNotice: "Report at Badri-Kedar Samiti counter near temple gate."
      }
    ]
  },
  {
    name: "Badrinath Temple",
    deity: "Lord Vishnu",
    category: "Vaishnava",
    city: "Chamoli",
    state: "Uttarakhand",
    address: "Badrinath, Chamoli District, Uttarakhand 246422",
    description: "Located between Nar and Narayana mountain ranges alongside the Alaknanda river, Badrinath (Badrikashram) is one of the four cardinal Char Dhams where Lord Vishnu is worshipped as Badri Vishal in meditative posture.",
    images: [
      "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "04:30 AM - 09:00 PM (Seasonal May to November)",
    guidelines: "Devotees take holy bath in Tapt Kund natural hot sulphur springs before entering. Mandatory Char Dham registration card.",
    startingPrice: 0,
    isPopular: true,
    isVerified: true,
    isDemo: true,
    trustLabel: "Official Link-out",
    bookingMode: "official_linkout",
    officialUrl: "https://bked.gov.in",
    lastReviewedDate: "2026-10-13",
    accessibilityNotes: "Drive-up accessible vehicle parking located 300 meters from temple. Wheelchair path constructed over Alaknanda bridge.",
    crowdLevelInfo: "High in opening weeks (May) and Autumn (Average queue: 45 - 90 mins)",
    visitingInfo: {
      bestTimeToVisit: "May to June and September to October",
      rituals: ["Maha Abhishek", "Geeta Path", "Sandhya Aarti", "Shayan Aarti"],
      prasadTimings: "07:00 AM - 08:30 PM",
      footwearPolicy: "Footwear stands at entrance of Tapt Kund courtyard"
    },
    sourceVerification: {
      isVerified: true,
      sourceName: "Shri Badrinath-Kedarnath Temple Committee",
      sourceUrl: "https://bked.gov.in",
      verificationNotes: "Opening and closing dates governed by BKTC."
    },
    contactInfo: {
      phone: "+91 135 274 1600",
      email: "contact@bked.gov.in",
      website: "https://bked.gov.in"
    },
    darshanTypes: [
      {
        name: "General Badri Vishal Darshan",
        description: "Public queue to take darshan of the black Shaligram stone idol of Lord Badrinath.",
        chargePerDevotee: 0,
        dressCode: "Warm modest Indian clothing",
        reportingNotice: "Report at Main Bridge Gate."
      },
      {
        name: "Maha Abhishek Morning Seva",
        description: "Witness the divine dawn abhishekam performed with sesame oil, sandalwood, and camphor.",
        chargePerDevotee: 800,
        dressCode: "Traditional Dhoti/Saree",
        reportingNotice: "Report by 04:00 AM at BKTC Office."
      }
    ]
  },
  {
    name: "Kamakhya Temple",
    deity: "Goddess Kamakhya",
    category: "Shakti Peeth",
    city: "Guwahati",
    state: "Assam",
    address: "Nilachal Hills, Kamakhya, Guwahati, Assam 781010",
    description: "Perched atop Nilachal Hill overlooking the Brahmaputra River, Kamakhya is the most venerated Tantric Shakti Peetha celebrating the eternal creative power of Mother Nature and Goddess Kamakhya.",
    images: [
      "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "05:30 AM - 01:00 PM, 02:30 PM - 05:30 PM",
    guidelines: "The natural sanctum is a subterranean cave with a natural rock spring. Wear comfortable flat footwear to descend stone steps.",
    startingPrice: 0,
    isPopular: false,
    isVerified: true,
    isDemo: true,
    trustLabel: "DarshanEase Verified",
    bookingMode: "demo_booking",
    officialUrl: "https://maakamakhya.org",
    lastReviewedDate: "2026-10-09",
    accessibilityNotes: "Hilltop elevator operational for senior citizens; electric shuttle cars from parking to main temple gate.",
    crowdLevelInfo: "Heavy during Ambubachi Mela (June); Moderate on other weekdays (Queue approx 1 hour)",
    visitingInfo: {
      bestTimeToVisit: "October to April",
      rituals: ["Nitya Puja", "Madhyahna Puja", "Sandhya Aarti"],
      prasadTimings: "10:00 AM - 05:00 PM",
      footwearPolicy: "Footwear locker counter at Dol Mandap entrance"
    },
    sourceVerification: {
      isVerified: true,
      sourceName: "Kamakhya Debutter Board",
      sourceUrl: "https://maakamakhya.org",
      verificationNotes: "Ritual timings confirmed with Kamakhya Bor-Doloi office."
    },
    contactInfo: {
      phone: "+91 361 273 4654",
      email: "support@maakamakhya.org",
      website: "https://maakamakhya.org"
    },
    darshanTypes: [
      {
        name: "General Cave Darshan",
        description: "Public queue descending into the sacred cave sanctum.",
        chargePerDevotee: 0,
        dressCode: "Traditional attire",
        reportingNotice: "Report at Main Temple Gate."
      },
      {
        name: "Special Entry Darshan",
        description: "Expedited queue pass issued by temple debutter office.",
        chargePerDevotee: 501,
        dressCode: "Traditional Indian attire",
        reportingNotice: "Report at Counter 2 with valid ID."
      }
    ]
  },
  {
    name: "Dwarkadhish Temple",
    deity: "Lord Krishna",
    category: "Vaishnava",
    city: "Dwarka",
    state: "Gujarat",
    address: "Dwarka, Devbhumi Dwarka District, Gujarat 361335",
    description: "Also known as the Jagat Mandir, this 2,200-year-old 5-story limestone architectural marvel stands where Lord Krishna established his ancient golden kingdom at the mouth of the Gomti river.",
    images: [
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "06:30 AM - 01:00 PM, 05:00 PM - 09:30 PM",
    guidelines: "Traditional respectful Indian clothing. Mobile phones and cameras must be deposited in entrance token cloakrooms. Holy flag (Dhwaja) change occurs 5 times daily.",
    startingPrice: 0,
    isPopular: true,
    isVerified: true,
    isDemo: true,
    trustLabel: "Official",
    bookingMode: "demo_booking",
    officialUrl: "https://dwarkadhish.org",
    lastReviewedDate: "2026-10-10",
    accessibilityNotes: "Moksha Dwar entrance has gently sloped ramps. Free wheelchairs provided by administrative office.",
    crowdLevelInfo: "Moderate to high during evening Sandhya Aarti (Queue approx 30-50 mins)",
    visitingInfo: {
      bestTimeToVisit: "October to March (Janmashtami is grand peak celebration)",
      rituals: ["Mangla Aarti", "Shringar Aarti", "Gwal Bhog", "Sandhya Aarti", "Shayan Aarti"],
      prasadTimings: "08:00 AM - 09:00 PM (Dwarka Laddu and Makhan Mishri prasad)",
      footwearPolicy: "Footwear stands at Moksha Dwar and Swarga Dwar"
    },
    sourceVerification: {
      isVerified: true,
      sourceName: "Shree Dwarkadhish Devasthan Samiti",
      sourceUrl: "https://dwarkadhish.org",
      verificationNotes: "Flag hoist schedule and daily darshan timings verified."
    },
    contactInfo: {
      phone: "+91 2892 234 080",
      email: "info@dwarkadhish.org",
      website: "https://dwarkadhish.org"
    },
    darshanTypes: [
      {
        name: "General Jagat Mandir Darshan",
        description: "Public queue through the magnificent carved pillars to the central shrine.",
        chargePerDevotee: 0,
        dressCode: "Traditional attire",
        reportingNotice: "Report at Swarga Dwar entrance."
      },
      {
        name: "Special Darshan Entry",
        description: "Priority queue pass for swift darshan during Aarti hours.",
        chargePerDevotee: 200,
        dressCode: "Dhoti/Kurta for men, Saree for women",
        reportingNotice: "Report at Special Entry Counter."
      }
    ]
  },
  {
    name: "Srisailam Mallikarjuna Temple",
    deity: "Lord Shiva",
    category: "Jyotirlinga",
    city: "Srisailam",
    state: "Andhra Pradesh",
    address: "Srisailam, Nandyal District, Andhra Pradesh 518101",
    description: "Perched on the verdant Nallamala hills along the Krishna River, Srisailam is uniquely sanctified as both one of the 12 Jyotirlingas (Lord Mallikarjuna) and one of the 18 Maha Shakti Peethas (Goddess Bhramaramba).",
    images: [
      "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "04:30 AM - 10:00 PM",
    guidelines: "Traditional South Indian attire required. Devotees are permitted to perform Sparsha Darshan (touching the sacred Jyotirlinga) during specified morning/afternoon hours with ticket.",
    startingPrice: 0,
    isPopular: false,
    isVerified: true,
    isDemo: true,
    trustLabel: "DarshanEase Verified",
    bookingMode: "demo_booking",
    officialUrl: "https://srisailamonline.com",
    lastReviewedDate: "2026-10-08",
    accessibilityNotes: "Wheelchairs and assistance volunteers available at Devasthanam enquiry office near Raja Gopuram.",
    crowdLevelInfo: "Moderate (Queue: 40-75 mins; Mahashivratri attracts dense crowds)",
    visitingInfo: {
      bestTimeToVisit: "September to March",
      rituals: ["Suprabhatam", "Maha Mangala Harathi", "Sparsha Darshan", "Kalyanotsavam"],
      prasadTimings: "06:30 AM - 09:30 PM",
      footwearPolicy: "Footwear counters available at Annadana Bhavan and Raja Gopuram"
    },
    sourceVerification: {
      isVerified: true,
      sourceName: "Sri Bhramaramba Mallikarjuna Swamy Devasthanam",
      sourceUrl: "https://srisailamonline.com",
      verificationNotes: "Sparsha darshan timings and dress codes verified with Devasthanam portal."
    },
    contactInfo: {
      phone: "+91 8524 288 888",
      email: "helpdesk@srisailamonline.com",
      website: "https://srisailamonline.com"
    },
    darshanTypes: [
      {
        name: "Sarvadarshanam (Free Entry)",
        description: "Public queue into the inner sanctum praakaram.",
        chargePerDevotee: 0,
        dressCode: "Traditional South Indian attire",
        reportingNotice: "Report at General Queue Complex."
      },
      {
        name: "Seeghra Darshanam (Quick Entry)",
        description: "Expedited queue with dedicated lane into the sanctum.",
        chargePerDevotee: 150,
        dressCode: "Traditional attire",
        reportingNotice: "Report at Special Entry Booth."
      },
      {
        name: "Sparsha Darshan Pass",
        description: "Special sacred privilege to touch and offer holy water to the Mallikarjuna Jyotirlinga.",
        chargePerDevotee: 500,
        dressCode: "Dhoti/Pancha for men without shirt, Saree for women",
        reportingNotice: "Report 30 mins before allocated batch time."
      }
    ]
  },
  {
    name: "Yadadri Lakshmi Narasimha Temple",
    deity: "Lord Narasimha",
    category: "Vaishnava",
    city: "Yadagirigutta",
    state: "Telangana",
    address: "Yadadri Temple Hill, Yadagirigutta, Telangana 508115",
    description: "The grandly reconstructed 'Telangana Tirupati' sculpted purely out of black Krishna Shila stone, enshrining the Pancha Narasimha manifestations within an ancient natural cave on the sacred Yadagiri hillock.",
    images: [
      "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "04:00 AM - 09:30 PM",
    guidelines: "Traditional dress required for sanctum entry. Continuous uphill electric shuttle buses and escalators operating from downhill bus terminal.",
    startingPrice: 0,
    isPopular: false,
    isVerified: true,
    isDemo: true,
    trustLabel: "DarshanEase Verified",
    bookingMode: "demo_booking",
    officialUrl: "https://yadadritemple.telangana.gov.in",
    lastReviewedDate: "2026-10-12",
    accessibilityNotes: "Modern escalator towers, multi-level elevators, and golf cart assistance for senior citizens.",
    crowdLevelInfo: "Moderate on weekdays, High on Sundays (Queue: 30 - 60 mins)",
    visitingInfo: {
      bestTimeToVisit: "October to March",
      rituals: ["Suprabhatam", "Abhishekam", "Nitya Kalyanam", "Maha Harathi"],
      prasadTimings: "07:00 AM - 09:30 PM (Yadadri Laddu & Pulihora)",
      footwearPolicy: "Footwear locker booths at hilltop queue complex"
    },
    sourceVerification: {
      isVerified: true,
      sourceName: "Yadagirigutta Temple Development Authority (YTDA)",
      sourceUrl: "https://yadadritemple.telangana.gov.in",
      verificationNotes: "Verified per Telangana Government Endowment Department."
    },
    contactInfo: {
      phone: "+91 8685 236 623",
      email: "contact@yadadritemple.telangana.gov.in",
      website: "https://yadadritemple.telangana.gov.in"
    },
    darshanTypes: [
      {
        name: "Dharma Darshanam (Free Entry)",
        description: "General queue through the grand carved stone corridor.",
        chargePerDevotee: 0,
        dressCode: "Traditional or neat casual",
        reportingNotice: "Report at Hilltop Queue Complex."
      },
      {
        name: "Seeghra Darshanam (Quick Entry)",
        description: "Expedited queue pass line with complimentary Laddu prasad.",
        chargePerDevotee: 150,
        dressCode: "Traditional attire",
        reportingNotice: "Report at Special Entry Booth 1."
      },
      {
        name: "VIP Break Darshan",
        description: "Priority morning darshan during divine Archana Seva hours.",
        chargePerDevotee: 500,
        dressCode: "Dhoti/Saree mandatory",
        reportingNotice: "Report at VIP Counter."
      }
    ]
  },
  {
    name: "Padmanabhaswamy Temple",
    deity: "Lord Vishnu",
    category: "Vaishnava",
    city: "Thiruvananthapuram",
    state: "Kerala",
    address: "West Nada, Fort, Thiruvananthapuram, Kerala 695023",
    description: "An extraordinary blend of Kerala and Dravidian architecture, the richest temple in the world enshrines Lord Vishnu in the eternal yogic sleep (Anantha Shayana) on the five-hooded serpent Adishesha, viewed through three sacred doors.",
    images: [
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "03:30 AM - 12:00 PM, 05:00 PM - 08:30 PM",
    guidelines: "Strict traditional Kerala dress code: Men must wear Dhoti (Mundu) bare-chested; Women must wear Saree, Set-Mundu, or Pavada. Modern clothing, shirts, and dhotis with borders over pants prohibited. Dhotis available for rent at temple counters.",
    startingPrice: 0,
    isPopular: true,
    isVerified: true,
    isDemo: true,
    trustLabel: "Official Link-out",
    bookingMode: "official_linkout",
    officialUrl: "https://spst.in",
    lastReviewedDate: "2026-10-10",
    accessibilityNotes: "East Fort vehicle drop-off, ramped entrance at North Nada for senior citizens, traditional palanquins available.",
    crowdLevelInfo: "Moderate (Queue approx 45-75 mins)",
    visitingInfo: {
      bestTimeToVisit: "November to February",
      rituals: ["Nirmalya Darshanam", "Usha Pooja", "Uchha Pooja", "Deeparadhana", "Athazha Pooja"],
      prasadTimings: "08:00 AM - 11:30 AM & 06:00 PM - 08:00 PM",
      footwearPolicy: "Footwear and bag deposit counters at East and North Nada"
    },
    sourceVerification: {
      isVerified: true,
      sourceName: "Sree Padmanabhaswamy Temple Executive Committee",
      sourceUrl: "https://spst.in",
      verificationNotes: "Strict Kerala temple attire and timing verified."
    },
    contactInfo: {
      phone: "+91 471 245 0233",
      email: "info@spst.in",
      website: "https://spst.in"
    },
    darshanTypes: [
      {
        name: "General Kerala Darshan",
        description: "Public queue across the Ottakkal Mandapam to view the Anantha Shayana form through the 3 doorways.",
        chargePerDevotee: 0,
        dressCode: "Pure unstitched Mundu (Dhoti) bare-chested for men; Saree for women",
        reportingNotice: "Report at East Nada entrance."
      },
      {
        name: "Special Seva Darshan",
        description: "Direct priority lane into the sanctum praakaram.",
        chargePerDevotee: 250,
        dressCode: "Strict traditional Kerala dress code",
        reportingNotice: "Report at North Nada Special Entry counter."
      }
    ]
  },
  {
    name: "Golden Temple",
    deity: "Other Deities",
    category: "Other Deities",
    city: "Amritsar",
    state: "Punjab",
    address: "Golden Temple Rd, Atta Mandi, Amritsar, Punjab 143006",
    description: "Sri Harmandir Sahib (The Golden Temple) is the supreme spiritual and cultural center of Sikhism. Built in the center of the sacred Amrit Sarovar, its gold-leafed sanctum symbolizes universal peace, brotherhood, and selfless service through the 24/7 Guru Ka Langar.",
    images: [
      "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "Open 24 Hours (Langar operates non-stop)",
    guidelines: "Head covering mandatory for all visitors (scarves provided free). Shoes deposited in token counters; wash feet in shallow water pool before entering the marble parikrama. Tobacco, alcohol, and photography inside inner sanctum strictly prohibited.",
    startingPrice: 0,
    isPopular: true,
    isVerified: true,
    isDemo: true,
    trustLabel: "Official",
    bookingMode: "none",
    officialUrl: "https://sgpc.net",
    lastReviewedDate: "2026-10-14",
    accessibilityNotes: "Wheelchairs with voluntary attendants available at Ghanta Ghar main entrance. Wide ramps along all four gates of the Sarovar.",
    crowdLevelInfo: "High round the clock (Smooth continuous moving queue over bridge: 45 - 90 mins)",
    visitingInfo: {
      bestTimeToVisit: "October to March",
      rituals: ["Palki Sahib ceremony (Night & Morning)", "Continuous Gurbani Kirtan", "Hukamnama"],
      prasadTimings: "24 Hours (Karah Prasad counters in Parikrama & Langar Hall)",
      footwearPolicy: "Large free shoe custody counters at all 4 entrance clock towers"
    },
    sourceVerification: {
      isVerified: true,
      sourceName: "Shiromani Gurdwara Parbandhak Committee (SGPC)",
      sourceUrl: "https://sgpc.net",
      verificationNotes: "Open and free to all humanity without any tickets or fees."
    },
    contactInfo: {
      phone: "+91 183 255 3957",
      email: "info@sgpc.net",
      website: "https://sgpc.net"
    },
    darshanTypes: [
      {
        name: "Holy Sanctum Darshan",
        description: "Reverent queue across the bridge (Guru's Bridge) to listen to Gurbani Kirtan inside the sanctum.",
        chargePerDevotee: 0,
        dressCode: "Head covering mandatory; respectful attire",
        reportingNotice: "Queue starts at the Parkarma bridge."
      }
    ]
  },
  {
    name: "Siddhivinayak Temple",
    deity: "Lord Ganesha",
    category: "Ganesh",
    city: "Mumbai",
    state: "Maharashtra",
    address: "SK Bole Marg, Prabhadevi, Mumbai, Maharashtra 400028",
    description: "One of the richest and most venerated Ganesha shrines in India, dedicated to Shree Siddhivinayak Maharaj whose trunk turns to the right (Siddhi-granting). Devotees throng the silver and gold sanctum to seek obstacles removal and divine blessings before starting new endeavors.",
    images: [
      "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "05:30 AM - 10:00 PM",
    guidelines: "Modest and respectful clothing recommended. Footwear must be deposited at free temple counters. Electronic security check at entrance gates.",
    startingPrice: 0,
    isPopular: true,
    isVerified: true,
    isDemo: true,
    trustLabel: "DarshanEase Verified",
    bookingMode: "demo_booking",
    officialUrl: "https://www.siddhivinayak.org",
    lastReviewedDate: "2026-10-12",
    accessibilityNotes: "Wheelchair assistance available at Gate 3. Senior citizen priority lane during non-peak hours.",
    crowdLevelInfo: "High on Tuesdays and Sankashti Chaturthi (queue 60 - 90 mins; fast-track 20 mins)",
    visitingInfo: {
      bestTimeToVisit: "Throughout the year (Ganesh Chaturthi is peak celebration)",
      rituals: ["Kakad Aarti", "Shree Darshan", "Maha Aarti", "Shej Aarti"],
      prasadTimings: "06:00 AM - 09:30 PM (Modak and Ladoo prasadam counters)",
      footwearPolicy: "Secure footwear counters available near Gate 1 and Gate 3"
    },
    sourceVerification: {
      isVerified: true,
      sourceName: "Shree Siddhivinayak Ganapati Temple Trust",
      sourceUrl: "https://www.siddhivinayak.org",
      verificationNotes: "Information verified with latest shrine trust administration protocol."
    },
    contactInfo: {
      phone: "+91 22 2422 2072",
      email: "info@siddhivinayak.org",
      website: "https://www.siddhivinayak.org"
    },
    darshanTypes: [
      {
        name: "General Free Darshan",
        description: "Standard public queue through the main Mandapam hall open to all devotees.",
        chargePerDevotee: 0,
        dressCode: "Modest Indian or formal clothing",
        reportingNotice: "Report at Gate 1 General Queue Line."
      },
      {
        name: "Quick Darshan Pass",
        description: "Fast-track entry line with dedicated aisle directly to the sanctum.",
        chargePerDevotee: 150,
        dressCode: "Traditional attire recommended",
        reportingNotice: "Report at Gate 3 Special Entry with digital pass."
      },
      {
        name: "Kakad Aarti & Special Darshan",
        description: "Early dawn consecrated Kakad Aarti darshan inside the inner sanctum with consecrated modak prasad.",
        chargePerDevotee: 350,
        dressCode: "Traditional Indian attire mandatory",
        reportingNotice: "Report at 05:00 AM sharp at Gate 2 VIP Counter."
      }
    ]
  },
  {
    name: "Banke Bihari Temple",
    deity: "Lord Krishna",
    category: "Vaishnava",
    city: "Vrindavan",
    state: "Uttar Pradesh",
    address: "Godowalia, Banke Bihari Colony, Vrindavan, Mathura, Uttar Pradesh 281121",
    description: "The iconic sanctum of Lord Krishna in his tribhanga (three-bent) playful posture established by the mystic music-saint Swami Haridas. Known for the unique tradition of drawing the velvet curtain intermittently to prevent devotees from fainting before the captivating charm of Bihari Ji.",
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "07:45 AM - 12:00 PM, 05:30 PM - 09:30 PM",
    guidelines: "Modest traditional attire. Please keep eyeglasses, phones, and prasad bags secure from monkeys in the parikrama lanes.",
    startingPrice: 0,
    isPopular: true,
    isVerified: true,
    isDemo: true,
    trustLabel: "DarshanEase Verified",
    bookingMode: "demo_booking",
    officialUrl: "https://www.bihariji.org",
    lastReviewedDate: "2026-10-12",
    accessibilityNotes: "Assisted entry from Gate 1 for elderly pilgrims. Battery e-rickshaws available from Vrindavan parking lots.",
    crowdLevelInfo: "Heavy during Shringar and Rajbhog aartis (approx. 30 - 45 min darshan wait)",
    visitingInfo: {
      bestTimeToVisit: "October to March (Janmashtami and Holi are glorious festive periods)",
      rituals: ["Shringar Darshan", "Rajbhog Aarti", "Utthapan Darshan", "Shayan Aarti"],
      prasadTimings: "08:30 AM - 12:00 PM, 06:00 PM - 09:00 PM (Makhan-Mishri and Peda)",
      footwearPolicy: "Footwear stands available at main corridor entrance lanes"
    },
    sourceVerification: {
      isVerified: true,
      sourceName: "Shri Banke Bihari Ji Mandir Administration",
      sourceUrl: "https://www.bihariji.org",
      verificationNotes: "Protocol reviewed with Vrindavan heritage corridor updates."
    },
    contactInfo: {
      phone: "+91 565 244 2465",
      email: "contact@bihariji.org",
      website: "https://www.bihariji.org"
    },
    darshanTypes: [
      {
        name: "General Darshan (Free)",
        description: "Open public darshan during morning and evening Rajbhog open hours.",
        chargePerDevotee: 0,
        dressCode: "Respectful Indian attire",
        reportingNotice: "Queue begins at Gate No. 2 Parikrama entrance."
      },
      {
        name: "Special Seva Darshan Pass",
        description: "Dedicated priority corridor pass during peak darshan hours with assisted sevak entry.",
        chargePerDevotee: 100,
        dressCode: "Traditional attire",
        reportingNotice: "Report at Gate No. 1 Seva Counter with digital confirmation."
      }
    ]
  },
  {
    name: "Brihadeeswarar Temple",
    deity: "Lord Shiva",
    category: "Other Deities",
    city: "Thanjavur",
    state: "Tamil Nadu",
    address: "Membalam Rd, Balaganapathy Nagar, Thanjavur, Tamil Nadu 613007",
    description: "Known locally as Peruvudaiyar Kovil and the Big Temple, this 1,000-year-old architectural marvel built by Great Chola Emperor Raja Raja Chola I is a UNESCO World Heritage Site. Features a colossal 216-foot granite vimana tower, a massive monolithic Nandi, and magnificent Dravidian frescoes.",
    images: [
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "06:00 AM - 12:30 PM, 04:00 PM - 08:30 PM",
    guidelines: "Modest and respectful clothing mandatory. Footwear prohibited inside the stone courtyard. Maintained jointly with the Archaeological Survey of India (ASI).",
    startingPrice: 0,
    isPopular: true,
    isVerified: true,
    isDemo: true,
    trustLabel: "DarshanEase Verified",
    bookingMode: "demo_booking",
    officialUrl: "https://asi.nic.in",
    lastReviewedDate: "2026-10-12",
    accessibilityNotes: "Ramps available at the outer fortress entrance. Wide stone walkways across the open courtyard.",
    crowdLevelInfo: "Moderate footfall on weekdays; busy on Pradosham and Shivaratri (approx. 20 - 45 min wait)",
    visitingInfo: {
      bestTimeToVisit: "November to February",
      rituals: ["Ushakkala Puja", "Uchikala Puja", "Sayaratchai", "Arthajama Puja"],
      prasadTimings: "08:00 AM - 12:00 PM, 05:00 PM - 08:00 PM (Puliyodarai and Sweet Pongal)",
      footwearPolicy: "Large free footwear depository at the Raja Raja Cholan entrance gate"
    },
    sourceVerification: {
      isVerified: true,
      sourceName: "Archaeological Survey of India & HR&CE Tamil Nadu",
      sourceUrl: "https://asi.nic.in",
      verificationNotes: "Heritage guidelines synchronized with ASI national monument guidelines."
    },
    contactInfo: {
      phone: "+91 4362 274 476",
      email: "hrce.thanjavur@tn.gov.in",
      website: "https://asi.nic.in"
    },
    darshanTypes: [
      {
        name: "General Darshan (Free)",
        description: "Free walk-in entry to the open courtyard, Nandi Mandapam, and main Peruvudaiyar sanctum.",
        chargePerDevotee: 0,
        dressCode: "Traditional South Indian attire",
        reportingNotice: "Enter through the Keralantakan Gopuram."
      },
      {
        name: "Special Archeological & Sanctum Pass",
        description: "Expedited sanctum queue pass with guide booklet on Chola bronze architecture and fresco history.",
        chargePerDevotee: 100,
        dressCode: "Traditional attire mandatory",
        reportingNotice: "Report at East Entrance Information Desk."
      }
    ]
  },
  {
    name: "Kalighat Kali Temple",
    deity: "Goddess Kali",
    category: "Shakti Peeth",
    city: "Kolkata",
    state: "West Bengal",
    address: "Anami Sangha, Kalighat, Kolkata, West Bengal 700026",
    description: "One of the most powerful of the 51 Shakti Peethas, where the toes of the right foot of Goddess Sati are believed to have fallen. The unique black stone idol of Ma Kali boasts three piercing eyes, four gold hands, and a long protruding tongue made of pure gold.",
    images: [
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "05:00 AM - 02:00 PM, 05:00 PM - 10:30 PM",
    guidelines: "Modest attire required. Traditional red hibiscus and sweet offerings available at verified counters inside the outer courtyard.",
    startingPrice: 0,
    isPopular: true,
    isVerified: true,
    isDemo: true,
    trustLabel: "DarshanEase Verified",
    bookingMode: "demo_booking",
    officialUrl: "https://kalighattemple.com",
    lastReviewedDate: "2026-10-12",
    accessibilityNotes: "Direct entry lane for senior citizens and mothers with infants via Natmandir side entrance.",
    crowdLevelInfo: "Heavy on Tuesdays, Saturdays, and Kali Puja / Navratri (approx. 40 - 75 min wait)",
    visitingInfo: {
      bestTimeToVisit: "October to March",
      rituals: ["Mongol Aarti", "Nitya Puja", "Bhog Aarti", "Sandhya Aarti"],
      prasadTimings: "01:00 PM - 02:30 PM (Maha Bhog Prasadam)",
      footwearPolicy: "Footwear counters available at the north temple gate"
    },
    sourceVerification: {
      isVerified: true,
      sourceName: "Kalighat Temple Committee & Kolkata Municipal Corporation",
      sourceUrl: "https://kalighattemple.com",
      verificationNotes: "Guidelines validated against ongoing temple courtyard enhancement norms."
    },
    contactInfo: {
      phone: "+91 33 2455 6777",
      email: "info@kalighattemple.com",
      website: "https://kalighattemple.com"
    },
    darshanTypes: [
      {
        name: "General Darshan (Free)",
        description: "Open public darshan through the Natmandir courtyard to the sanctum sanctorum.",
        chargePerDevotee: 0,
        dressCode: "Modest Indian clothing",
        reportingNotice: "Queue begins at the Main East Gate."
      },
      {
        name: "Nitya Puja & VIP Darshan Pass",
        description: "Priority entry pass for sanctified darshan with sacred Charan-amrit and consecrated Hibiscus garland.",
        chargePerDevotee: 200,
        dressCode: "Traditional attire",
        reportingNotice: "Report at VIP Counter near the Natmandir."
      }
    ]
  },
  {
    name: "Ramanathaswamy Temple",
    deity: "Lord Shiva",
    category: "Jyotirlinga",
    city: "Rameswaram",
    state: "Tamil Nadu",
    address: "Rameswaram, Ramanathapuram District, Tamil Nadu 623526",
    description: "One of the 12 sacred Jyotirlingas and a pinnacle of the sacred Char Dham pilgrimage, sanctified by Lord Rama. World-famous for having the longest stone temple corridor in the world with over 1,200 hand-carved pillars and 22 consecrated Theerthams (holy bathing wells) inside the temple grounds.",
    images: [
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "05:00 AM - 01:00 PM, 03:00 PM - 09:00 PM",
    guidelines: "Traditional South Indian dress code. Change into dry clothes before entering the sanctum if taking bath at the 22 Theerthams.",
    startingPrice: 0,
    isPopular: true,
    isVerified: true,
    isDemo: true,
    trustLabel: "DarshanEase Verified",
    bookingMode: "demo_booking",
    officialUrl: "https://rameswaramtemple.tnhrce.in",
    lastReviewedDate: "2026-10-12",
    accessibilityNotes: "Wheelchair facilities and battery vehicles available from sea-front Agni Theertham to East Gopuram.",
    crowdLevelInfo: "Moderate to high on Amavasya and solar eclipses (queue approx. 45 - 60 mins)",
    visitingInfo: {
      bestTimeToVisit: "October to April",
      rituals: ["Spatika Linga Darshan (05:00 AM)", "Kalasandhi Puja", "Sayaratchai Puja", "Arthajama Puja"],
      prasadTimings: "08:30 AM - 12:30 PM, 05:30 PM - 08:30 PM",
      footwearPolicy: "Footwear counters available at East and West Gopuram gates"
    },
    sourceVerification: {
      isVerified: true,
      sourceName: "Arulmigu Ramanathaswamy Temple Administration (HR&CE)",
      sourceUrl: "https://rameswaramtemple.tnhrce.in",
      verificationNotes: "Protocol reviewed with official Tamil Nadu HR&CE directives."
    },
    contactInfo: {
      phone: "+91 4573 221 223",
      email: "rameswaramtemple@tnhrce.in",
      website: "https://rameswaramtemple.tnhrce.in"
    },
    darshanTypes: [
      {
        name: "General Darshan (Free)",
        description: "Free public walk-in queue for main Ramanathaswamy and Parvathavardhini Ambal sanctum darshan.",
        chargePerDevotee: 0,
        dressCode: "Traditional South Indian attire",
        reportingNotice: "Enter through the Majestic East Gopuram."
      },
      {
        name: "Special Entry Darshan Pass",
        description: "Expedited queue line through the Third Corridor with minimal wait time.",
        chargePerDevotee: 100,
        dressCode: "Traditional attire mandatory",
        reportingNotice: "Report at East Entrance Special Queue Counter."
      },
      {
        name: "Spadika Linga Dawn Darshan",
        description: "Early morning 05:00 AM sacred darshan of the consecrated Spatika (Crystal) Shivalinga installed by Adi Shankara.",
        chargePerDevotee: 250,
        dressCode: "Dhoti/Angavastram for men, Saree for women",
        reportingNotice: "Report at 04:45 AM at Inner Sanctum Gate."
      }
    ]
  },
  {
    name: "Trimbakeshwar Shiva Temple",
    deity: "Lord Shiva",
    category: "Jyotirlinga",
    city: "Nashik",
    state: "Maharashtra",
    address: "Shrimant Peshwe Path, Trimbak, Nashik, Maharashtra 422212",
    description: "An ancient Jyotirlinga shrine situated at the foothills of Brahmagiri Mountain, origin of the sacred Godavari river. Unique among all Jyotirlingas for having a three-faced lingam embodying the Trinity (Brahma, Vishnu, and Maheshwar), crowned with an exquisite gem-studded golden crown on special occasions.",
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "05:30 AM - 09:00 PM",
    guidelines: "Strict traditional attire: Dhoti/Kurta for men, Saree/Salwar for women. Leather items, belts, and mobile phones prohibited in sanctum.",
    startingPrice: 0,
    isPopular: true,
    isVerified: true,
    isDemo: true,
    trustLabel: "DarshanEase Verified",
    bookingMode: "demo_booking",
    officialUrl: "https://www.trimbakeshwartrust.com",
    lastReviewedDate: "2026-10-12",
    accessibilityNotes: "Dedicated assisted line for senior citizens and differently abled pilgrims through the north pavilion.",
    crowdLevelInfo: "Heavy on Mondays and Maha Shivaratri (approx. 45 - 90 min general wait)",
    visitingInfo: {
      bestTimeToVisit: "July to February (monsoon greenery at Brahmagiri is spectacular)",
      rituals: ["Niranjan Puja", "Madhyana Puja", "Sayankal Puja", "Golden Mukut Darshan (Mondays 4-5 PM)"],
      prasadTimings: "08:00 AM - 08:30 PM",
      footwearPolicy: "Footwear counters available at Kushavarta Theerth approach road"
    },
    sourceVerification: {
      isVerified: true,
      sourceName: "Shri Trimbakeshwar Sansthan Trust",
      sourceUrl: "https://www.trimbakeshwartrust.com",
      verificationNotes: "Information synchronized with Sansthan darshan protocol."
    },
    contactInfo: {
      phone: "+91 2594 233 215",
      email: "trust@trimbakeshwartrust.com",
      website: "https://www.trimbakeshwartrust.com"
    },
    darshanTypes: [
      {
        name: "General Darshan (Free)",
        description: "Open public queue through the stone Mandap to view the divine Jyotirlinga.",
        chargePerDevotee: 0,
        dressCode: "Traditional Indian attire",
        reportingNotice: "Queue starts at the Main Temple Pavilion."
      },
      {
        name: "VIP Sheegra Darshan Pass",
        description: "Expedited sanctum pass bypassing the outer queue with closer view of the holy Jyotirlinga.",
        chargePerDevotee: 200,
        dressCode: "Dhoti/Kurta for men, Saree for women",
        reportingNotice: "Report at North VIP Entry Gate."
      }
    ]
  },
  {
    name: "Lingaraj Temple",
    deity: "Lord Harihara",
    category: "Other Deities",
    city: "Bhubaneswar",
    state: "Odisha",
    address: "Lingaraj Temple Rd, Old Town, Bhubaneswar, Odisha 751002",
    description: "The grandest and oldest temple in Bhubaneswar, dating back to the 11th century Somavamsi dynasty. Dedicated to Lord Harihara, a composite avatar combining Shiva and Vishnu, the temple rises over 180 feet with sublime Kalinga architectural stone carvings surrounded by 108 subsidiary shrines.",
    images: [
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "06:00 AM - 12:30 PM, 03:30 PM - 09:00 PM",
    guidelines: "Traditional modest attire. Non-Hindus can view the magnificent temple complex from the dedicated Curzon Viewing Platform outside the northern wall.",
    startingPrice: 0,
    isPopular: true,
    isVerified: true,
    isDemo: true,
    trustLabel: "DarshanEase Verified",
    bookingMode: "demo_booking",
    officialUrl: "https://bhubaneswar.me",
    lastReviewedDate: "2026-10-12",
    accessibilityNotes: "Level paved stone walkways across the courtyard; viewing platform accessible from road.",
    crowdLevelInfo: "Moderate footfall (approx. 20 - 40 min queue; peak rush on Shivaratri)",
    visitingInfo: {
      bestTimeToVisit: "October to March",
      rituals: ["Alati Puja", "Ballabha Bhog", "Sakala Dhupa", "Sandhya Dhupa"],
      prasadTimings: "12:00 PM - 02:30 PM (Mahaprasad bhog available in Anandabazar)",
      footwearPolicy: "Footwear stand available at Simhadwara entrance"
    },
    sourceVerification: {
      isVerified: true,
      sourceName: "Lingaraj Temple Trust Board & Odisha Endowment",
      sourceUrl: "https://bhubaneswar.me",
      verificationNotes: "Protocol aligned with Bhubaneswar Heritage Trust regulations."
    },
    contactInfo: {
      phone: "+91 674 234 0111",
      email: "info@lingarajtemple.org",
      website: "https://bhubaneswar.me"
    },
    darshanTypes: [
      {
        name: "General Entry (Free)",
        description: "Free public sanctum entry through the ancient Lion Gate (Simhadwara).",
        chargePerDevotee: 0,
        dressCode: "Traditional Indian clothing",
        reportingNotice: "Queue at Simhadwara outer courtyard."
      },
      {
        name: "Special Archana Pass",
        description: "Priority corridor darshan accompanied by traditional temple priest with sacred Bilva archana.",
        chargePerDevotee: 150,
        dressCode: "Traditional attire",
        reportingNotice: "Report at East Administration counter."
      }
    ]
  },
  {
    name: "Dakshineswar Kali Temple",
    deity: "Goddess Bhavatarini / Kali",
    category: "Shakti Peeth",
    city: "Kolkata",
    state: "West Bengal",
    address: "Dakshineswar, Kolkata, West Bengal 700076",
    description: "Built in 1855 along the banks of the sacred Hooghly river by Rani Rashmoni, this magnificent 9-spire (Navaratna) temple is universally celebrated for the spiritual visions of Sri Ramakrishna Paramahamsa. Features 12 identical twin Shiva shrines and serene riverfront bathing ghats.",
    images: [
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "06:00 AM - 12:30 PM, 03:00 PM - 08:30 PM",
    guidelines: "Modest and respectful clothing. Footwear to be deposited at the free counter before crossing the main gateway skywalk.",
    startingPrice: 0,
    isPopular: true,
    isVerified: true,
    isDemo: true,
    trustLabel: "DarshanEase Verified",
    bookingMode: "demo_booking",
    officialUrl: "https://dakshineswarkalitemple.org",
    lastReviewedDate: "2026-10-12",
    accessibilityNotes: "Modern Dakshineswar skywalk equipped with escalators and lifts directly connects the metro station to the temple gate.",
    crowdLevelInfo: "High on Tuesdays, Saturdays, and Kali Puja (approx. 30 - 60 min queue)",
    visitingInfo: {
      bestTimeToVisit: "October to March",
      rituals: ["Mangal Aarti", "Bhog Aarti", "Sandhya Aarti", "Sri Ramakrishna Kutir Darshan"],
      prasadTimings: "12:00 PM - 02:00 PM (Bhog token counters near riverfront)",
      footwearPolicy: "Large computerized shoe stands outside skywalk exit"
    },
    sourceVerification: {
      isVerified: true,
      sourceName: "Dakshineswar Kali Temple Board of Trustees",
      sourceUrl: "https://dakshineswarkalitemple.org",
      verificationNotes: "Protocol reviewed with latest skywalk pilgrim facilitation guidelines."
    },
    contactInfo: {
      phone: "+91 33 2564 5222",
      email: "trustee@dakshineswarkalitemple.org",
      website: "https://dakshineswarkalitemple.org"
    },
    darshanTypes: [
      {
        name: "General Darshan (Free)",
        description: "Open walk-in queue across the large courtyard to view Mother Bhavatarini.",
        chargePerDevotee: 0,
        dressCode: "Respectful attire",
        reportingNotice: "Join queue from the Natmandir courtyard."
      },
      {
        name: "Special Sandhya Aarti Pass",
        description: "Designated covered seating area inside the Natmandir during the evening divine riverfront Aarti.",
        chargePerDevotee: 150,
        dressCode: "Traditional attire",
        reportingNotice: "Report at 05:45 PM at the Trustee Office counter."
      }
    ]
  },
  {
    name: "Chidambaram Nataraja Temple",
    deity: "Lord Nataraja",
    category: "Other Deities",
    city: "Chidambaram",
    state: "Tamil Nadu",
    address: "Chidambaram, Cuddalore District, Tamil Nadu 608001",
    description: "The supreme seat of Lord Shiva as Nataraja performing the cosmic dance (Ananda Tandava). One of the Pancha Bhoota Sthalas representing the subtle element of space (Akasha) and home to the sacred mystical Chidambara Rahasya behind the golden bilva garland.",
    images: [
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80"
    ],
    openingHours: "06:00 AM - 12:00 PM, 05:00 PM - 10:00 PM",
    guidelines: "Men must remove upper garments before sanctum entry as per Tamil tradition. Dhoti/Saree mandatory for inner sanctum entry.",
    startingPrice: 0,
    isPopular: true,
    isVerified: true,
    isDemo: true,
    trustLabel: "DarshanEase Verified",
    bookingMode: "demo_booking",
    officialUrl: "https://www.chidambaramnatarajar.org",
    lastReviewedDate: "2026-10-12",
    accessibilityNotes: "Wheelchairs available at the East Car Street entrance. Senior citizens seated comfortably during abhishekam.",
    crowdLevelInfo: "Moderate footfall (queue 20 - 45 mins; busy during Natyanjali Dance Festival and Arudra Darshanam)",
    visitingInfo: {
      bestTimeToVisit: "November to March (Arudra Darshanam in Dec/Jan is peak spiritual event)",
      rituals: ["Kala Sandhi Puja", "Irandam Kalam", "Uchikalam", "Sayaratchai", "Arthajamam"],
      prasadTimings: "08:30 AM - 11:30 AM, 06:00 PM - 09:30 PM",
      footwearPolicy: "Footwear counters available at all four massive Raja Gopurams"
    },
    sourceVerification: {
      isVerified: true,
      sourceName: "Podu Dikshitars Council & Temple Administration",
      sourceUrl: "https://www.chidambaramnatarajar.org",
      verificationNotes: "Protocol reviewed with traditional Vedic Dikshitar administration."
    },
    contactInfo: {
      phone: "+91 4144 222 345",
      email: "dikshitars@chidambaramnatarajar.org",
      website: "https://www.chidambaramnatarajar.org"
    },
    darshanTypes: [
      {
        name: "General Darshan (Free)",
        description: "Open public darshan in the Chit Sabha viewing Lord Nataraja and Sivakami Ambal.",
        chargePerDevotee: 0,
        dressCode: "Traditional South Indian attire (shirts off for men)",
        reportingNotice: "Join queue from the Thousand Pillar Hall courtyard."
      },
      {
        name: "Kanaka Sabha Special Darshan",
        description: "Closer view from the golden-roofed Kanaka Sabha during the Spatika Linga morning and evening Abhishekam.",
        chargePerDevotee: 200,
        dressCode: "Traditional attire mandatory",
        reportingNotice: "Report at 07:45 AM or 05:45 PM at Kanaka Sabha steps."
      }
    ]
  }
];

const seedDestinations = [
  {
    name: "Kashi (Varanasi)",
    state: "Uttar Pradesh",
    tagline: "The Eternal City of Light and Liberation",
    description: "One of the world's oldest continuously inhabited cities, Varanasi rests on the sacred banks of the Ganges. Renowned for Shri Kashi Vishwanath Jyotirlinga, grand evening Ganga Aartis, sacred ghats, and ancient Vedic wisdom.",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
    nearestAirport: "Lal Bahadur Shastri International Airport (VNS)",
    nearestRailwayStation: "Varanasi Junction (BSB) / Banaras (BSBS)",
    bestSeason: "October to March",
    isPopular: true,
    culturalHighlights: ["Ganga Aarti at Dashashwamedh Ghat", "Kashi Vishwanath Corridor", "Sarnath Buddhist Stupa", "Subah-e-Banaras at Assi Ghat"],
    mapCoordinates: { lat: 25.3176, lng: 82.9739 }
  },
  {
    name: "Ayodhya",
    state: "Uttar Pradesh",
    tagline: "Sacred Birthplace of Lord Shri Rama",
    description: "The revered capital of the ancient Suryavansha dynasty along the holy Sarayu River, Ayodhya is home to the majestic Shri Ram Janmabhoomi Mandir, Hanuman Garhi, Kanak Bhawan, and serene Sarayu Ghats.",
    image: "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80",
    nearestAirport: "Maharishi Valmiki International Airport, Ayodhya (AYJ)",
    nearestRailwayStation: "Ayodhya Dham Junction (AY)",
    bestSeason: "October to March",
    isPopular: true,
    culturalHighlights: ["Shri Ram Janmabhoomi Mandir", "Hanuman Garhi Fort Temple", "Sarayu Aarti at Ram Ki Paidi", "Kanak Bhawan"],
    mapCoordinates: { lat: 26.7922, lng: 82.1998 }
  },
  {
    name: "Ujjain",
    state: "Madhya Pradesh",
    tagline: "City of Mahakal and Prime Meridian of Hindu Time",
    description: "Situated on the banks of the sacred Shipra River, Ujjain is one of the seven holy Moksha puris and home to the south-facing Mahakaleshwar Jyotirlinga, celebrated for its divine Bhasma Aarti and newly built Mahakal Lok corridor.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    nearestAirport: "Devi Ahilyabai Holkar Airport, Indore (IDR - 55 km)",
    nearestRailwayStation: "Ujjain Junction (UJN)",
    bestSeason: "October to March",
    isPopular: true,
    culturalHighlights: ["Mahakaleshwar Bhasma Aarti", "Mahakal Lok Corridor", "Kal Bhairav Temple", "Ram Ghat Shipra Aarti"],
    mapCoordinates: { lat: 23.1765, lng: 75.7885 }
  },
  {
    name: "Tirupati",
    state: "Andhra Pradesh",
    tagline: "Abode of Lord Venkateswara at Seven Hills",
    description: "Nestled in the Seshachalam Hills, Tirumala Tirupati is among the most visited pilgrimage centers on Earth, drawing devotees seeking the grace of Lord Balaji amidst rich Dravidian traditions and chanting of Govinda.",
    image: "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80",
    nearestAirport: "Tirupati Airport, Renigunta (TIR)",
    nearestRailwayStation: "Tirupati Main (TPTY) / Renigunta Junction (RU)",
    bestSeason: "September to February",
    isPopular: true,
    culturalHighlights: ["Tirumala Venkatadri Hill Shrine", "Sri Padmavathi Ammavari Temple", "Kapila Theertham", "Sri Kalahasti Temple nearby"],
    mapCoordinates: { lat: 13.6288, lng: 79.4192 }
  },
  {
    name: "Kedarnath",
    state: "Uttarakhand",
    tagline: "Himalayan Abode of Lord Shiva in Rudraprayag",
    description: "Perched near the Chorabari glacier in the Garhwal Himalayas, Kedarnath is an austere mountain sanctuary of absolute peace, stone craftsmanship, and the highest of all 12 Jyotirlingas.",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    nearestAirport: "Jolly Grant Airport, Dehradun (DED - 238 km)",
    nearestRailwayStation: "Rishikesh / Yog Nagari Rishikesh (YNRK)",
    bestSeason: "May to June & September to October",
    isPopular: true,
    culturalHighlights: ["Kedarnath Temple Darshan", "Bhairavnath Temple Trek", "Mandakini River Valley", "Vasuki Tal Trek"],
    mapCoordinates: { lat: 30.7352, lng: 79.0669 }
  },
  {
    name: "Vaishno Devi (Katra)",
    state: "Jammu and Kashmir",
    tagline: "Holy Cave Shrine in the Trikuta Mountains",
    description: "Katra serves as the bustling base camp for the spiritually uplifting 12-kilometer pilgrimage to the Holy Cave Shrine of Mata Vaishno Devi, attended by millions of pilgrims chanting Jai Mata Di.",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    nearestAirport: "Jammu Airport (IXJ - 50 km)",
    nearestRailwayStation: "Shri Mata Vaishno Devi Katra (SVDK)",
    bestSeason: "March to November",
    isPopular: true,
    culturalHighlights: ["Bhavan Cave Darshan", "Bhairon Ghati Ropeway", "Ardhkuwari Cave Temple", "Banganga Holy Bath"],
    mapCoordinates: { lat: 32.9915, lng: 74.9317 }
  },
  {
    name: "Somnath",
    state: "Gujarat",
    tagline: "First of the Twelve Sacred Jyotirlingas by the Sea",
    description: "Located on the southwestern coast of Saurashtra, Somnath is an inspiring symbol of enduring faith, eternal architectural beauty, and pristine Arabian Sea coastal serenity at Triveni Sangam.",
    image: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80",
    nearestAirport: "Keshod Airport (IXK - 55 km) / Diu Airport (DIU - 80 km)",
    nearestRailwayStation: "Veraval Junction (VRL - 7 km)",
    bestSeason: "October to March",
    isPopular: true,
    culturalHighlights: ["Somnath Temple Light & Sound Show", "Triveni Sangam Ghat", "Bhalka Tirth", "Gita Mandir"],
    mapCoordinates: { lat: 20.8880, lng: 70.4012 }
  },
  {
    name: "Puri",
    state: "Odisha",
    tagline: "Holy Coastal Dham of Lord Jagannath",
    description: "Puri is celebrated as one of India's cardinal Char Dhams, where the grand Jagannath Temple, the serene Golden Beach, and the ancient culture of the 56 Bhog Mahaprasad blend into a profound spiritual tapestry.",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    nearestAirport: "Biju Patnaik International Airport, Bhubaneswar (BBI - 60 km)",
    nearestRailwayStation: "Puri Railway Station (PURI)",
    bestSeason: "October to March",
    isPopular: true,
    culturalHighlights: ["Shree Jagannath Temple", "Ananda Bazar Mahaprasad", "Puri Golden Beach", "Konark Sun Temple nearby"],
    mapCoordinates: { lat: 19.8135, lng: 85.8312 }
  },
  {
    name: "Shirdi",
    state: "Maharashtra",
    tagline: "Sanctified Land of Sai Baba's Shraddha and Saburi",
    description: "Shirdi is a town of peaceful contemplation and selfless devotion in Maharashtra, where pilgrims from all faiths gather at Sai Baba's Samadhi Mandir, Dwarkamai mosque, and Gurusthan.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    nearestAirport: "Shirdi International Airport (SAG - 14 km)",
    nearestRailwayStation: "Sainagar Shirdi (SNSI) / Kopargaon (KPG)",
    bestSeason: "July to March",
    isPopular: true,
    culturalHighlights: ["Samadhi Mandir", "Dwarkamai & Chavadi", "Shri Sai Prasadalaya", "Shani Shingnapur nearby"],
    mapCoordinates: { lat: 19.7667, lng: 74.4762 }
  },
  {
    name: "Madurai",
    state: "Tamil Nadu",
    tagline: "The Ancient Lotus City of Meenakshi Sundareswarar",
    description: "One of the oldest continuously inhabited cities in South Asia, Madurai is famed for the soaring polychrome gopurams of Meenakshi Amman Temple, fragrant jasmine flowers, and centuries of Tamil heritage.",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    nearestAirport: "Madurai International Airport (IXM)",
    nearestRailwayStation: "Madurai Junction (MDU)",
    bestSeason: "October to March",
    isPopular: true,
    culturalHighlights: ["Meenakshi Amman Temple", "Thirumalai Nayakkar Mahal", "Alagar Kovil Temple", "Koodal Azhagar Temple"],
    mapCoordinates: { lat: 9.9252, lng: 78.1198 }
  }
];

const seedPackages = [
  {
    title: "Ayodhya Darshan Special",
    slug: "ayodhya-darshan-special",
    destination: "Ayodhya",
    destinationsList: ["Ayodhya"],
    heroImage: "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80",
    departureCity: "Lucknow / Ayodhya",
    durationDays: 2,
    durationNights: 1,
    pricePerPerson: 4999,
    isDemoPrice: true,
    availabilityLabel: "Available for Booking Enquiry (Demo Pricing)",
    category: "Divya Kshetra",
    travelPace: "Relaxed",
    providerName: "DarshanEase Certified Pilgrimage Network",
    providerVerified: true,
    isFeatured: true,
    itineraryHighlights: [
      "Guided Darshan at Shri Ram Janmabhoomi Mandir",
      "Hanuman Garhi morning darshan & prayer",
      "Peaceful Evening Sarayu River Aarti cruise",
      "Kanak Bhawan & Dashrath Mahal spiritual walk"
    ],
    inclusions: [
      "1 Night stay at premium 3-star spiritual hotel in Ayodhya",
      "Daily Satvik breakfast and vegetarian dinner",
      "AC sedan/SUV for airport/rail transfers and local visits",
      "Dedicated DarshanEase local coordinator assistance",
      "All driver allowances, tolls, and parking charges"
    ],
    exclusions: [
      "Personal puja dakshina and offerings",
      "Flight or train fare to Lucknow/Ayodhya",
      "Personal expenses, telephone, laundry"
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: "Arrival in Ayodhya & Sarayu Aarti",
        description: "Arrive at Ayodhya Airport or Station. Warm reception by our pilgrimage coordinator. Check into hotel and relax. In the evening, witness the breathtaking Sarayu River Aarti at Ram Ki Paidi followed by visit to Kanak Bhawan.",
        meals: "Dinner Included",
        stay: "Hotel Ramayana / Similar Heritage Stay"
      },
      {
        day: 2,
        title: "Shri Ram Janmabhoomi & Hanuman Garhi",
        description: "Early morning darshan at Hanuman Garhi temple. Proceed to the grand Shri Ram Janmabhoomi Mandir for reverent darshan of Ram Lalla. Visit Dashrath Mahal and Sita Ki Rasoi. Post-lunch transfer to airport/station for departure.",
        meals: "Breakfast Included",
        stay: "Trip Concludes"
      }
    ]
  },
  {
    title: "Ayodhya, Kashi and Naimisharanya Pilgrimage Circuit",
    slug: "ayodhya-kashi-naimisharanya-circuit",
    destination: "Varanasi",
    destinationsList: ["Varanasi", "Ayodhya", "Naimisharanya", "Prayagraj"],
    heroImage: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
    departureCity: "Varanasi / Lucknow",
    durationDays: 5,
    durationNights: 4,
    pricePerPerson: 16500,
    isDemoPrice: true,
    availabilityLabel: "Open for Customized Group Enquiries",
    category: "Divya Kshetra",
    travelPace: "Moderate",
    providerName: "Kashi-Awadh Pilgrimage Services",
    providerVerified: true,
    isFeatured: true,
    itineraryHighlights: [
      "Kashi Vishwanath Jyotirlinga & Corridor Darshan",
      "Grand Dashashwamedh Ghat Evening Ganga Aarti by private boat",
      "Triveni Sangam holy dip in Prayagraj",
      "Complete Ayodhya Ram Lalla & Hanuman Garhi pilgrimage",
      "Sacred Chakra Tirth bath at holy Naimisharanya"
    ],
    inclusions: [
      "4 Nights AC accommodation in Varanasi, Ayodhya, and Lucknow",
      "Daily wholesome vegetarian breakfast & dinners",
      "Private AC Innova / Tempo Traveller for entire circuit",
      "Private boat cruise for Varanasi Ganga Aarti",
      "Darshan assistance & priest coordination"
    ],
    exclusions: [
      "Interstate train/air tickets",
      "Special sanctum seva passes (subject to temple board fee)",
      "Personal rituals, pind daan dakshina"
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: "Varanasi Arrival & Ganga Aarti",
        description: "Pick-up from Varanasi Airport/Station. Check-in to hotel. In the evening, private boat cruise on the Ganga watching the divine Ganga Aarti at Dashashwamedh Ghat.",
        meals: "Dinner",
        stay: "Varanasi Heritage Hotel"
      },
      {
        day: 2,
        title: "Kashi Vishwanath & Sarnath",
        description: "Early morning Kashi Vishwanath Dham darshan, Annapurna Mandir, and Vishalakshi Shakti Peeth. Afternoon excursion to Sarnath Dhamek Stupa.",
        meals: "Breakfast & Dinner",
        stay: "Varanasi Heritage Hotel"
      },
      {
        day: 3,
        title: "Prayagraj Triveni Sangam to Ayodhya",
        description: "Drive to Prayagraj. Holy bath at Triveni Sangam and darshan of Bade Hanuman Ji and Anand Bhawan. Proceed to holy Ayodhya. Overnight stay in Ayodhya.",
        meals: "Breakfast & Dinner",
        stay: "Ayodhya Hotel"
      },
      {
        day: 4,
        title: "Ayodhya Darshan to Lucknow",
        description: "Morning darshan at Ram Janmabhoomi and Hanuman Garhi. Evening transfer to Lucknow.",
        meals: "Breakfast & Dinner",
        stay: "Lucknow Hotel"
      },
      {
        day: 5,
        title: "Naimisharanya Pilgrimage & Departure",
        description: "Day excursion to sacred Naimisharanya (Chakra Tirth, Lalita Devi Temple, Vyas Gaddi). Return to Lucknow for evening departure.",
        meals: "Breakfast",
        stay: "Tour Concludes"
      }
    ]
  },
  {
    title: "Badrinath Yatra by Road & Helicopter Assist",
    slug: "badrinath-yatra-special",
    destination: "Badrinath",
    destinationsList: ["Badrinath", "Rishikesh", "Joshimath", "Mana Village"],
    heroImage: "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80",
    departureCity: "Dehradun / Haridwar",
    durationDays: 4,
    durationNights: 3,
    pricePerPerson: 18999,
    isDemoPrice: true,
    availabilityLabel: "Seasonal Departure Booking (May-Nov)",
    category: "Himalayan Yatra",
    travelPace: "Moderate",
    providerName: "Garhwal Himalayan Yatra Co.",
    providerVerified: true,
    isFeatured: true,
    itineraryHighlights: [
      "Darshan of Lord Badri Vishal at Badrinath Dham",
      "Holy dip in sacred Tapt Kund hot springs",
      "Visit to Mana - India's First Village, Vyas Gufa & Bhim Pul",
      "Scenic Alaknanda & Mandakini confluence views"
    ],
    inclusions: [
      "3 Nights deluxe hotel stay in Haridwar, Joshimath, and Badrinath",
      "All meals (Breakfast, Lunch, Dinner - Pure Vegetarian)",
      "Dedicated mountain-experienced driver in sanitized vehicle",
      "Mandatory biometric Yatra registration assistance",
      "Oxygen cylinder support on board"
    ],
    exclusions: [
      "Helicopter tickets (if chosen)",
      "VIP temple entry tickets",
      "Horse / Palki charges"
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: "Haridwar/Rishikesh to Joshimath",
        description: "Scenic mountain drive along the Ganga, Alaknanda, and Mandakini rivers via Devprayag and Rudraprayag to Joshimath.",
        meals: "Dinner",
        stay: "Joshimath Deluxe Hotel"
      },
      {
        day: 2,
        title: "Joshimath to Badrinath Dham",
        description: "Drive to Badrinath. Holy bath at Tapt Kund and reverent darshan of Badri Vishal. Attend evening Sandhya Aarti.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Badrinath Temple View Hotel"
      },
      {
        day: 3,
        title: "Mana Village & Return to Rudraprayag",
        description: "Morning visit to Mana village, Saraswati river origin, Vyas Cave. Afternoon drive back to Rudraprayag.",
        meals: "Breakfast, Lunch, Dinner",
        stay: "Rudraprayag Riverside Resort"
      },
      {
        day: 4,
        title: "Rudraprayag to Haridwar / Dehradun Departure",
        description: "Scenic return journey via Rishikesh Ram Jhula. Drop at Haridwar or Dehradun station/airport.",
        meals: "Breakfast",
        stay: "Tour Concludes"
      }
    ]
  },
  {
    title: "12 Jyotirlinga Pilgrimage: Mahakal, Omkareshwar & Somnath",
    slug: "jyotirlinga-pilgrimage-circuit",
    destination: "Ujjain",
    destinationsList: ["Ujjain", "Omkareshwar", "Somnath", "Dwarka"],
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    departureCity: "Indore / Ahmedabad",
    durationDays: 6,
    durationNights: 5,
    pricePerPerson: 22500,
    isDemoPrice: true,
    availabilityLabel: "Fixed & Customized Dates Available",
    category: "Jyotirlinga Circuit",
    travelPace: "Moderate",
    providerName: "Trishul Spiritual Yatras",
    providerVerified: true,
    isFeatured: true,
    itineraryHighlights: [
      "Mahakaleshwar Jyotirlinga Bhasma Aarti reservation assistance",
      "Island circumambulation & darshan at Omkareshwar Jyotirlinga",
      "Somnath Jyotirlinga seaside darshan and Sound & Light show",
      "Dwarkadhish temple darshan & sacred Gomti Ghat"
    ],
    inclusions: [
      "5 Nights accommodation in premium pilgrimage hotels",
      "Daily breakfast & dinner",
      "Private AC transport with experienced interstate drivers",
      "Toll taxes, state permits, and parking charges",
      "Local temple guide & assistance"
    ],
    exclusions: [
      "Train/Air tickets",
      "VIP darshan passes (payable directly at temple counters)",
      "Boat ride charges at Omkareshwar & Dwarka"
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: "Arrival in Indore - Transfer to Ujjain",
        description: "Pick-up from Indore Airport and drive to Ujjain. Visit Mahakal Lok and attend evening Aarti at Mahakaleshwar.",
        meals: "Dinner",
        stay: "Ujjain Hotel"
      },
      {
        day: 2,
        title: "Mahakal Bhasma Aarti & Omkareshwar",
        description: "Witness holy Bhasma Aarti. Drive to sacred Omkareshwar on Narmada island. Evening Narmada Aarti.",
        meals: "Breakfast & Dinner",
        stay: "Omkareshwar Resort"
      },
      {
        day: 3,
        title: "Indore to Ahmedabad / Rajkot",
        description: "Morning darshan at Mamleshwar temple. Travel towards Gujarat spiritual circuit.",
        meals: "Breakfast & Dinner",
        stay: "Rajkot Deluxe Hotel"
      },
      {
        day: 4,
        title: "Rajkot to Somnath Jyotirlinga",
        description: "Proceed to Somnath. Take darshan at the first Jyotirlinga and witness the evening beach Aarti.",
        meals: "Breakfast & Dinner",
        stay: "Somnath Trust Guest House / Hotel"
      },
      {
        day: 5,
        title: "Somnath to Dwarka",
        description: "Drive along coastal highway to Dwarka. Evening darshan at Dwarkadhish temple and Gomti Ghat.",
        meals: "Breakfast & Dinner",
        stay: "Dwarka Hotel"
      },
      {
        day: 6,
        title: "Bet Dwarka, Nageshwar Jyotirlinga & Departure",
        description: "Morning visit to Nageshwar Jyotirlinga and Bet Dwarka. Afternoon drop at Jamnagar/Rajkot airport.",
        meals: "Breakfast",
        stay: "Tour Concludes"
      }
    ]
  },
  {
    title: "Mata Vaishno Devi Holy Yatra Package",
    slug: "vaishno-devi-holy-yatra",
    destination: "Vaishno Devi (Katra)",
    destinationsList: ["Katra", "Bhavan", "Shivkhori"],
    heroImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    departureCity: "Jammu / Katra",
    durationDays: 3,
    durationNights: 2,
    pricePerPerson: 6500,
    isDemoPrice: true,
    availabilityLabel: "Year-Round Instant Enquiry (Demo Pricing)",
    category: "Himalayan Yatra",
    travelPace: "Active",
    providerName: "Trikuta Devi Pilgrim Services",
    providerVerified: true,
    isFeatured: true,
    itineraryHighlights: [
      "Smooth RFID card facilitation at Katra base",
      "Assistance for battery auto-car or pony bookings",
      "Priority guidance for Holy Cave Pindi Darshan",
      "Day excursion to ancient Shivkhori Cave"
    ],
    inclusions: [
      "2 Nights stay at well-appointed hotel in Katra",
      "Daily breakfast and dinner",
      "Station/Airport transfers from Jammu in AC car",
      "Excursion to Shivkhori in private cab",
      "24/7 on-call helpline for yatra support"
    ],
    exclusions: [
      "Helicopter tickets (must be booked via Shrine Board)",
      "Pony, Palki, or Ropeway tickets",
      "Personal offerings & dakshina"
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: "Arrival in Jammu - Transfer to Katra",
        description: "Reception at Jammu Railway Station/Airport. Scenic drive to Katra. RFID issuance support and briefing.",
        meals: "Dinner",
        stay: "Hotel in Katra"
      },
      {
        day: 2,
        title: "Mata Vaishno Devi Bhavan Yatra",
        description: "Early morning trek or battery-car journey up to holy Bhavan. Seek divine blessings of Maa Vaishno Devi and Bhairon Nath. Return to Katra by evening.",
        meals: "Breakfast & Dinner",
        stay: "Hotel in Katra"
      },
      {
        day: 3,
        title: "Shivkhori Cave & Jammu Departure",
        description: "Morning visit to the natural Shivkhori Cave shrine. Afternoon drop at Jammu station/airport.",
        meals: "Breakfast",
        stay: "Tour Concludes"
      }
    ]
  },
  {
    title: "Divine Tirupati Balaji Darshan Package",
    slug: "divine-tirupati-balaji-darshan",
    destination: "Tirupati",
    destinationsList: ["Tirupati", "Tirumala", "Kanipakam", "Sri Kalahasti"],
    heroImage: "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80",
    departureCity: "Chennai / Bangalore / Tirupati",
    durationDays: 3,
    durationNights: 2,
    pricePerPerson: 7800,
    isDemoPrice: true,
    availabilityLabel: "Open for Weekend Bookings",
    category: "Heritage & South",
    travelPace: "Relaxed",
    providerName: "Balaji Divine Escorts",
    providerVerified: true,
    isFeatured: true,
    itineraryHighlights: [
      "Assisted darshan guidance at Tirumala Sri Venkateswara Temple",
      "Complimentary authentic Tirupati Laddu collection assist",
      "Visit to Goddess Padmavathi Temple at Tiruchanur",
      "Darshan at Sri Kalahasteeswara Rahu-Ketu Kshetra"
    ],
    inclusions: [
      "2 Nights AC hotel stay in Tirupati foothill town",
      "Daily South Indian vegetarian breakfast and dinner",
      "AC sedan vehicle for all temple tours and hill transfer",
      "Experienced local pilgrimage attendant",
      "All interstate permits and parking charges"
    ],
    exclusions: [
      "Special Entry Ticket fee (₹300 TTD fee paid directly)",
      "Head tonsuring (Mundan) offerings",
      "Air / train tickets to Chennai or Tirupati"
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: "Arrival in Tirupati & Local Shrines",
        description: "Pick-up from Tirupati airport/railway station. Check-in. Visit Sri Padmavathi Ammavari Temple and Kapila Theertham.",
        meals: "Dinner",
        stay: "Tirupati 3-Star Hotel"
      },
      {
        day: 2,
        title: "Tirumala Hill & Sri Venkateswara Darshan",
        description: "Early morning ascent to Tirumala hills. Enter the sacred Vaikuntam queue complex for darshan of Lord Balaji. Seek blessings and collect Tirupati Laddu.",
        meals: "Breakfast & Dinner",
        stay: "Tirupati 3-Star Hotel"
      },
      {
        day: 3,
        title: "Sri Kalahasti & Departure",
        description: "Visit Sri Kalahasti (Vayu Lingam) for Rahu-Ketu pooja. Return to Tirupati / Chennai for onward journey.",
        meals: "Breakfast",
        stay: "Tour Concludes"
      }
    ]
  },
  {
    title: "Shirdi Sai Baba Holy Pilgrimage & Shani Shingnapur",
    slug: "shirdi-sai-baba-holy-pilgrimage",
    destination: "Shirdi",
    destinationsList: ["Shirdi", "Shani Shingnapur", "Nashik"],
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    departureCity: "Mumbai / Pune / Shirdi",
    durationDays: 3,
    durationNights: 2,
    pricePerPerson: 5900,
    isDemoPrice: true,
    availabilityLabel: "Available for Weekend Departures",
    category: "Weekend Pilgrimage",
    travelPace: "Relaxed",
    providerName: "Sai Blessings Pilgrimage Tours",
    providerVerified: true,
    isFeatured: true,
    itineraryHighlights: [
      "Assisted darshan at Sai Baba Samadhi Mandir",
      "Visit to sacred Dwarkamai, Gurusthan, and Chavadi",
      "Day trip to sacred Shani Shingnapur open-air shrine",
      "Optional visit to Trimbakeshwar Jyotirlinga in Nashik"
    ],
    inclusions: [
      "2 Nights AC accommodation near temple complex",
      "Daily breakfast & vegetarian dinner",
      "AC private vehicle for Shirdi and Shani Shingnapur tour",
      "Assistance for Kakad Aarti registration",
      "All driver allowances and parking"
    ],
    exclusions: [
      "Special VIP pass fees",
      "Travel insurance",
      "Train or flight tickets"
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: "Arrival in Shirdi & Evening Aarti",
        description: "Arrive at Shirdi airport or Sainagar railway station. Transfer to hotel. Evening darshan at Samadhi Mandir and attend Dhoop Aarti.",
        meals: "Dinner",
        stay: "Hotel near Shirdi Temple"
      },
      {
        day: 2,
        title: "Shani Shingnapur Excursion",
        description: "Early morning Kakad Aarti (subject to pass). Breakfast and drive to Shani Shingnapur village. Return to Shirdi for Dwarkamai visit.",
        meals: "Breakfast & Dinner",
        stay: "Hotel near Shirdi Temple"
      },
      {
        day: 3,
        title: "Langar Prasadam & Departure",
        description: "Visit Sai Prasadalaya for blessed lunch. Transfer to Shirdi or Pune airport/station for departure.",
        meals: "Breakfast",
        stay: "Tour Concludes"
      }
    ]
  },
  {
    title: "Sacred Uttarakhand Char Dham Yatra",
    slug: "sacred-uttarakhand-char-dham-yatra",
    destination: "Kedarnath",
    destinationsList: ["Yamunotri", "Gangotri", "Kedarnath", "Badrinath", "Haridwar"],
    heroImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    departureCity: "Haridwar / Dehradun / Delhi",
    durationDays: 10,
    durationNights: 9,
    pricePerPerson: 34500,
    isDemoPrice: true,
    availabilityLabel: "Booking Enquiry for May-October Yatra",
    category: "Himalayan Yatra",
    travelPace: "Active",
    providerName: "Char Dham Divine Himalayan Expeditions",
    providerVerified: true,
    isFeatured: true,
    itineraryHighlights: [
      "Complete darshan of all 4 sacred shrines: Yamunotri, Gangotri, Kedarnath, and Badrinath",
      "Holy dip in sacred Yamuna, Bhagirathi, and Alaknanda rivers",
      "Witness Ganga Aarti at Har Ki Pauri in Haridwar",
      "Round-the-clock medical & mountain logistics support"
    ],
    inclusions: [
      "9 Nights stay at verified clean mountain hotels and guesthouses",
      "All pure vegetarian meals (Breakfast, Lunch & Dinner)",
      "Experienced mountain driver with 4x4 / Tempo Traveller",
      "Biometric registration & Yatra pass coordination",
      "Emergency oxygen kit and first aid on board"
    ],
    exclusions: [
      "Helicopter tickets for Kedarnath",
      "Pony, Palki, or Kandi charges",
      "Personal pooja donations and laundry"
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: "Haridwar to Barkot",
        description: "Drive via Mussoorie and Kempty Falls to Barkot base camp.",
        meals: "Dinner",
        stay: "Barkot Camp/Hotel"
      },
      {
        day: 2,
        title: "Barkot - Yamunotri - Barkot",
        description: "Trek to Yamunotri Temple and hot water kund. Return to Barkot.",
        meals: "Breakfast & Dinner",
        stay: "Barkot Camp/Hotel"
      },
      {
        day: 3,
        title: "Barkot to Uttarkashi",
        description: "Drive to Uttarkashi. Visit Kashi Vishwanath temple of Uttarakhand.",
        meals: "Breakfast & Dinner",
        stay: "Uttarkashi Hotel"
      },
      {
        day: 4,
        title: "Uttarkashi - Gangotri - Uttarkashi",
        description: "Excursion to Gangotri Temple along the gorgeous Bhagirathi valley.",
        meals: "Breakfast & Dinner",
        stay: "Uttarkashi Hotel"
      },
      {
        day: 5,
        title: "Uttarkashi to Guptkashi",
        description: "Scenic drive to Guptkashi near Mandakini river.",
        meals: "Breakfast & Dinner",
        stay: "Guptkashi Hotel"
      },
      {
        day: 6,
        title: "Guptkashi to Kedarnath Dham",
        description: "Trek or helicopter to Kedarnath. Evening Aarti at 3,584m altitude.",
        meals: "Breakfast & Dinner",
        stay: "Kedarnath Guest House"
      },
      {
        day: 7,
        title: "Kedarnath to Pipalkoti / Joshimath",
        description: "Morning darshan and descent back to base. Drive to Pipalkoti.",
        meals: "Breakfast & Dinner",
        stay: "Pipalkoti Hotel"
      },
      {
        day: 8,
        title: "Pipalkoti to Badrinath Dham",
        description: "Drive to Badrinath. Holy dip in Tapt Kund and evening Aarti.",
        meals: "Breakfast & Dinner",
        stay: "Badrinath Hotel"
      },
      {
        day: 9,
        title: "Badrinath - Mana - Rudraprayag",
        description: "Visit Mana village and return drive to Rudraprayag.",
        meals: "Breakfast & Dinner",
        stay: "Rudraprayag Resort"
      },
      {
        day: 10,
        title: "Rudraprayag to Haridwar / Rishikesh Departure",
        description: "Drive back to Haridwar via Devprayag. Tour concludes with divine memories.",
        meals: "Breakfast",
        stay: "Tour Concludes"
      }
    ]
  }
];

const seedItineraries = [
  {
    title: "Sacred Kashi & Sarnath 3-Day Spiritual Tour",
    destination: "Kashi (Varanasi)",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
    days: 3,
    travelPace: "Relaxed",
    comfortCategory: "Standard",
    estimatedCost: 7500,
    isEstimatedPrice: true,
    viewsCount: 1420,
    isFeatured: true,
    highlights: [
      "Kashi Vishwanath Corridor & Annapurna Darshan",
      "Private Ganga Sunrise Boat Tour",
      "Dashashwamedh Ghat Evening Aarti",
      "Excursion to Buddhist Sarnath Stupa"
    ],
    dayByDay: [
      {
        day: 1,
        title: "Arrival, Ghat Walk & Evening Ganga Aarti",
        description: "Check into your hotel. Take a heritage walk through the ancient alleyways and witness the spellbinding Ganga Aarti from a riverside vantage.",
        highlights: ["Assi Ghat", "Dashashwamedh Aarti", "Banarasi Chaat Walk"]
      },
      {
        day: 2,
        title: "Subah-e-Banaras & Kashi Vishwanath Dham",
        description: "Experience the tranquil morning sunrise boat ride on the holy river. Attend the sacred Sugam Darshan at Shri Kashi Vishwanath Temple.",
        highlights: ["Sunrise Boat Ride", "Kashi Vishwanath Dham", "Kaal Bhairav Mandir"]
      },
      {
        day: 3,
        title: "Sarnath Excursion & Departure",
        description: "Visit the sacred Deer Park at Sarnath where Lord Buddha gave his first sermon. Shop for authentic Banarasi silk before your return journey.",
        highlights: ["Dhamek Stupa", "Sarnath Museum", "Silk Weaver Workshop"]
      }
    ]
  },
  {
    title: "Ayodhya, Kashi & Prayagraj Triveni 4-Day Circuit",
    destination: "Ayodhya & Kashi",
    image: "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80",
    days: 4,
    travelPace: "Moderate",
    comfortCategory: "Deluxe",
    estimatedCost: 14200,
    isEstimatedPrice: true,
    viewsCount: 2310,
    isFeatured: true,
    highlights: [
      "Shri Ram Janmabhoomi & Hanuman Garhi, Ayodhya",
      "Kashi Vishwanath Jyotirlinga, Varanasi",
      "Triveni Sangam holy bath, Prayagraj",
      "Sarayu & Ganga Evening Aartis"
    ],
    dayByDay: [
      {
        day: 1,
        title: "Ayodhya: Ram Janmabhoomi & Sarayu Aarti",
        description: "Arrive in Ayodhya. Visit the divine Shri Ram Janmabhoomi temple and Hanuman Garhi. Watch the twilight Sarayu Aarti at Ram Ki Paidi.",
        highlights: ["Ram Lalla Darshan", "Hanuman Garhi", "Sarayu Aarti"]
      },
      {
        day: 2,
        title: "Ayodhya to Prayagraj Sangam to Varanasi",
        description: "Drive to Prayagraj for a boat ride at Triveni Sangam. Visit the sacred reclining Bade Hanuman Ji. Continue to holy Kashi.",
        highlights: ["Triveni Sangam", "Bade Hanuman Ji", "Drive to Kashi"]
      },
      {
        day: 3,
        title: "Kashi Vishwanath Dham & Ganga Boat Tour",
        description: "Early morning Kashi Vishwanath Darshan and Annapurna Temple. Evening private boat tour for Dashashwamedh Ghat Aarti.",
        highlights: ["Vishwanath Corridor", "Annapurna Temple", "Ganga Aarti"]
      },
      {
        day: 4,
        title: "Sankat Mochan & Varanasi Departure",
        description: "Morning visit to Sankat Mochan Hanuman Temple and Durga Kund. Transfer to Varanasi Airport for flight home.",
        highlights: ["Sankat Mochan Temple", "BHU Vishwanath Temple", "Departure"]
      }
    ]
  },
  {
    title: "Ujjain & Omkareshwar Jyotirlinga 3-Day Gateway",
    destination: "Ujjain",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    days: 3,
    travelPace: "Moderate",
    comfortCategory: "Standard",
    estimatedCost: 8900,
    isEstimatedPrice: true,
    viewsCount: 1890,
    isFeatured: true,
    highlights: [
      "Mahakaleshwar Bhasma Aarti Experience",
      "Mahakal Lok Corridor Exploration",
      "Omkareshwar Narmada Island Temple",
      "Kal Bhairav & Harsiddhi Shakti Peeth"
    ],
    dayByDay: [
      {
        day: 1,
        title: "Indore to Ujjain & Mahakal Lok",
        description: "Arrival at Indore airport/station. Drive to Ujjain. Visit Harsiddhi Temple (Shakti Peeth) and explore the majestic Mahakal Lok corridor at sunset.",
        highlights: ["Harsiddhi Mata", "Mahakal Lok", "Ram Ghat"]
      },
      {
        day: 2,
        title: "Mahakal Bhasma Aarti & Kal Bhairav",
        description: "Witness the sacred 4:00 AM Bhasma Aarti. Post-breakfast, visit Kal Bhairav and Sandipani Ashram. Evening Shipra River Aarti.",
        highlights: ["Bhasma Aarti", "Kal Bhairav", "Sandipani Ashram"]
      },
      {
        day: 3,
        title: "Omkareshwar Jyotirlinga Excursion & Departure",
        description: "Morning drive to holy Omkareshwar island on the Narmada river. Take darshan at Omkareshwar & Mamleshwar before drop at Indore airport.",
        highlights: ["Omkareshwar Island", "Mamleshwar", "Indore Drop"]
      }
    ]
  },
  {
    title: "Tirupati Balaji & Kanipakam 3-Day Divine Gateway",
    destination: "Tirupati",
    image: "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80",
    days: 3,
    travelPace: "Relaxed",
    comfortCategory: "Deluxe",
    estimatedCost: 9200,
    isEstimatedPrice: true,
    viewsCount: 1650,
    isFeatured: true,
    highlights: [
      "Tirumala Sri Venkateswara Swamy Darshan",
      "Padmavathi Ammavari Temple, Tiruchanur",
      "Sri Varasiddhi Vinayaka Temple, Kanipakam",
      "Sacred Laddu Prasadam Collection"
    ],
    dayByDay: [
      {
        day: 1,
        title: "Arrival in Tirupati & Local Kshetras",
        description: "Pick-up from Tirupati airport/railway station. Visit Tiruchanur Goddess Padmavathi Temple and historic Govindaraja Swamy Temple.",
        highlights: ["Padmavathi Temple", "Govindaraja Swamy", "Foothill Rest"]
      },
      {
        day: 2,
        title: "Tirumala Hill Balaji Darshan",
        description: "Drive up the scenic 7 hills to Tirumala. Dedicated entry for Lord Balaji Darshan. Seek blessings and collect sacred Laddus.",
        highlights: ["Seshachalam Hills", "Sri Venkateswara Darshan", "Laddu Prasadam"]
      },
      {
        day: 3,
        title: "Kanipakam Vinayaka Temple & Departure",
        description: "Morning visit to self-manifested Swayambhu Vinayaka at Kanipakam. Afternoon transfer to airport/railway station.",
        highlights: ["Kanipakam Vinayaka", "Local Souvenirs", "Departure"]
      }
    ]
  }
];

const seedProviders = [
  {
    name: "Pandit Kameshwar Shastri",
    type: "Pandit & Puja",
    verificationStatus: "Verified",
    isVerified: true,
    city: "Varanasi",
    state: "Uttar Pradesh",
    phone: "+91 94150 12345",
    email: "shastri.kashi@darshanease.com",
    experienceYears: 24,
    rating: 4.95,
    languages: ["Hindi", "Sanskrit", "English", "Bhojpuri"],
    ritualsOffered: [
      "Kashi Rudrabhishek at Manikarnika Ghat",
      "Maha Mrityunjaya Jaap & Havan",
      "Ganga Pujan & Navagraha Shanti",
      "Ancestral Shradh & Pind Daan in Kashi"
    ],
    pricingDetails: [
      { serviceName: "Rudrabhishek with Ganga Jal", description: "Vedic recitation of Sri Rudram with fresh bilva leaves, panchamrit, and Ganga water.", estimatedFee: 2100, duration: "1.5 Hours", isDemoPrice: true },
      { serviceName: "Maha Mrityunjaya Havan", description: "Complete peace and health anushthan with 108 offering ahutis and consecrated samagri.", estimatedFee: 3500, duration: "2.5 Hours", isDemoPrice: true },
      { serviceName: "Ganga Aarti Sankalp Pujan", description: "Private family sankalp and deepdaan on consecrated private wooden bajra boat.", estimatedFee: 1500, duration: "1 Hour", isDemoPrice: true }
    ],
    bio: "Hailing from a family of renowned Kashi Vedic scholars, Pandit Kameshwar Shastri has conducted authentic temple rituals and personalized pujas for over two decades with transparent guidance.",
    avatar: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Acharya Ramdas Tiwari",
    type: "Pandit & Puja",
    verificationStatus: "Verified",
    isVerified: true,
    city: "Ayodhya",
    state: "Uttar Pradesh",
    phone: "+91 94520 67890",
    email: "ramdas.ayodhya@darshanease.com",
    experienceYears: 18,
    rating: 4.92,
    languages: ["Hindi", "Sanskrit", "Awadhi"],
    ritualsOffered: [
      "Shri Ramcharitmanas Akhand Path",
      "Sundarkand Path & Hanuman Chalisa Havan",
      "Sarayu Pujan & Deepdaan",
      "Satyanarayan Katha with Panchamrit"
    ],
    pricingDetails: [
      { serviceName: "Sundarkand Special Anushthan", description: "Melodious complete recitation of Sundarkand with Hanuman Chalisa and Ram stuti.", estimatedFee: 1800, duration: "2 Hours", isDemoPrice: true },
      { serviceName: "Sarayu Maha Pujan", description: "Vedic Sarayu aarti sankalp performed by the river with family blessings.", estimatedFee: 1200, duration: "1 Hour", isDemoPrice: true }
    ],
    bio: "Senior priest associated with Ayodhya Dharma Sangh, specializing in Ram Katha and auspicious home anushthans.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Pandit Rameshwar Joshi",
    type: "Pandit & Puja",
    verificationStatus: "Verified",
    isVerified: true,
    city: "Ujjain",
    state: "Madhya Pradesh",
    phone: "+91 98270 34567",
    email: "rameshwar.ujjain@darshanease.com",
    experienceYears: 20,
    rating: 4.88,
    languages: ["Hindi", "Sanskrit", "Gujarati", "Marathi"],
    ritualsOffered: [
      "Kaal Sarp Dosh Nivaran Puja",
      "Mahakal Bhasma Aarti Sankalp",
      "Mangal Dosh Shanti at Mangalnath",
      "Maha Rudrabhishek with Bhasma"
    ],
    pricingDetails: [
      { serviceName: "Kaal Sarp Dosh Shanti Puja", description: "Authentic Ujjain riverbank anushthan with silver nag-nagin offerings and Rudra chanting.", estimatedFee: 2500, duration: "2 Hours", isDemoPrice: true },
      { serviceName: "Mangalnath Bhaum Puja", description: "Traditional Mars affliction peace ritual performed at the birthplace of Mars in Ujjain.", estimatedFee: 2200, duration: "1.5 Hours", isDemoPrice: true }
    ],
    bio: "Certified Jyotish and Vedic ritualist with expertise in Ujjain astrological remedies and Shiva anushthans.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Divine Seva Pilgrimage Assistance",
    type: "Ground Assistance",
    verificationStatus: "Verified",
    isVerified: true,
    city: "Varanasi",
    state: "Uttar Pradesh",
    phone: "+91 8000 111 222",
    email: "assistance.kashi@darshanease.com",
    experienceYears: 8,
    rating: 4.96,
    languages: ["Hindi", "English", "Tamil", "Telugu", "Bengali"],
    assistanceTypes: [
      "Senior Citizen Wheelchair Coordination",
      "Corridor E-Rickshaw & Battery Car Transit",
      "Temple Locker & Safe Custody Assistance",
      "Dedicated Escort for Elderly Devotees"
    ],
    pricingDetails: [
      { serviceName: "Senior Citizen Escort & Wheelchair", description: "Dedicated compassionate assistant with wheelchair from Ghat drop-off to Corridor gate.", estimatedFee: 800, duration: "Half Day", isDemoPrice: true },
      { serviceName: "Full-Day Temple Companion", description: "Multi-lingual companion assisting in queues, footwear deposit, and laddu prasadam collection.", estimatedFee: 1500, duration: "Full Day", isDemoPrice: true }
    ],
    bio: "Pre-verified ground team dedicated to ensuring hassle-free temple visits for elderly devotees and families.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Tirumala Balaji Pilgrim Companion",
    type: "Ground Assistance",
    verificationStatus: "Verified",
    isVerified: true,
    city: "Tirupati",
    state: "Andhra Pradesh",
    phone: "+91 8000 333 444",
    email: "companion.tirupati@darshanease.com",
    experienceYears: 12,
    rating: 4.98,
    languages: ["Telugu", "Tamil", "Hindi", "Kannada", "English"],
    assistanceTypes: [
      "Vaikuntam Queue Entry Guidance",
      "Laddu Token Redemption & Packaging Assist",
      "Special Entry Counter Orientation",
      "Foothill to Hilltop Vehicle Coordination"
    ],
    pricingDetails: [
      { serviceName: "Tirumala Hill Top Guidance Assist", description: "Meet & greet at hilltop, locker coordination, entry queue orientation, and laddu pickup help.", estimatedFee: 1000, duration: "4 Hours", isDemoPrice: true }
    ],
    bio: "Trusted local team assisting pilgrims across Tirumala hills for smooth darshan and traditional customs.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"
  }
];

module.exports = {
  seedTemples,
  seedDestinations,
  seedPackages,
  seedItineraries,
  seedProviders
};
