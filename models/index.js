// const { Sequelize } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have database config file

// const sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     {
//         host: config.host,
//         dialect: config.dialect,
//         logging: false
//     }
// );

// Import models
const Departemen = require('./Departemen');
const Admin = require('./Admin');
const Dosen = require('./Dosen');
const Kelas = require('./Kelas');
const Ruangan = require('./Ruangan');
const JadwalKuliah = require('./JadwalKuliah');
const Presensi = require('./Presensi');

// Initialize models
const models = {
    Departemen: Departemen(sequelize),
    Admin: Admin(sequelize),
    Dosen: Dosen(sequelize),
    Kelas: Kelas(sequelize),
    Ruangan: Ruangan(sequelize),
    JadwalKuliah: JadwalKuliah(sequelize),
    Presensi: Presensi(sequelize),
};

// Define associations
models.Departemen.hasOne(models.Admin, {
    foreignKey: 'departemen_id'
});

models.Admin.belongsTo(models.Departemen, {
    foreignKey: 'departemen_id'
});

models.Departemen.hasMany(models.Dosen, {
    foreignKey: 'departemen_id'
});
models.Dosen.belongsTo(models.Departemen, {
    foreignKey: 'departemen_id'
});

models.Departemen.hasMany(models.Kelas, {
    foreignKey: 'departemen_id'
});
models.Kelas.belongsTo(models.Departemen, {
    foreignKey: 'departemen_id'
});

// Dosen -> Kelas
models.Dosen.hasMany(models.Kelas, {
    foreignKey: 'nip',
    onDelete: 'SET NULL',
});
models.Kelas.belongsTo(models.Dosen, {
    foreignKey: 'nip'
});

// Kelas -> JadwalKuliah
models.Kelas.hasMany(models.JadwalKuliah, {
    foreignKey: 'kode_kelas',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
models.JadwalKuliah.belongsTo(models.Kelas, {
    foreignKey: 'kode_kelas'
});

models.Ruangan.hasMany(models.JadwalKuliah, {
    foreignKey: 'ruangan_id'
});
models.JadwalKuliah.belongsTo(models.Ruangan, {
    foreignKey: 'ruangan_id'
});

// JadwalKuliah -> Presensi
models.JadwalKuliah.hasMany(models.Presensi, {
    foreignKey: 'jadwal_kuliah_id',
    onDelete: 'CASCADE',
});

models.Presensi.belongsTo(models.JadwalKuliah, {
    foreignKey: 'jadwal_kuliah_id'
});

module.exports = {
    sequelize,
    ...models
};