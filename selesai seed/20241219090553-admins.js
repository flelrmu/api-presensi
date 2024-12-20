const bcrypt = require('bcryptjs');
const { Admin, Departemen } = require('../models'); // Ensure correct path to models

module.exports = {
  up: async () => {
    // Synchronize the models with the database, creating tables if they don't exist
    await Admin.sync(); // This will create the 'admin' table if it doesn't exist
    await Departemen.sync(); // Make sure the 'departemen' table exists

    // Find departemen by name to get their ids
    const departemenSI = await Departemen.findOne({ where: { nama_departemen: 'Sistem Informasi' } });
    const departemenTekom = await Departemen.findOne({ where: { nama_departemen: 'Teknik Komputer' } });
    const departemenInfo = await Departemen.findOne({ where: { nama_departemen: 'Informatika' } });

    if (!departemenSI || !departemenTekom || !departemenInfo) {
      console.log('One or more departemen not found, please ensure they are in the database.');
      return;
    }

    // Seed data for Admins
    await Admin.bulkCreate([
      {
        email: 'adminDsi@gmail.com',
        nama: 'Administrator Sistem Informasi',
        password: await bcrypt.hash('dsi123', 10),
        departemen_id: departemenSI.departemen_id,
        foto_profile: null,
        refresh_token: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: 'adminTekom@gmail.com',
        nama: 'Administrator Teknik Komputer',
        password: await bcrypt.hash('tekom123', 10),
        departemen_id: departemenTekom.departemen_id,
        foto_profile: null,
        refresh_token: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: 'adminInfo@gmail.com',
        nama: 'Administrator Informatika',
        password: await bcrypt.hash('info123', 10),
        departemen_id: departemenInfo.departemen_id,
        foto_profile: null,
        refresh_token: null,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ]);

    console.log('Admins seeded successfully!');
  },

  down: async () => {
    // Revert seeding
    await Admin.destroy({
      where: {
        email: ['adminDsi@gmail.com', 'adminTekom@gmail.com', 'adminInfo@gmail.com']
      }
    });

    console.log('Admins removed successfully!');
  }
};
