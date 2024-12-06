const express = require('express');
const router = express.Router();
const { login, refreshToken } = require('../controllers/authController');
const { validateLoginInput, handleValidation } = require('../middlewares/validationMiddleware');

// Login route
router.post('/login', validateLoginInput, handleValidation, login);

// Refresh token route
router.post('/refresh-token', refreshToken);

module.exports = router;
