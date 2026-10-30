const express = require('express');
const router = express.Router();
const {
  getAllDarshanTypes,
  updateDarshanType,
  updateDarshanTypeStatus,
  deleteDarshanType
} = require('../controllers/darshanTypeController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, authorize('admin'), getAllDarshanTypes);
router.put('/:id', protect, authorize('admin'), updateDarshanType);
router.patch('/:id/status', protect, authorize('admin'), updateDarshanTypeStatus);
router.delete('/:id', protect, authorize('admin'), deleteDarshanType);

module.exports = router;

