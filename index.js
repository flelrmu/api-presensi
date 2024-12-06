const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes'); // Mengimpor route auth
const classListRoutes = require('./routes/classListRoutes');
const lecturerListRoutes = require('./routes/lecturerListRoutes');

const app = express();

// Middleware untuk parsing JSON
app.use(bodyParser.json());

// Menambahkan route untuk autentikasi
app.use('/api/auth', authRoutes);

// Menggunakan rute kelas
app.use('/api', classListRoutes);





// Menggunakan rute dosen
app.use('/api', lecturerListRoutes);


// Middleware untuk menangani error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Menjalankan server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
