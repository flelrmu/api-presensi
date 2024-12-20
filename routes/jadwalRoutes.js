const express = require('express');
const router = express.Router();
const jadwalListController = require('../controllers/JadwalKuliahController');

// Rute untuk melihat semua jadwal kuliah
router.get('/jadwal', jadwalListController.getAllJadwal);

// Rute untuk melihat jadwal kuliah berdasarkan ID
router.get('/jadwal/:id', jadwalListController.getJadwalById);

// Rute untuk menambah jadwal kuliah baru
router.post('/jadwal', (req, res, next) => {
    console.log('POST /jadwal called with data:', req.body); // Logging request body
    next();
  }, jadwalListController.createJadwal);

// Rute untuk memperbarui jadwal kuliah berdasarkan ID
router.put('/jadwal/:id', jadwalListController.updateJadwal);

// Rute untuk menghapus jadwal kuliah berdasarkan ID
router.delete('/jadwal/:id', jadwalListController.deleteJadwal);

module.exports = router;
