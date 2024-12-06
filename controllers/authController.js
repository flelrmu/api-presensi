const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cari user berdasarkan email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Email tidak terdaftar' });
    }

    // Bandingkan password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Password salah' });
    }

    // Buat access token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        departemen: user.departemen,
        fakultas: user.fakultas,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token berlaku 1 jam
    );

    // Buat refresh token
    const refreshToken = createRefreshToken(user.id);

    // Simpan refresh token ke database
    user.refresh_token = refreshToken;
    await user.save();

    res.json({
      message: 'Login berhasil',
      token,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        departemen: user.departemen,
        fakultas: user.fakultas,
      },
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token diperlukan' });
  }

  try {
    // Cari user berdasarkan refresh token
    const user = await User.findOne({ where: { refresh_token: refreshToken } });

    if (!user) {
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
          id: user.id,
          email: user.email,
          name: user.name,
          departemen: user.departemen,
          fakultas: user.fakultas,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({ token: newAccessToken });
    });
  } catch (err) {
    console.error('Error during refresh token:', err);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};
