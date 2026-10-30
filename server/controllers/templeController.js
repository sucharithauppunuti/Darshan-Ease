const Temple = require('../models/Temple');
const DarshanType = require('../models/DarshanType');

// @desc    Get all temples with search and filters
// @route   GET /api/temples
// @access  Public
exports.getTemples = async (req, res, next) => {
  try {
    const {
      search,
      city,
      state,
      category,
      deity,
      trustLabel,
      bookingMode,
      maxPrice,
      sort,
      status,
      limit = 50,
      page = 1
    } = req.query;

    const query = {};

    // Handle status filtering:
    // If status is specified (e.g. from admin panel: 'all', 'active', 'inactive')
    if (status) {
      if (status === 'all') {
        // Return both active and inactive temples (no status filter)
      } else if (['active', 'inactive'].includes(status)) {
        query.status = status;
      }
    } else {
      // By default for public users, only active temples are returned
      query.status = 'active';
    }

    // Search by temple name, deity, city, or state
    if (search && search.trim() !== '') {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: regex },
        { deity: regex },
        { city: regex },
        { state: regex }
      ];
    }

    if (city && city.trim() !== '') {
      query.city = new RegExp(`^${city.trim()}$`, 'i');
    }

    if (state && state.trim() !== '' && state !== 'All States' && state !== 'All') {
      query.state = new RegExp(`^${state.trim()}$`, 'i');
    }

    if (category && category !== 'All' && category.trim() !== '') {
      const catTrim = category.trim();
      if (/jyotirlinga/i.test(catTrim)) {
        query.category = { $in: ['Jyotirlinga', 'Jyotirlingas'] };
      } else if (/shakti/i.test(catTrim)) {
        query.category = { $in: ['Shakti Peeth', 'Shakti Peethas'] };
      } else if (/vaishnava/i.test(catTrim)) {
        query.category = { $in: ['Vaishnava', 'Vaishnava Temples'] };
      } else if (/ganesh/i.test(catTrim)) {
        query.category = { $in: ['Ganesh', 'Lord Ganesha', 'Lord Ganesha Temples'] };
      } else if (/other/i.test(catTrim)) {
        query.category = { $in: ['Other Deities', 'Other Temples'] };
      } else {
        query.category = new RegExp(catTrim, 'i');
      }
    }

    if (deity && deity !== 'All Deities' && deity !== 'All' && deity.trim() !== '') {
      query.deity = new RegExp(deity.trim(), 'i');
    }

    if (trustLabel && trustLabel !== 'All' && trustLabel.trim() !== '') {
      query.trustLabel = trustLabel.trim();
    }

    if (bookingMode && bookingMode !== 'All' && bookingMode.trim() !== '') {
      query.bookingMode = bookingMode.trim();
    }

    const { priceType, isFree } = req.query;
    if (priceType === 'free' || isFree === 'true') {
      query.startingPrice = 0;
    } else if (priceType === 'paid') {
      query.startingPrice = { $gt: 0 };
    } else if (maxPrice !== undefined && maxPrice !== '') {
      query.startingPrice = { $lte: Number(maxPrice) };
    }

    // Sorting
    let sortOption = { isPopular: -1, createdAt: -1 };
    if (sort === 'price_asc') sortOption = { startingPrice: 1 };
    if (sort === 'price_desc') sortOption = { startingPrice: -1 };
    if (sort === 'name_asc') sortOption = { name: 1 };
    if (sort === 'name_desc') sortOption = { name: -1 };

    const parsedPage = parseInt(page, 10) || 1;
    const parsedLimit = parseInt(limit, 10) || 50;
    const skip = (parsedPage - 1) * parsedLimit;

    const total = await Temple.countDocuments(query);
    const temples = await Temple.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(parsedLimit);

    // Fetch active darshan types for the retrieved temples so cards show authentic configured darshan types and true starting tariffs
    const templeIds = temples.map(t => t._id);
    const darshanTypes = await DarshanType.find({
      temple: { $in: templeIds },
      status: 'active'
    }).select('temple name chargePerDevotee duration durationMinutes isFree rules');

    const darshanTypesByTemple = {};
    darshanTypes.forEach(dt => {
      const tid = dt.temple.toString();
      if (!darshanTypesByTemple[tid]) darshanTypesByTemple[tid] = [];
      darshanTypesByTemple[tid].push(dt);
    });

    const enrichedTemples = temples.map(t => {
      const tObj = t.toObject ? t.toObject() : { ...t };
      tObj.darshanTypes = darshanTypesByTemple[t._id.toString()] || [];
      if (tObj.darshanTypes.length > 0) {
        const prices = tObj.darshanTypes.map(d => Number(d.chargePerDevotee || 0));
        tObj.startingPrice = Math.min(...prices);
      }
      return tObj;
    });

    res.status(200).json({
      success: true,
      count: enrichedTemples.length,
      total,
      currentPage: parsedPage,
      totalPages: Math.ceil(total / parsedLimit),
      temples: enrichedTemples
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single temple by ID with its darshan types
// @route   GET /api/temples/:id
// @access  Public
exports.getTempleById = async (req, res, next) => {
  try {
    const temple = await Temple.findById(req.params.id);
    if (!temple) {
      return res.status(404).json({
        success: false,
        message: 'Temple not found'
      });
    }

    // Check status if not admin
    if (temple.status !== 'active' && (!req.user || req.user.role !== 'admin')) {
      return res.status(404).json({
        success: false,
        message: 'This temple is currently unavailable'
      });
    }

    // Fetch darshan types for this temple
    const darshanTypeQuery = { temple: temple._id };
    if (!req.user || req.user.role !== 'admin') {
      darshanTypeQuery.status = 'active';
    }
    const darshanTypes = await DarshanType.find(darshanTypeQuery).sort({ chargePerDevotee: 1 });

    res.status(200).json({
      success: true,
      temple,
      darshanTypes
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create a new temple
// @route   POST /api/temples
// @access  Private (Admin only)
exports.createTemple = async (req, res, next) => {
  try {
    const {
      name,
      deity,
      category,
      description,
      images,
      address,
      city,
      state,
      contactInfo,
      openingHours,
      guidelines,
      status,
      startingPrice,
      isPopular,
      isVerified,
      trustLabel,
      bookingMode,
      officialUrl,
      lastReviewedDate,
      accessibilityNotes,
      crowdLevelInfo,
      visitingInfo,
      sourceVerification
    } = req.body;

    if (!name || !deity || !description || !address || !city || !state) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, deity, description, address, city, and state'
      });
    }

    const temple = await Temple.create({
      name: name.trim(),
      deity: deity.trim(),
      category: category || 'Vaishnava',
      description: description.trim(),
      images: Array.isArray(images) && images.length > 0 ? images : ['https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80'],
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      contactInfo: contactInfo || {},
      openingHours: openingHours || '06:00 AM - 09:00 PM',
      guidelines: guidelines || 'Traditional Indian dress code mandatory. Electronic gadgets not allowed.',
      status: status || 'active',
      startingPrice: Number(startingPrice) || 0,
      isPopular: Boolean(isPopular),
      isVerified: Boolean(isVerified),
      trustLabel: trustLabel || 'DarshanEase Verified',
      bookingMode: bookingMode || 'demo_booking',
      officialUrl: officialUrl || '',
      lastReviewedDate: lastReviewedDate || '2026-10-12',
      accessibilityNotes: accessibilityNotes || 'Wheelchair ramps available at main entrance, special assistance lane for senior citizens.',
      crowdLevelInfo: crowdLevelInfo || 'Moderate crowd (approx. 45-60 min darshan queue)',
      visitingInfo: visitingInfo || {
        bestTimeToVisit: 'October to March',
        rituals: ['Suprabhatam', 'Nithya Puja', 'Maha Aarti'],
        prasadTimings: '09:00 AM - 08:30 PM',
        footwearPolicy: 'Secure footwear counters available at temple outer complex'
      },
      sourceVerification: sourceVerification || {
        isVerified: true,
        sourceName: 'Official Shrine Board & DarshanEase Editorial Team',
        sourceUrl: officialUrl || '',
        verificationNotes: 'Information verified against recent official shrine notices.'
      }
    });

    res.status(201).json({
      success: true,
      message: 'Temple created successfully',
      temple
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update temple details
// @route   PUT /api/temples/:id
// @access  Private (Admin only)
exports.updateTemple = async (req, res, next) => {
  try {
    let temple = await Temple.findById(req.params.id);
    if (!temple) {
      return res.status(404).json({
        success: false,
        message: 'Temple not found'
      });
    }

    temple = await Temple.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Temple updated successfully',
      temple
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update temple status (Active/Inactive)
// @route   PATCH /api/temples/:id/status
// @access  Private (Admin only)
exports.updateTempleStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['active', 'inactive'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status must be either active or inactive'
      });
    }

    const temple = await Temple.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!temple) {
      return res.status(404).json({
        success: false,
        message: 'Temple not found'
      });
    }

    res.status(200).json({
      success: true,
      message: `Temple status updated to ${status}`,
      temple
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete temple
// @route   DELETE /api/temples/:id
// @access  Private (Admin only)
exports.deleteTemple = async (req, res, next) => {
  try {
    const temple = await Temple.findById(req.params.id);
    if (!temple) {
      return res.status(404).json({
        success: false,
        message: 'Temple not found'
      });
    }

    await Temple.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Temple deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};

