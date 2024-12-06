const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Pastikan konfigurasi sequelize benar

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departemen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fakultas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refresh_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'Users',
    timestamps: true,
  }
);

module.exports = User;
