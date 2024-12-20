const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Admin = sequelize.define('Admin', {
        admin_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'admin_id'
        },
        departemen_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'departemen',
                key: 'departemen_id'
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nama: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        foto_profile: {
            type: DataTypes.STRING,
            allowNull: true
        },
        refresh_token: {
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
        tableName: 'admin',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    return Admin;
};