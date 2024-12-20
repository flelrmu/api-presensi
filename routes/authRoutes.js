const express = require('express');
const router = express.Router();
const { login, refreshToken } = require('../controllers/authController');
const { validateLoginInput, handleValidation } = require('../middlewares/validationMiddleware');

// Rute Login
router.post('/login', validateLoginInput, handleValidation, login);

// Rute Refresh Token
router.post('/refresh-token', refreshToken);

module.exports = router;
