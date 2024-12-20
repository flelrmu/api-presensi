const { JadwalKuliah, Presensi } = require('../models');  // Adjust paths to your models

module.exports = {
  up: async () => {
    // Dummy data for presensi (attendance data) for each jadwal_kuliah
    const presensiData = [
      // Jadwal untuk kelas Departemen Sistem Informasi
      { jadwal_kuliah_id: 1, pertemuan: 1, jml_hadir: 30, jml_alpha: 5, jml_izin: 0, jml_sakit: 0 },
      { jadwal_kuliah_id: 1, pertemuan: 2, jml_hadir: 32, jml_alpha: 3, jml_izin: 0, jml_sakit: 0 },
      { jadwal_kuliah_id: 1, pertemuan: 3, jml_hadir: 28, jml_alpha: 7, jml_izin: 0, jml_sakit: 0 },
      { jadwal_kuliah_id: 1, pertemuan: 4, jml_hadir: 33, jml_alpha: 2, jml_izin: 0, jml_sakit: 0 },
      { jadwal_kuliah_id: 1, pertemuan: 5, jml_hadir: 29, jml_alpha: 6, jml_izin: 0, jml_sakit: 0 },
      { jadwal_kuliah_id: 1, pertemuan: 6, jml_hadir: 31, jml_alpha: 4, jml_izin: 0, jml_sakit: 0 },
      { jadwal_kuliah_id: 1, pertemuan: 7, jml_hadir: 34, jml_alpha: 1, jml_izin: 0, jml_sakit: 0 },
      { jadwal_kuliah_id: 1, pertemuan: 8, jml_hadir: 30, jml_alpha: 5, jml_izin: 0, jml_sakit: 0 },

      // Jadwal untuk kelas Departemen Informatika
      { jadwal_kuliah_id: 2, pertemuan: 1, jml_hadir: 33, jml_alpha: 2, jml_izin: 0, jml_sakit: 0 },
      { jadwal_kuliah_id: 2, pertemuan: 2, jml_hadir: 30, jml_alpha: 5, jml_izin: 0, jml_sakit: 0 },
      { jadwal_kuliah_id: 2, pertemuan: 3, jml_hadir: 28, jml_alpha: 7, jml_izin: 0, jml_sakit: 0 },
      { jadwal_kuliah_id: 2, pertemuan: 4, jml_hadir: 32, jml_alpha: 3, jml_izin: 0, jml_sakit: 0 },
      { jadwal_kuliah_id: 2, pertemuan: 5, jml_hadir: 29, jml_alpha: 6, jml_izin: 0, jml_sakit: 0 },
      { jadwal_kuliah_id: 2, pertemuan: 6, jml_hadir: 35, jml_alpha: 0, jml_izin: 0, jml_sakit: 0 },
      { jadwal_kuliah_id: 2, pertemuan: 7, jml_hadir: 34, jml_alpha: 1, jml_izin: 0, jml_sakit: 0 },
      { jadwal_kuliah_id: 2, pertemuan: 8, jml_hadir: 33, jml_alpha: 2, jml_izin: 0, jml_sakit: 0 },

      // Jadwal untuk kelas Departemen Teknik Komputer
      { jadwal_kuliah_id: 3, pertemuan: 1, jml_hadir: 30, jml_alpha: 5, jml_izin: 0, jml_sakit: 0 },
      { jadwal_kuliah_id: 3, pertemuan: 2, jml_hadir: 32, jml_alpha: 3, jml_izin: 0, jml_sakit: 0 },
      { jadwal_kuliah_id: 3, pertemuan: 3, jml_hadir: 28, jml_alpha: 7, jml_izin: 0, jml_sakit: 0 },
      { jadwal_kuliah_id: 3, pertemuan: 4, jml_hadir: 33, jml_alpha: 2, jml_izin: 0, jml_sakit: 0 },
      { jadwal_kuliah_id: 3, pertemuan: 5, jml_hadir: 31, jml_alpha: 4, jml_izin: 0, jml_sakit: 0 },
      { jadwal_kuliah_id: 3, pertemuan: 6, jml_hadir: 29, jml_alpha: 6, jml_izin: 0, jml_sakit: 0 },
      { jadwal_kuliah_id: 3, pertemuan: 7, jml_hadir: 30, jml_alpha: 5, jml_izin: 0, jml_sakit: 0 },
      { jadwal_kuliah_id: 3, pertemuan: 8, jml_hadir: 32, jml_alpha: 3, jml_izin: 0, jml_sakit: 0 },

      // Jadwal untuk kelas Departemen Sistem Informasi
      { jadwal_kuliah_id: 4, pertemuan: 1, jml_hadir: 30, jml_alpha: 5, jml_izin: 0, jml_sakit: 0 },
      { jadwal_kuliah_id: 4, pertemuan: 2, jml_hadir: 32, jml_alpha: 3, jml_izin: 0, jml_sakit: 0 },
      { jadwal_kuliah_id: 4, pertemuan: 3, jml_hadir: 28, jml_alpha: 7, jml_izin: 0, jml_sakit: 0 },
      { jadwal_kuliah_id: 4, pertemuan: 4, jml_hadir: 33, jml_alpha: 2, jml_izin: 0, jml_sakit: 0 },
      { jadwal_kuliah_id: 4, pertemuan: 5, jml_hadir: 29, jml_alpha: 6, jml_izin: 0, jml_sakit: 0 },
      { jadwal_kuliah_id: 4, pertemuan: 6, jml_hadir: 31, jml_alpha: 4, jml_izin: 0, jml_sakit: 0 },
      { jadwal_kuliah_id: 4, pertemuan: 7, jml_hadir: 34, jml_alpha: 1, jml_izin: 0, jml_sakit: 0 },
      { jadwal_kuliah_id: 4, pertemuan: 8, jml_hadir: 30, jml_alpha: 5, jml_izin: 0, jml_sakit: 0 },

      // Jadwal untuk kelas Departemen Informatika
      { jadwal_kuliah_id: 5, pertemuan: 1, jml_hadir: 33, jml_alpha: 2, jml_izin: 0, jml_sakit: 0 },
      { jadwal_kuliah_id: 5, pertemuan: 2, jml_hadir: 30, jml_alpha: 5, jml_izin: 0, jml_sakit: 0 },
      { jadwal_kuliah_id: 5, pertemuan: 3, jml_hadir: 28, jml_alpha: 7, jml_izin: 0, jml_sakit: 0 },
      { jadwal_kuliah_id: 5, pertemuan: 4, jml_hadir: 32, jml_alpha: 3, jml_izin: 0, jml_sakit: 0 },
      { jadwal_kuliah_id: 5, pertemuan: 5, jml_hadir: 29, jml_alpha: 6, jml_izin: 0, jml_sakit: 0 },
      { jadwal_kuliah_id: 5, pertemuan: 6, jml_hadir: 35, jml_alpha: 0, jml_izin: 0, jml_sakit: 0 },
      { jadwal_kuliah_id: 5, pertemuan: 7, jml_hadir: 34, jml_alpha: 1, jml_izin: 0, jml_sakit: 0 },
      { jadwal_kuliah_id: 5, pertemuan: 8, jml_hadir: 33, jml_alpha: 2, jml_izin: 0, jml_sakit: 0 },


      // Additional JadwalKuliah data can follow the same structure
    ];

    // Bulk create presensi data
    await Presensi.bulkCreate(presensiData, {
        validate: true,  // Enable validation
      });

    console.log('Presensi data seeded successfully!');
  },

  down: async () => {
    // Remove seeded data
    await Presensi.destroy({ where: {}, truncate: true });
    console.log('Presensi data removed successfully!');
  }
};
