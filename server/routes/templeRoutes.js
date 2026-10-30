const express = require('express');
const router = express.Router();
const {
  getTemples,
  getTempleById,
  createTemple,
  updateTemple,
  updateTempleStatus,
  deleteTemple
} = require('../controllers/templeController');
const {
  getDarshanTypesByTemple,
  createDarshanType
} = require('../controllers/darshanTypeController');
const { getTempleSlots } = require('../controllers/slotController');
const { protect, authorize, optionalProtect } = require('../middleware/auth');

// Public routes
router.get('/', optionalProtect, getTemples);
router.get('/:id', getTempleById);
router.get('/:templeId/darshan-types', getDarshanTypesByTemple);
router.get('/:id/slots', getTempleSlots);

// Admin-only routes
router.post('/', protect, authorize('admin'), createTemple);
router.put('/:id', protect, authorize('admin'), updateTemple);
router.patch('/:id/status', protect, authorize('admin'), updateTempleStatus);
router.delete('/:id', protect, authorize('admin'), deleteTemple);
router.post('/:templeId/darshan-types', protect, authorize('admin'), createDarshanType);

module.exports = router;

