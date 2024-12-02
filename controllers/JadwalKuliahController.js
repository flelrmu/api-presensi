const JadwalKuliah = require('../models/JadwalKuliah'); // Mengimpor model JadwalKuliah

// Fungsi untuk melihat semua jadwal kuliah
exports.getAllJadwal = async (req, res) => {
  try {
    const jadwal = await JadwalKuliah.findAll();
    res.status(200).json(jadwal);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data jadwal kuliah', error: error.message });
  }
};

// Fungsi untuk melihat jadwal kuliah berdasarkan ID
exports.getJadwalById = async (req, res) => {
  try {
    const { id } = req.params;
    const singleJadwal = await JadwalKuliah.findByPk(id);

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
      const { class_name, class_code, lecturer } = req.body;
  
      if (!class_name || !class_code || !lecturer) {
        return res.status(400).json({ message: "Semua field wajib diisi" });
      }
  
      // Cek apakah kode jadwal kuliah sudah ada
      const existingJadwal = await JadwalKuliah.findOne({ where: { class_code } });
      if (existingJadwal) {
        return res.status(400).json({ message: "Kode jadwal kuliah sudah digunakan" });
      }
  
      const newJadwal = await JadwalKuliah.create({
        class_name,
        class_code,
        lecturer,
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
    const { class_name, class_code, lecturer } = req.body;

    const jadwalToUpdate = await JadwalKuliah.findByPk(id);

    if (!jadwalToUpdate) {
      return res.status(404).json({ message: 'Jadwal kuliah tidak ditemukan' });
    }

    await jadwalToUpdate.update({ class_name, class_code, lecturer });
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
