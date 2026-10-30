const express = require('express');
const router = express.Router();
const { getSlotAvailability } = require('../controllers/slotController');

router.get('/availability', getSlotAvailability);

module.exports = router;
