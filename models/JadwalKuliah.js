const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const JadwalKuliah = sequelize.define(
  "JadwalKuliah",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    class_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    class_code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    lecturer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "jadwal_kuliah",
    timestamps: true, // Secara otomatis akan menggunakan createdAt dan updatedAt
    underscored: true, // Agar Sequelize menggunakan nama kolom dengan snake_case seperti `created_at`, `updated_at`
  }
);

module.exports = JadwalKuliah;
