const DarshanType = require('../models/DarshanType');
const Temple = require('../models/Temple');

// @desc    Get darshan types for a temple
// @route   GET /api/temples/:templeId/darshan-types
// @access  Public
exports.getDarshanTypesByTemple = async (req, res, next) => {
  try {
    const { templeId } = req.params;
    const query = { temple: templeId };

    if (!req.user || req.user.role !== 'admin') {
      query.status = 'active';
    }

    const darshanTypes = await DarshanType.find(query).sort({ chargePerDevotee: 1 });
    res.status(200).json({
      success: true,
      count: darshanTypes.length,
      darshanTypes
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all darshan types (for Admin table)
// @route   GET /api/admin/darshan-types
// @access  Private (Admin only)
exports.getAllDarshanTypes = async (req, res, next) => {
  try {
    const { templeId, status } = req.query;
    const query = {};
    if (templeId) query.temple = templeId;
    if (status && status !== 'all') query.status = status;

    const darshanTypes = await DarshanType.find(query)
      .populate('temple', 'name city state')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: darshanTypes.length,
      darshanTypes
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create darshan type for a temple
// @route   POST /api/temples/:templeId/darshan-types
// @access  Private (Admin only)
exports.createDarshanType = async (req, res, next) => {
  try {
    const { templeId } = req.params;
    const {
      name,
      description,
      chargePerDevotee,
      pricePerPerson,
      eligibility,
      duration,
      dressCode,
      reportingNotice,
      priceVerificationStatus,
      officialSourceUrl,
      status
    } = req.body;

    const temple = await Temple.findById(templeId);
    if (!temple) {
      return res.status(404).json({
        success: false,
        message: 'Temple not found'
      });
    }

    const price = Number(pricePerPerson !== undefined ? pricePerPerson : chargePerDevotee) || 0;

    const darshanType = await DarshanType.create({
      temple: templeId,
      name: name.trim(),
      description: description || '',
      chargePerDevotee: price,
      pricePerPerson: price,
      eligibility: eligibility || 'Open to all devotees with valid government photo identification',
      duration: duration || '30-45 minutes',
      dressCode: dressCode || 'Traditional Indian attire',
      reportingNotice: reportingNotice || 'Please report 30 minutes prior to slot start time.',
      priceVerificationStatus: priceVerificationStatus || 'verified',
      officialSourceUrl: officialSourceUrl || '',
      status: status || 'active',
      activeStatus: status || 'active'
    });

    // Update temple starting price if appropriate
    const lowest = await DarshanType.find({ temple: templeId, status: 'active' }).sort({ chargePerDevotee: 1 }).limit(1);
    if (lowest.length > 0) {
      temple.startingPrice = lowest[0].chargePerDevotee;
      await temple.save();
    }

    res.status(201).json({
      success: true,
      message: 'Darshan type created successfully',
      darshanType
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update darshan type
// @route   PUT /api/darshan-types/:id
// @access  Private (Admin only)
exports.updateDarshanType = async (req, res, next) => {
  try {
    let darshanType = await DarshanType.findById(req.params.id);
    if (!darshanType) {
      return res.status(404).json({
        success: false,
        message: 'Darshan type not found'
      });
    }

    const updateData = { ...req.body };
    if (updateData.pricePerPerson !== undefined) {
      updateData.chargePerDevotee = Number(updateData.pricePerPerson) || 0;
    } else if (updateData.chargePerDevotee !== undefined) {
      updateData.pricePerPerson = Number(updateData.chargePerDevotee) || 0;
    }

    darshanType = await DarshanType.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    // Update temple starting price
    const lowest = await DarshanType.find({ temple: darshanType.temple, status: 'active' }).sort({ chargePerDevotee: 1 }).limit(1);
    if (lowest.length > 0) {
      await Temple.findByIdAndUpdate(darshanType.temple, { startingPrice: lowest[0].chargePerDevotee });
    }

    res.status(200).json({
      success: true,
      message: 'Darshan type updated successfully',
      darshanType
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update darshan type status
// @route   PATCH /api/darshan-types/:id/status
// @access  Private (Admin only)
exports.updateDarshanTypeStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['active', 'inactive'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status must be active or inactive'
      });
    }

    const darshanType = await DarshanType.findByIdAndUpdate(
      req.params.id,
      { status, activeStatus: status },
      { new: true }
    );

    if (!darshanType) {
      return res.status(404).json({
        success: false,
        message: 'Darshan type not found'
      });
    }

    res.status(200).json({
      success: true,
      message: `Darshan type status updated to ${status}`,
      darshanType
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete darshan type
// @route   DELETE /api/darshan-types/:id
// @access  Private (Admin only)
exports.deleteDarshanType = async (req, res, next) => {
  try {
    const darshanType = await DarshanType.findById(req.params.id);
    if (!darshanType) {
      return res.status(404).json({
        success: false,
        message: 'Darshan type not found'
      });
    }

    await DarshanType.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Darshan type deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};

