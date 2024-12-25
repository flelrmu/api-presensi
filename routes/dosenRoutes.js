const express = require('express');
const router = express.Router();
const {
 authenticate,
} = require("../controllers/authController");
const dosenController = require('../controllers/DosenController');

// Rute untuk melihat semua dosen
router.get('/dosen', authenticate, dosenController.getAllDosen);

// Rute untuk melihat dosen berdasarkan NIP
router.get('/dosen/:nip', authenticate, dosenController.getDosenByNip);

// Rute untuk menambah dosen baru
router.post('/dosen', authenticate, (req, res, next) => {
   console.log('POST /dosen called with data:', req.body); // Logging request body
   next();
 }, dosenController.createDosen);

// Rute untuk memperbarui dosen berdasarkan NIP
router.put('/dosen/:nip', authenticate, dosenController.updateDosen);

// Rute untuk menghapus dosen berdasarkan NIP
router.delete('/dosen/:nip', authenticate, dosenController.deleteDosen);

module.exports = router;
