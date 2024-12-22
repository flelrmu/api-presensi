const express = require('express');
const router = express.Router();
const dosenController = require('../controllers/DosenController');

// Rute untuk melihat semua dosen
router.get('/dosen', dosenController.getAllDosen);

// Rute untuk melihat dosen berdasarkan NIP
router.get('/dosen/:nip', dosenController.getDosenByNip);

// Rute untuk menambah dosen baru
router.post('/dosen', (req, res, next) => {
    console.log('POST /dosen called with data:', req.body); // Logging request body
    next();
  }, dosenController.createDosen);

// Rute untuk memperbarui dosen berdasarkan NIP
router.put('/dosen/:nip', dosenController.updateDosen);

// Rute untuk menghapus dosen berdasarkan NIP
router.delete('/dosen/:nip', dosenController.deleteDosen);

module.exports = router;