const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const { registerValidator, loginValidator } = require('../validators/auth');
const { protect } = require('../middleware/auth');

router.post('/register', registerValidator, registerUser);
router.post('/login', loginValidator, loginUser);
router.get('/profile', protect, getUserProfile);

module.exports = router;
