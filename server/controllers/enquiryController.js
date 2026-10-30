const Enquiry = require('../models/Enquiry');
const Notification = require('../models/Notification');

// Helper to generate reference
const generateEnquiryRef = () => {
  const year = new Date().getFullYear();
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `ENQ-${year}-${rand}`;
};

// @desc    Submit a pilgrimage enquiry
// @route   POST /api/enquiries
// @access  Public / Private
exports.createEnquiry = async (req, res, next) => {
  try {
    const enquiryTypeVal = req.body.enquiryType || 'General';
    const devoteeName = req.body.name || req.body.devoteeName;
    const devoteeEmail = req.body.email || req.body.devoteeEmail;
    const devoteePhone = req.body.phone || req.body.devoteePhone;
    const {
      destination,
      destinationName,
      templeName,
      packageTitle,
      serviceName,
      preferredDate,
      travelDate,
      travelersCount,
      devoteeCount,
      groupSize,
      departureCity,
      budgetPreference,
      budgetRange,
      specialRequests,
      message
    } = req.body;

    if (!devoteeName || !devoteeEmail || !devoteePhone) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and phone number are required to submit an enquiry'
      });
    }

    let enquiryReference = generateEnquiryRef();
    let exists = await Enquiry.findOne({ enquiryReference });
    while (exists) {
      enquiryReference = generateEnquiryRef();
      exists = await Enquiry.findOne({ enquiryReference });
    }

    const userId = req.user ? req.user._id : undefined;

    const enquiry = await Enquiry.create({
      enquiryReference,
      user: userId,
      enquiryType: enquiryTypeVal,
      name: devoteeName.trim(),
      email: devoteeEmail.trim().toLowerCase(),
      phone: devoteePhone.trim(),
      destination: destination || destinationName || '',
      templeName: templeName || '',
      packageTitle: packageTitle || '',
      serviceName: serviceName || '',
      preferredDate: preferredDate || travelDate || '',
      travelersCount: Number(travelersCount) || Number(devoteeCount) || 1,
      groupSize: Number(groupSize) || Number(devoteeCount) || Number(travelersCount) || 1,
      departureCity: departureCity || '',
      budgetPreference: budgetPreference || budgetRange || 'Standard Comfort',
      specialRequests: specialRequests || '',
      message: message || '',
      status: 'Requested'
    });

    // If user is authenticated, create an in-app notification
    if (userId) {
      await Notification.create({
        recipient: userId,
        title: `Enquiry Received: ${enquiryTypeVal} (${enquiryReference})`,
        message: `Namaste ${devoteeName}! We have received your ${enquiryTypeVal} enquiry for ${destination || destinationName || templeName || packageTitle || 'your sacred journey'}. Our pilgrimage coordinator will contact you shortly.`,
        type: 'general'
      });
    }

    res.status(201).json({
      success: true,
      message: 'Your pilgrimage enquiry has been submitted successfully!',
      enquiry
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get devotee's own enquiries
// @route   GET /api/enquiries/my
// @access  Private (Devotee)
exports.getMyEnquiries = async (req, res, next) => {
  try {
    const enquiries = await Enquiry.find({
      $or: [
        { user: req.user._id },
        { email: req.user.email.toLowerCase() }
      ]
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: enquiries.length,
      enquiries
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all enquiries (Admin)
// @route   GET /api/enquiries
// @access  Private/Admin
exports.getAllEnquiries = async (req, res, next) => {
  try {
    const { status, type, search } = req.query;
    const query = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (type && type !== 'All') {
      query.enquiryType = type;
    }

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: regex },
        { email: regex },
        { phone: regex },
        { destination: regex },
        { enquiryReference: regex }
      ];
    }

    const enquiries = await Enquiry.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: enquiries.length,
      enquiries
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update enquiry status and admin notes (Admin)
// @route   PATCH /api/enquiries/:id/status
// @access  Private/Admin
exports.updateEnquiryStatus = async (req, res, next) => {
  try {
    const { status, adminNotes, responseNotes } = req.body;
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    if (status) enquiry.status = status;
    const finalNote = adminNotes !== undefined ? adminNotes : responseNotes;
    if (finalNote !== undefined) enquiry.adminNotes = finalNote;

    await enquiry.save();

    // If user is linked, send status change notification
    if (enquiry.user) {
      await Notification.create({
        recipient: enquiry.user,
        title: `Enquiry Update: ${enquiry.enquiryReference}`,
        message: `Your pilgrimage enquiry status is now "${enquiry.status}". ${finalNote ? 'Note: ' + finalNote : ''}`,
        type: 'general'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Enquiry updated successfully',
      enquiry
    });
  } catch (err) {
    next(err);
  }
};
