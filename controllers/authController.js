const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize'); // Import Op dari Sequelize
const User = require('../models/User');

// Fungsi untuk membuat refresh token
const createRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' }); // Refresh token berlaku 7 hari
};

exports.login = async (req, res) => {
  const { login, password } = req.body;

  try {
    // Cari user berdasarkan email atau nim
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: login }, { nim: login }],
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }

    // Bandingkan password dengan hash di database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Password salah' });
    }

    // Buat access token JWT jika password cocok
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        nim: user.nim,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Akses token berlaku 1 jam
    );

    // Buat refresh token
    const refreshToken = createRefreshToken(user.id);

    res.json({
      message: 'Login berhasil',
      token,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        nim: user.nim,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Error during login:', err); // Logging error
    res.status(500).json({ message: 'Terjadi kesalahan pada server', error: err.message });
  }
};

// Endpoint untuk refresh token
exports.refreshToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token diperlukan' });
  }

  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Invalid refresh token:', err); // Logging error
      return res.status(403).json({ message: 'Refresh token tidak valid' });
    }

    const newAccessToken = jwt.sign(
      {
        id: decoded.userId, // Menggunakan userId dari token refresh
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token: newAccessToken });
  });
};
