const express = require('express');
const { registerUser, loginUser, getUserInfo } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/user/info', authMiddleware, getUserInfo);

module.exports = router;
