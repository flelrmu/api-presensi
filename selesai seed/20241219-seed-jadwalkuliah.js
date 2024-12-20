const { Kelas, Ruangan, JadwalKuliah } = require('../models');  // Adjust paths to your models

module.exports = {
  up: async () => {
    // Dummy data for jadwal kuliah
    const jadwalKuliahData = [
      // Jadwal untuk kelas Departemen Sistem Informasi
      { kode_kelas: 'SI-101-A', ruangan_id: 1, hari: 'Senin', jam_mulai: '07:30:00', created_at: new Date(), updated_at: new Date() },
      { kode_kelas: 'SI-101-B', ruangan_id: 2, hari: 'Senin', jam_mulai: '09:00:00', created_at: new Date(), updated_at: new Date() },
      { kode_kelas: 'SI-102-A', ruangan_id: 3, hari: 'Selasa', jam_mulai: '07:30:00', created_at: new Date(), updated_at: new Date() },
      { kode_kelas: 'SI-102-B', ruangan_id: 4, hari: 'Selasa', jam_mulai: '09:00:00', created_at: new Date(), updated_at: new Date() },
      { kode_kelas: 'SI-103-A', ruangan_id: 5, hari: 'Rabu', jam_mulai: '07:30:00', created_at: new Date(), updated_at: new Date() },
      
      // Jadwal untuk kelas Departemen Informatika
      { kode_kelas: 'IF-201-A', ruangan_id: 6, hari: 'Kamis', jam_mulai: '07:30:00', created_at: new Date(), updated_at: new Date() },
      { kode_kelas: 'IF-201-B', ruangan_id: 7, hari: 'Kamis', jam_mulai: '09:00:00', created_at: new Date(), updated_at: new Date() },
      { kode_kelas: 'IF-202-A', ruangan_id: 8, hari: 'Jumat', jam_mulai: '07:30:00', created_at: new Date(), updated_at: new Date() },
      { kode_kelas: 'IF-202-B', ruangan_id: 9, hari: 'Jumat', jam_mulai: '09:00:00', created_at: new Date(), updated_at: new Date() },
      { kode_kelas: 'IF-203-A', ruangan_id: 10, hari: 'Senin', jam_mulai: '10:30:00', created_at: new Date(), updated_at: new Date() },
      
      // Jadwal untuk kelas Departemen Teknik Komputer
      { kode_kelas: 'TK-301-A', ruangan_id: 11, hari: 'Selasa', jam_mulai: '07:30:00', created_at: new Date(), updated_at: new Date() },
      { kode_kelas: 'TK-301-B', ruangan_id: 12, hari: 'Selasa', jam_mulai: '09:00:00', created_at: new Date(), updated_at: new Date() },
      { kode_kelas: 'TK-302-A', ruangan_id: 13, hari: 'Rabu', jam_mulai: '07:30:00', created_at: new Date(), updated_at: new Date() },
      { kode_kelas: 'TK-302-B', ruangan_id: 14, hari: 'Rabu', jam_mulai: '09:00:00', created_at: new Date(), updated_at: new Date() },
      { kode_kelas: 'TK-303-A', ruangan_id: 15, hari: 'Kamis', jam_mulai: '07:30:00', created_at: new Date(), updated_at: new Date() },
    ];

    // Bulk create jadwal kuliah data
    await JadwalKuliah.bulkCreate(jadwalKuliahData);

    console.log('Jadwal kuliah data seeded successfully!');
  },

  down: async () => {
    // Remove seeded data
    await JadwalKuliah.destroy({ where: {}, truncate: true });
    console.log('Jadwal kuliah data removed successfully!');
  }
};
