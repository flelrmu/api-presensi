const express = require('express');
const router = express.Router();
const { login, refreshToken } = require('../controllers/authController');

// Route untuk login
router.get('/login', login);

// Route untuk refresh token
router.post('/refresh-token', refreshToken);

module.exports = router;
