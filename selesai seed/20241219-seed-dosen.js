const { Dosen } = require('../models');  // Ensure the path to your model is correct

// Helper function to generate a random 10-digit NIP
function generateNIP() {
  let nip = '';
  for (let i = 0; i < 10; i++) {
    nip += Math.floor(Math.random() * 10);  // Generates a random digit
  }
  return nip;
}

module.exports = {
  up: async () => {
    // Dummy data for 3 departments (Departemen A, B, C) with 5 records each
    const dosenData = [
      {
        nip: generateNIP(),
        departemen_id: 1,  // Departemen A
        nama_dosen: 'Dr. Agus Santoso',
        email: 'agus.santoso@unand.ac.id',
        no_telp: '081234567890',
        alamat: 'Jl. Merdeka No. 12, Padang',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nip: generateNIP(),
        departemen_id: 1,
        nama_dosen: 'Dr. Ani Suryani',
        email: 'ani.suryani@unand.ac.id',
        no_telp: '081234567891',
        alamat: 'Jl. Pemuda No. 5, Padang',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nip: generateNIP(),
        departemen_id: 1,
        nama_dosen: 'Dr. Budi Prasetyo',
        email: 'budi.prasetyo@unand.ac.id',
        no_telp: '081234567892',
        alamat: 'Jl. Raya No. 22, Padang',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nip: generateNIP(),
        departemen_id: 1,
        nama_dosen: 'Dr. Chandra Widodo',
        email: 'chandra.widodo@unand.ac.id',
        no_telp: '081234567893',
        alamat: 'Jl. Sukses No. 7, Padang',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nip: generateNIP(),
        departemen_id: 1,
        nama_dosen: 'Dr. Dewi Rahayu',
        email: 'dewi.rahayu@unand.ac.id',
        no_telp: '081234567894',
        alamat: 'Jl. Pendidikan No. 3, Padang',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nip: generateNIP(),
        departemen_id: 2,  // Departemen B
        nama_dosen: 'Prof. Eko Pramono',
        email: 'eko.pramono@unand.ac.id',
        no_telp: '081234567895',
        alamat: 'Jl. Sejahtera No. 10, Padang',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nip: generateNIP(),
        departemen_id: 2,
        nama_dosen: 'Prof. Fanny Lestari',
        email: 'fanny.lestari@unand.ac.id',
        no_telp: '081234567896',
        alamat: 'Jl. Alam No. 4, Padang',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nip: generateNIP(),
        departemen_id: 2,
        nama_dosen: 'Prof. Gita Sari',
        email: 'gita.sari@unand.ac.id',
        no_telp: '081234567897',
        alamat: 'Jl. Damai No. 6, Padang',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nip: generateNIP(),
        departemen_id: 2,
        nama_dosen: 'Prof. Hendra Wijaya',
        email: 'hendra.wijaya@unand.ac.id',
        no_telp: '081234567898',
        alamat: 'Jl. Bukit No. 9, Padang',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nip: generateNIP(),
        departemen_id: 2,
        nama_dosen: 'Prof. Irma Setiawati',
        email: 'irma.setiawati@unand.ac.id',
        no_telp: '081234567899',
        alamat: 'Jl. Karya No. 15, Padang',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nip: generateNIP(),
        departemen_id: 3,  // Departemen C
        nama_dosen: 'Dr. Joko Santoso',
        email: 'joko.santoso@unand.ac.id',
        no_telp: '081234567900',
        alamat: 'Jl. Raya No. 18, Padang',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nip: generateNIP(),
        departemen_id: 3,
        nama_dosen: 'Dr. Lila Rahmawati',
        email: 'lila.rahmawati@unand.ac.id',
        no_telp: '081234567901',
        alamat: 'Jl. Mutiara No. 8, Padang',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nip: generateNIP(),
        departemen_id: 3,
        nama_dosen: 'Dr. M. Yusuf',
        email: 'yusuf.m@unand.ac.id',
        no_telp: '081234567902',
        alamat: 'Jl. Persahabatan No. 20, Padang',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nip: generateNIP(),
        departemen_id: 3,
        nama_dosen: 'Dr. Nita Pramudya',
        email: 'nita.pramudya@unand.ac.id',
        no_telp: '081234567903',
        alamat: 'Jl. Anggrek No. 12, Padang',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nip: generateNIP(),
        departemen_id: 3,
        nama_dosen: 'Dr. Oscar Satria',
        email: 'oscar.satria@unand.ac.id',
        no_telp: '081234567904',
        alamat: 'Jl. Melati No. 2, Padang',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ];

    // Bulk create dosen data
    await Dosen.bulkCreate(dosenData);

    console.log('Dosen data with NIP seeded successfully!');
  },

  down: async () => {
    // If you need to remove the seeded data
    await Dosen.destroy({ where: {}, truncate: true });
    console.log('Dosen data removed successfully!');
  }
};
