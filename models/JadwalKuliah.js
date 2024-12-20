const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const JadwalKuliah = sequelize.define('JadwalKuliah', {
        jadwal_kuliah_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'jadwal_kuliah_id'
        },
        kode_kelas: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'kelas',
                key: 'kode_kelas'
            }
        },
        ruangan_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'ruangan',
                key: 'ruang_id'
            }
        },
        hari: {
            type: DataTypes.ENUM('Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'),
            allowNull: false
        },
        jam_mulai: {
            type: DataTypes.TIME,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'jadwal_kuliah',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    return JadwalKuliah;
};

