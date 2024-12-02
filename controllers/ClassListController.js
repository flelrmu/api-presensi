const ClassList = require('../models/classList'); // Mengimpor model ClassList

// Fungsi untuk melihat semua kelas
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await ClassList.findAll();
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data kelas', error: error.message });
  }
};

// Fungsi untuk melihat kelas berdasarkan ID
exports.getClassById = async (req, res) => {
  try {
    const { id } = req.params;
    const singleClass = await ClassList.findByPk(id);

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
      const { class_name, class_code, lecturer } = req.body;
  
      if (!class_name || !class_code || !lecturer) {
        return res.status(400).json({ message: "Semua field wajib diisi" });
      }
  
      // Cek apakah kode kelas sudah ada
      const existingClass = await ClassList.findOne({ where: { class_code } });
      if (existingClass) {
        return res.status(400).json({ message: "Kode kelas sudah digunakan" });
      }
  
      const newClass = await ClassList.create({
        class_name,
        class_code,
        lecturer,
      });
  
      res.status(201).json({ message: "Kelas berhasil ditambahkan", data: newClass });
    } catch (error) {
      res.status(500).json({ message: "Gagal menambahkan kelas", error: error.message });
    }
  };
  

// Fungsi untuk mengedit kelas berdasarkan ID
exports.updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const { class_name, class_code, lecturer } = req.body;

    const classToUpdate = await ClassList.findByPk(id);

    if (!classToUpdate) {
      return res.status(404).json({ message: 'Kelas tidak ditemukan' });
    }

    await classToUpdate.update({ class_name, class_code, lecturer });
    res.status(200).json({ message: 'Kelas berhasil diperbarui', data: classToUpdate });
  } catch (error) {
    res.status(500).json({ message: 'Gagal memperbarui kelas', error: error.message });
  }
};

// Fungsi untuk menghapus kelas berdasarkan ID
exports.deleteClass = async (req, res) => {
  try {
    const { id } = req.params;

    const classToDelete = await ClassList.findByPk(id);

    if (!classToDelete) {
      return res.status(404).json({ message: 'Kelas tidak ditemukan' });
    }

    await classToDelete.destroy();
    res.status(200).json({ message: 'Kelas berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus kelas', error: error.message });
  }
};
