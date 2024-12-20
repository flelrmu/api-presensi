const { Kelas, Dosen, Departemen } = require('../models');  // Adjust paths to your models

module.exports = {
  up: async () => {
    // Dummy data for Kelas (class data)
    const kelasData = [
      // Departemen Sistem Informasi
      { kode_kelas: 'SI-101-A', departemen_id: 1, nip: '1719641514', nama_kelas: 'Algoritma Pemrograman - A', jumlah_sks: 3, semester: 'Semester 1', created_at: new Date(), updated_at: new Date() },
      { kode_kelas: 'SI-101-B', departemen_id: 1, nip: '1719641514', nama_kelas: 'Algoritma Pemrograman - B', jumlah_sks: 3, semester: 'Semester 1', created_at: new Date(), updated_at: new Date() },
      { kode_kelas: 'SI-102-A', departemen_id: 1, nip: '4617823882', nama_kelas: 'Struktur Data - A', jumlah_sks: 3, semester: 'Semester 2', created_at: new Date(), updated_at: new Date() },
      { kode_kelas: 'SI-102-B', departemen_id: 1, nip: '4617823882', nama_kelas: 'Struktur Data - B', jumlah_sks: 3, semester: 'Semester 2', created_at: new Date(), updated_at: new Date() },
      { kode_kelas: 'SI-103-A', departemen_id: 1, nip: '7500843806', nama_kelas: 'Basis Data - A', jumlah_sks: 3, semester: 'Semester 3', created_at: new Date(), updated_at: new Date() },
      

      // Departemen Informatika
      { kode_kelas: 'IF-201-A', departemen_id: 3, nip: '2122465481', nama_kelas: 'Pemrograman Web - A', jumlah_sks: 3, semester: 'Semester 1', created_at: new Date(), updated_at: new Date() },
      { kode_kelas: 'IF-201-B', departemen_id: 3, nip: '2122465481', nama_kelas: 'Pemrograman Web - B', jumlah_sks: 3, semester: 'Semester 1', created_at: new Date(), updated_at: new Date() },
      { kode_kelas: 'IF-202-A', departemen_id: 3, nip: '2853826782', nama_kelas: 'Pemrograman Mobile - A', jumlah_sks: 3, semester: 'Semester 2', created_at: new Date(), updated_at: new Date() },
      { kode_kelas: 'IF-202-B', departemen_id: 3, nip: '2853826782', nama_kelas: 'Pemrograman Mobile - B', jumlah_sks: 3, semester: 'Semester 2', created_at: new Date(), updated_at: new Date() },
      { kode_kelas: 'IF-203-A', departemen_id: 3, nip: '5213193751', nama_kelas: 'Kecerdasan Buatan - A', jumlah_sks: 3, semester: 'Semester 3', created_at: new Date(), updated_at: new Date() },
      

      // Departemen Teknik Komputer
      { kode_kelas: 'TK-301-A', departemen_id: 2, nip: '2195857706', nama_kelas: 'Rekayasa Perangkat Lunak - A', jumlah_sks: 3, semester: 'Semester 1', created_at: new Date(), updated_at: new Date() },
      { kode_kelas: 'TK-301-B', departemen_id: 2, nip: '2195857706', nama_kelas: 'Rekayasa Perangkat Lunak - B', jumlah_sks: 3, semester: 'Semester 1', created_at: new Date(), updated_at: new Date() },
      { kode_kelas: 'TK-302-A', departemen_id: 2, nip: '4691908439', nama_kelas: 'Sistem Embedded - A', jumlah_sks: 3, semester: 'Semester 2', created_at: new Date(), updated_at: new Date() },
      { kode_kelas: 'TK-302-B', departemen_id: 2, nip: '4691908439', nama_kelas: 'Sistem Embedded - B', jumlah_sks: 3, semester: 'Semester 2', created_at: new Date(), updated_at: new Date() },
      { kode_kelas: 'TK-303-A', departemen_id: 2, nip: '6977792095', nama_kelas: 'Sistem Digital - A', jumlah_sks: 3, semester: 'Semester 3', created_at: new Date(), updated_at: new Date() },
      
    ];

    // Bulk create kelas data
    await Kelas.bulkCreate(kelasData);

    console.log('Kelas data seeded successfully!');
  },

  down: async () => {
    // Remove seeded data
    await Kelas.destroy({ where: {}, truncate: true });
    console.log('Kelas data removed successfully!');
  }
};
