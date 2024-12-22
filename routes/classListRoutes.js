const express = require('express');
const router = express.Router();
const {
  login,
  refreshToken,
  authenticate,
} = require("../controllers/authController");
const classListController = require('../controllers/ClassListController');

// Rute untuk melihat semua kelas
router.get('/classes', authenticate, classListController.getAllClasses);

// Rute untuk melihat kelas berdasarkan ID
router.get('/classes/:id', authenticate, classListController.getClassById);

// Rute untuk menambah kelas baru
router.post('/classes', authenticate, (req, res, next) => {
    console.log('POST /classes called with data:', req.body); // Logging request body
    next();
  }, classListController.createClass);

// Rute untuk memperbarui kelas berdasarkan ID
router.put('/classes/:id', authenticate, classListController.updateClass);

// Rute untuk menghapus kelas berdasarkan ID
router.delete('/classes/:id', authenticate, classListController.deleteClass);

module.exports = router;
