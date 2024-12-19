const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Dosen = sequelize.define('Dosen', {
        nip: {
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: false,
            allowNull: false,
            unique: true,
            field: 'nip'
        },
        departemen_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'departemen',
                key: 'departemen_id'
            }
        },
        nama_dosen: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        no_telp: {
            type: DataTypes.STRING,
            allowNull: true
        },
        alamat: {
            type: DataTypes.STRING,
            allowNull: true
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
        tableName: 'dosen',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    return Dosen;
};