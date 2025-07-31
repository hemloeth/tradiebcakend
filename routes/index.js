const express = require('express');
const router = express.Router();
const HomeOwnerRoutes = require('./HomeOwnerRoutes');
const TradieRoutes = require('./TradieRoutes');


router.use('/homeowner', HomeOwnerRoutes);
router.use('/tradie', TradieRoutes);

module.exports = router;