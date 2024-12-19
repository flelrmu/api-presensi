const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Departemen = sequelize.define('Departemen', {
        departemen_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'departemen_id'
        },
        nama_departemen: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fakultas: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'departemen',
        timestamps: false
    });

    return Departemen;
};