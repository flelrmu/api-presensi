const express = require('express');
const router = express.Router();
const lecturerListController = require('../controllers/LecturerListController');

// Rute untuk melihat semua kelas
router.get('/classes', classListController.getAllClasses);

// Rute untuk melihat kelas berdasarkan ID
router.get('/classes/:id', classListController.getClassById);

// Rute untuk menambah kelas baru
router.post('/classes', (req, res, next) => {
    console.log('POST /classes called with data:', req.body); // Logging request body
    next();
  }, classListController.createClass);

// Rute untuk memperbarui kelas berdasarkan ID
router.put('/classes/:id', classListController.updateClass);

// Rute untuk menghapus kelas berdasarkan ID
router.delete('/classes/:id', classListController.deleteClass);

module.exports = router;
