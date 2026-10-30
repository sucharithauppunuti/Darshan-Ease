const express = require('express');
const router = express.Router();
const {
  createEnquiry,
  getMyEnquiries,
  getAllEnquiries,
  updateEnquiryStatus
} = require('../controllers/enquiryController');
const { protect, authorize, optionalProtect } = require('../middleware/auth');

router.post('/', optionalProtect, createEnquiry);
router.get('/my', protect, getMyEnquiries);
router.get('/', protect, authorize('admin'), getAllEnquiries);
router.patch('/:id/status', protect, authorize('admin'), updateEnquiryStatus);
router.put('/:id/status', protect, authorize('admin'), updateEnquiryStatus);

module.exports = router;
