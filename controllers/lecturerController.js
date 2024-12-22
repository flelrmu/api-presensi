const { Dosen, Departemen } = require('../models'); // Mengimpor model

// Fungsi untuk mendapatkan semua nama dosen berdasarkan admin departemen
exports.getAllLecturersByAdminDepartemen = async (req, res) => {
  try {
    if (!req.admin || !req.admin.departemen_id) {
      return res.status(401).json({ 
        message: 'Unauthorized: Admin departemen ID tidak ditemukan' 
      });
    }

    const departemen_id = req.admin.departemen_id;

    const lecturers = await Dosen.findAll({
      attributes: ['nama_dosen', 'email'],
      include: [
        {
          model: Departemen,
          attributes: ['nama_departemen'],
          where: { departemen_id },
          required: true,
        },
      ],
    });

    res.status(200).json(lecturers);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data dosen', error: error.message });
  }
};
