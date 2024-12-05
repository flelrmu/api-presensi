const express = require('express');
const router = express.Router();
const { login, refreshToken } = require('../controllers/authController');

// Route untuk login
router.post('/login', login);

// Route untuk refresh token
router.post('/refresh-token', refreshToken);

module.exports = router;
