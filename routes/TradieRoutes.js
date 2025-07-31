const {TradieRegistration,TradieLogin} = require('../controllers/TradieController');
const express = require('express');
const router = express.Router();

// Route to handle Tradie registration
router.post('/register', TradieRegistration);
// Route to handle Tradie login
router.post('/login', TradieLogin);
// Route to get Tradie profile
// router.get('/profile', TradieController.getTradieProfile);
// // Route to update Tradie profile
// router.put('/profile', TradieController.updateTradieProfile);
// // Route to delete Tradie account
// router.delete('/delete', TradieController.deleteTradieAccount);
module.exports = router;