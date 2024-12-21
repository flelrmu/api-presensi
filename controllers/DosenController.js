const { Dosen, Departemen, Kelas } = require('../models');

// Fungsi untuk melihat semua dosen
exports.getAllDosen = async (req, res) => {
  try {
    const dosen = await Dosen.findAll({
      include: [
        {
          model: Departemen,
          attributes: ['nama_departemen']
        },
        {
          model: Kelas,
          attributes: ['nama_kelas', 'kode_kelas']
        }
      ]
    });
    res.status(200).json(dosen);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data dosen', error: error.message });
  }
};

// Fungsi untuk melihat dosen berdasarkan NIP
exports.getDosenByNip = async (req, res) => {
  try {
    const { nip } = req.params;
    const singleDosen = await Dosen.findByPk(nip, {
      include: [
        {
          model: Departemen,
          attributes: ['nama_departemen']
        },
        {
          model: Kelas,
          attributes: ['nama_kelas', 'kode_kelas']
        }
      ]
    });

    if (!singleDosen) {
      return res.status(404).json({ message: 'Dosen tidak ditemukan' });
    }
    res.status(200).json(singleDosen);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data dosen', error: error.message });
  }
};

// Fungsi untuk menambah dosen baru
exports.createDosen = async (req, res) => {
  try {
    const { nip, departemen_id, nama_dosen, email, no_telp, alamat } = req.body;

    if (!nip || !departemen_id || !nama_dosen || !email) {
      return res.status(400).json({ 
        message: "NIP, departemen, nama dosen, dan email wajib diisi" 
      });
    }

    // Cek apakah NIP sudah ada
    const existingDosen = await Dosen.findOne({ where: { nip } });
    if (existingDosen) {
      return res.status(400).json({ message: "NIP sudah terdaftar" });
    }

    // Cek apakah email sudah ada
    const existingEmail = await Dosen.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    // Cek format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Format email tidak valid" });
    }

    const newDosen = await Dosen.create({
      nip,
      departemen_id,
      nama_dosen,
      email,
      no_telp,
      alamat
    });

    res.status(201).json({
      message: "Dosen berhasil ditambahkan",
      data: newDosen
    });
  } catch (error) {
    res.status(500).json({ message: "Gagal menambahkan dosen", error: error.message });
  }
};

// Fungsi untuk mengedit dosen berdasarkan NIP
exports.updateDosen = async (req, res) => {
  try {
    const { nip } = req.params;
    const { departemen_id, nama_dosen, email, no_telp, alamat } = req.body;

    const dosenToUpdate = await Dosen.findByPk(nip);

    if (!dosenToUpdate) {
      return res.status(404).json({ message: 'Dosen tidak ditemukan' });
    }

    // Cek email unik jika email diubah
    if (email && email !== dosenToUpdate.email) {
      const existingEmail = await Dosen.findOne({ where: { email } });
      if (existingEmail) {
        return res.status(400).json({ message: "Email sudah terdaftar" });
      }

      // Cek format email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Format email tidak valid" });
      }
    }

    await dosenToUpdate.update({
      departemen_id,
      nama_dosen,
      email,
      no_telp,
      alamat
    });

    res.status(200).json({
      message: 'Data dosen berhasil diperbarui',
      data: dosenToUpdate
    });
  } catch (error) {
    res.status(500).json({ message: 'Gagal memperbarui data dosen', error: error.message });
  }
};

// Fungsi untuk menghapus dosen berdasarkan NIP
exports.deleteDosen = async (req, res) => {
  try {
    const { nip } = req.params;

    const dosenToDelete = await Dosen.findByPk(nip);

    if (!dosenToDelete) {
      return res.status(404).json({ message: 'Dosen tidak ditemukan' });
    }

    // Cek apakah dosen masih memiliki kelas
    const hasClasses = await Kelas.findOne({ where: { nip: nip } });
    if (hasClasses) {
      return res.status(400).json({ 
        message: 'Tidak dapat menghapus dosen yang masih memiliki kelas aktif'
      });
    }

    await dosenToDelete.destroy();
    res.status(200).json({ message: 'Data dosen berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus data dosen', error: error.message });
  }
};