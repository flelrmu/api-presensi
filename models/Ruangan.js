const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Ruangan = sequelize.define('Ruangan', {
        ruang_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'ruang_id'
        },
        nama_ruangan: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        kapasitas: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'ruangan',
        timestamps: false
    });

    return Ruangan;
};