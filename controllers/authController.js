const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Admin } = require('../models'); // Pastikan jalur model benar

// Membuat Refresh Token
const createRefreshToken = (adminId) => {
  return jwt.sign({ adminId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Login Controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cari admin berdasarkan email
    const admin = await Admin.findOne({ where: { email } });

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
        departemen_id: admin.departemen_id,
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
