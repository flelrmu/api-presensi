const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Admin, Departemen } = require('../models');
const fs = require('fs').promises;;
const path = require('path');
const sharp = require('sharp');

// Membuat Refresh Token
const createRefreshToken = (adminId) => {
  return jwt.sign({ adminId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Login Controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cari admin berdasarkan email
    const admin = await Admin.findOne({ 
      where: { email },
      include: [
        { model: Departemen}
      ] 
    });

    if (!admin) {
      return res.status(404).json({ message: 'Email tidak ditemukan' });
    }

    // Bandingkan password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Password salah' });
    }

    // Buat access token
    const accessToken = jwt.sign(
      {
        id: admin.admin_id,
        email: admin.email,
        nama: admin.nama,
        departemen_id: admin.departemen_id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Buat refresh token
    const refreshToken = createRefreshToken(admin.admin_id);

    // Simpan refresh token ke database
    admin.refresh_token = refreshToken;
    await admin.save();

    res.json({
      message: 'Login berhasil',
      accessToken,
      refreshToken,
      admin: {
        id: admin.admin_id,
        email: admin.email,
        nama: admin.nama,
        foto_profile: admin.foto_profile,
        departemen_id: admin.Departemen.departemen_id,
        nama_departemen: admin.Departemen.nama_departemen,
        fakultas: admin.Departemen.fakultas
      },
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

// Refresh Token Controller
exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token diperlukan' });
  }

  try {
    // Cari admin berdasarkan refresh token
    const admin = await Admin.findOne({ where: { refresh_token: refreshToken } });

    if (!admin) {
      return res.status(403).json({ message: 'Refresh token tidak valid' });
    }

    // Verifikasi refresh token
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error('Invalid refresh token:', err);
        return res.status(403).json({ message: 'Refresh token tidak valid' });
      }

      // Buat access token baru
      const newAccessToken = jwt.sign(
        {
          id: admin.admin_id,
          email: admin.email,
          nama: admin.nama,
          departemen_id: admin.departemen_id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({ accessToken: newAccessToken });
    });
  } catch (err) {
    console.error('Error during refresh token:', err);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

// Edit Profile Controller
exports.editProfile = async (req, res) => {
  const { nama, email, departemen_id } = req.body;
  const adminId = req.admin.admin_id; // Asumsikan admin ID diambil dari token

  try {
    // Cari admin berdasarkan ID
    const admin = await Admin.findByPk(adminId);

    if (!admin) {
      return res.status(404).json({ message: 'Admin tidak ditemukan' });
    }

    // Perbarui data admin
    admin.nama = nama || admin.nama;
    admin.email = email || admin.email;
    admin.departemen_id = departemen_id || admin.departemen_id;

    // Proses foto profil jika ada file di-upload
    if (req.file) {
      // Generate nama file baru dengan timestamp
      const timestamp = Date.now();
      const newFilename = `profile_${timestamp}.jpg`;
      const uploadPath = path.join(__dirname, '..', 'uploads');
      const newFilePath = path.join(uploadPath, newFilename);

      // Konversi gambar ke JPG dan simpan
      await sharp(req.file.path)
        .jpeg({ quality: 90 }) // kualitas 90%
        .toFile(newFilePath);

      // Tunggu sebentar sebelum menghapus file
      await new Promise(resolve => setTimeout(resolve, 100));

      // Hapus foto profile lama jika ada
      if (admin.foto_profile) {
        const oldFilePath = path.join(uploadPath, admin.foto_profile);
        try {
          const exists = await fs.access(oldFilePath)
            .then(() => true)
            .catch(() => false);
          
          if (exists) {
            await fs.unlink(oldFilePath);
          }
        } catch (oldFileError) {
          console.warn('Warning: Could not delete old profile photo:', oldFileError.message);
          // Lanjutkan eksekusi meskipun file lama tidak bisa dihapus
        }
      }

      // Update nama file di database
      admin.foto_profile = newFilename;
    }

    await admin.save();

    res.json({ message: 'Profile berhasil diperbarui', admin });
  } catch (err) {
    console.error('Error during profile update:', err);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

// Change Password Controller
exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const adminId = req.admin.admin_id; // Asumsikan admin ID diambil dari token

  try {
    // Cari admin berdasarkan ID
    const admin = await Admin.findByPk(adminId);

    if (!admin) {
      return res.status(404).json({ message: 'Admin tidak ditemukan' });
    }

    // Periksa password saat ini
    const isMatch = await bcrypt.compare(currentPassword, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Password saat ini salah' });
    }

    // Hash password baru
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;

    await admin.save();

    res.json({ message: 'Password berhasil diubah' });
  } catch (err) {
    console.error('Error during password change:', err);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

exports.authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Akses ditolak. Token tidak ditemukan.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findByPk(decoded.id);

    if (!admin) {
      return res.status(404).json({ message: 'Admin tidak ditemukan' });
    }

    req.admin = admin; // Simpan admin di request untuk digunakan di controller
    next();
  } catch (err) {
    console.error('Error during authentication:', err);
    res.status(401).json({ message: 'Token tidak valid.' });
  }
};


// Logout Controller
exports.logout = async (req, res) => {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    return res.status(400).json({ message: 'Refresh token diperlukan' });
  }

  try {
    // Cari admin berdasarkan refresh token
    const admin = await Admin.findOne({ where: { refresh_token: refresh_token } });

    if (!admin) {
      return res.status(403).json({ message: 'Refresh token tidak valid' });
    }

    // Hapus refresh token di database
    admin.refresh_token = null;
    await admin.save();

    res.status(200).json({ message: 'Logout berhasil' });
  } catch (err) {
    console.error('Error during logout:', err);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};


exports.getDepartemen = async (req, res) => {
  try {
    const departemen = await Departemen.findAll()

    res.status(200).json(departemen);

  } catch (error) {
    res.status(500).json({ 
      message: 'Gagal mengambil data departemen', 
      error: error.message 
    });
  }
}