const express = require('express');
const { getAllLecturersByAdminDepartemen } = require('../controllers/lecturerController');
const {
    login,
    refreshToken,
    authenticate,
  } = require("../controllers/authController");

const router = express.Router();

// Route to get lecturers by NIP and Departemen ID
router.get('/lecturers', authenticate, getAllLecturersByAdminDepartemen);

module.exports = router;