const { JadwalKuliah, Kelas, Ruangan } = require('../models'); // Mengimpor model JadwalKuliah

// Fungsi untuk melihat semua jadwal kuliah
exports.getAllJadwal = async (req, res) => {
  try {
    const jadwal = await JadwalKuliah.findAll();


    const detailJadwal = await JadwalKuliah.findAll({
      include: [
        { model: Kelas },
        { model: Ruangan }
      ]
    });

    res.status(200).json({
      jadwal,
      detailJadwal
    });

    // res.status(200).json(detailJadwal);

    // console.log(JSON.stringify(detailJadwal, null, 2));
    
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data jadwal kuliah', error: error.message });
  }
};

// Fungsi untuk melihat jadwal kuliah berdasarkan ID
exports.getJadwalById = async (req, res) => {
  try {
    const { id } = req.params;
    const singleJadwal = await JadwalKuliah.findByPk(id, {
      include: [
        { model: Kelas },
        { model: Ruangan }
      ]
    });

    if (!singleJadwal) {
      return res.status(404).json({ message: 'Jadwal kuliah tidak ditemukan' });
    }
    res.status(200).json(singleJadwal);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data jadwal kuliah', error: error.message });
  }
};

// Fungsi untuk menambah jadwal kuliah baru
exports.createJadwal = async (req, res) => {
    try {
      const { kode_kelas, ruangan_id, hari, jam_mulai } = req.body;
  
      if (!kode_kelas || !ruangan_id || !hari || !jam_mulai) {
        return res.status(400).json({ message: "Semua field wajib diisi" });
      }
  
      // Cek apakah kode jadwal kuliah sudah ada
      const existingJadwal = await JadwalKuliah.findOne({ where: { kode_kelas } });
      if (existingJadwal) {
        return res.status(400).json({ message: "Jadwal kuliah sudah dibuat" });
      }

      // Cek jadwal bentrok di ruangan yang sama
      const conflictingSchedule = await JadwalKuliah.findOne({
        where: {
          ruangan_id: ruangan_id,
          hari: hari,
          jam_mulai: jam_mulai
        }
      });

      if (conflictingSchedule) {
        return res.status(400).json({ 
          message: "Jadwal bentrok! Ruangan sudah digunakan pada hari dan jam yang sama",
          conflicting_schedule: conflictingSchedule
        });
      }
  
      const newJadwal = await JadwalKuliah.create({
        kode_kelas,
        ruangan_id,
        hari,
        jam_mulai
      });
  
      res.status(201).json({ message: "Jadwal kuliah berhasil ditambahkan", data: newJadwal });
    } catch (error) {
      res.status(500).json({ message: "Gagal menambahkan jadwal kuliah", error: error.message });
    }
  };
  

// Fungsi untuk mengedit jadwal kuliah berdasarkan ID
exports.updateJadwal = async (req, res) => {
  try {
    const { id } = req.params;
    const { ruangan_id, hari, jam_mulai } = req.body;

    const jadwalToUpdate = await JadwalKuliah.findByPk(id);

    if (!jadwalToUpdate) {
      return res.status(404).json({ message: 'Jadwal kuliah tidak ditemukan' });
    }

    // Cek jadwal bentrok di ruangan yang sama
    const conflictingSchedule = await JadwalKuliah.findOne({
      where: {
        ruangan_id: ruangan_id,
        hari: hari,
        jam_mulai: jam_mulai
      }
    });

    if (conflictingSchedule) {
      return res.status(400).json({ 
        message: "Jadwal bentrok! Ruangan sudah digunakan pada hari dan jam yang sama",
        conflicting_schedule: conflictingSchedule
      });
    }

    await jadwalToUpdate.update({ ruangan_id, hari, jam_mulai });
    res.status(200).json({ message: 'Jadwal kuliah berhasil diperbarui', data: jadwalToUpdate });
  } catch (error) {
    res.status(500).json({ message: 'Gagal memperbarui jadwal kuliah', error: error.message });
  }
};

// Fungsi untuk menghapus jadwal kuliah berdasarkan ID
exports.deleteJadwal = async (req, res) => {
  try {
    const { id } = req.params;

    const jadwalToDelete = await JadwalKuliah.findByPk(id);

    if (!jadwalToDelete) {
      return res.status(404).json({ message: 'Jadwal kuliah tidak ditemukan' });
    }

    await jadwalToDelete.destroy();
    res.status(200).json({ message: 'Jadwal kuliah berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus jadwal kuliah', error: error.message });
  }
};
