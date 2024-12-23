const { Kelas, Departemen, Dosen, Presensi, JadwalKuliah } = require('../models'); // Mengimpor model

// Fungsi untuk melihat semua kelas
exports.getAllClasses = async (req, res) => {
  try {
    if (!req.admin || !req.admin.departemen_id) {
      return res.status(401).json({ 
        message: 'Unauthorized: Admin departemen ID tidak ditemukan' 
      });
    }

    const departemen_id = req.admin.departemen_id;

    const classes = await Kelas.findAll({
      include: [
        {
          model: Departemen,
          attributes: ['nama_departemen'],
          where : { departemen_id },
          required: true
        },
        {
          model: Dosen,
          attributes: ['nama_dosen', 'email'],
        },
      ],
    });
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data kelas', error: error.message });
  }
};

// Fungsi untuk melihat kelas berdasarkan ID
exports.getClassById = async (req, res) => {
  try {
    const { id } = req.params;
    const singleClass = await Kelas.findByPk(id, {
      include: [
        {
          model: Departemen,
          attributes: ['nama_departemen'],
        },
        {
          model: Dosen,
          attributes: ['nama_dosen', 'email'],
        },
      ],
    });

    if (!singleClass) {
      return res.status(404).json({ message: 'Kelas tidak ditemukan' });
    }
    res.status(200).json(singleClass);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data kelas', error: error.message });
  }
};

// Fungsi untuk menambah kelas baru
exports.createClass = async (req, res) => {
  try {
    const { kode_kelas, nip, nama_kelas, jumlah_sks, semester } = req.body;

    if (!kode_kelas || !nip || !nama_kelas || !jumlah_sks || !semester) {
      return res.status(400).json({ message: 'Semua field wajib diisi' });
    }

    // Ambil departemen_id dari admin yang sedang login
    const departemen_id = req.admin.departemen_id;
    if (!departemen_id) {
      return res.status(401).json({ message: 'Unauthorized: Admin departemen ID tidak ditemukan' });
    }

    // Cek apakah kode kelas sudah ada
    const existingClass = await Kelas.findOne({ where: { kode_kelas } });
    if (existingClass) {
      return res.status(400).json({ message: 'Kode kelas sudah digunakan' });
    }

    const newClass = await Kelas.create({
      kode_kelas,
      departemen_id,
      nip,
      nama_kelas,
      jumlah_sks,
      semester,
    });

    res.status(201).json({ message: 'Kelas berhasil ditambahkan', data: newClass });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menambahkan kelas', error: error.message });
  }
};

// Fungsi untuk mengedit kelas berdasarkan ID
exports.updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const { kode_kelas, nip, nama_kelas, jumlah_sks, semester } = req.body;

    const classToUpdate = await Kelas.findByPk(id);

    if (!classToUpdate) {
      return res.status(404).json({ message: 'Kelas tidak ditemukan' });
    }

    // Ambil departemen_id dari admin yang sedang login
    const departemen_id = req.admin.departemen_id;
    if (!departemen_id) {
      return res.status(401).json({ message: 'Unauthorized: Admin departemen ID tidak ditemukan' });
    }

    await classToUpdate.update({ kode_kelas, departemen_id, nip, nama_kelas, jumlah_sks, semester });
    res.status(200).json({ message: 'Kelas berhasil diperbarui', data: classToUpdate });
  } catch (error) {
    res.status(500).json({ message: 'Gagal memperbarui kelas', error: error.message });
  }
};

// Fungsi untuk menghapus kelas berdasarkan ID
exports.deleteClass = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the class by ID
    const classToDelete = await Kelas.findByPk(id);

    if (!classToDelete) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // Delete the class
    await classToDelete.destroy();
    res.status(200).json({ message: 'Class successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete class', error: error.message });
  }
};

exports.getAllPresensiByDepartemen = async (req, res) => {
  try {
      if (!req.admin || !req.admin.departemen_id) {
          return res.status(401).json({ 
              message: 'Unauthorized: Admin departemen ID tidak ditemukan' 
          });
      }

      const departemen_id = req.admin.departemen_id;

      const presensiData = await Presensi.findAll({
          include: [
              {
                  model: JadwalKuliah,
                  attributes: ['jadwal_kuliah_id', 'hari', 'jam_mulai'],
                  include: [
                      {
                          model: Kelas,
                          attributes: ['kode_kelas', 'nama_kelas'],
                          include: [
                              {
                                  model: Departemen,
                                  attributes: ['nama_departemen'],
                                  where: { departemen_id },
                              },
                          ],
                      },
                  ],
              },
          ],
      });

      if (presensiData.length === 0) {
          return res.status(404).json({ message: 'Data presensi tidak ditemukan untuk departemen ini' });
      }

      res.status(200).json(presensiData);
  } catch (error) {
      console.error(error);
      res.status(500).json({ 
          message: 'Gagal mengambil data presensi', 
          error: error.message,
      });
  }
};
