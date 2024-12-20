const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Kelas = sequelize.define('Kelas', {
        kode_kelas: {
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: false,
            allowNull: false,
            unique: true,
            field: 'kode_kelas'
        },
        departemen_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'departemen',
                key: 'departemen_id'
            }
        },
        nip: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'dosen',
                key: 'nip'
            }
        },
        nama_kelas: {
            type: DataTypes.STRING,
            allowNull: false
        },
        jumlah_sks: {  // Kolom baru
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0  // Menetapkan nilai default
        },
        semester: {
            type: DataTypes.STRING,
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
        tableName: 'kelas',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    return Kelas;
};