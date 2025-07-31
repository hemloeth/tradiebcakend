const express = require('express');
const router = express.Router();
const HomeOwnerRoutes = require('./HomeOwnerRoutes');


router.use('/homeowner', HomeOwnerRoutes);

module.exports = router;