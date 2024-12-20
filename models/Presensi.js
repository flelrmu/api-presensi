const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Presensi = sequelize.define('Presensi', {
        presensi_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,  // Menjadikan presensi_id sebagai auto increment
        },
        jadwal_kuliah_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'jadwal_kuliah',
                key: 'jadwal_kuliah_id'
            }
        },
        pertemuan: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        jml_hadir: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        jml_alpha: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        jml_izin: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        jml_sakit: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        tableName: 'presensi',
        timestamps: false
    });

    return Presensi;
};