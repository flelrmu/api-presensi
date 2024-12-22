const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const classListRoutes = require('./routes/classListRoutes');
const lecturerRoutes = require('./routes/lecturerRoutes');
const jadwalRouter = require('./routes/jadwalRoutes');

const app = express();

// Middleware untuk parsing JSON
app.use(bodyParser.json());

// Menambahkan route untuk autentikasi
app.use('/api/auth', authRoutes);

// Menggunakan rute kelas
app.use('/api', classListRoutes);

app.use('/api', lecturerRoutes)

// Menggunakan rute jadwal kuliah
app.use('/api', jadwalRouter);

// Middleware untuk menangani error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Menjalankan server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
