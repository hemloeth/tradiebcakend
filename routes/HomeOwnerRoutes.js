const {HomeOwnerController,HomeOwnerLogin} = require('../controllers/HomeOwnerController');
const express = require('express');
const router = express.Router();

// Route to handle HomeOwner registration
router.post('/register', HomeOwnerController);
// Route to handle HomeOwner login
router.post('/login', HomeOwnerLogin);
module.exports = router;