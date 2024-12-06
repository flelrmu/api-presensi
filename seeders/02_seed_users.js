"use strict";
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        email: "adminEsi@gmail.com",
        name: "Administrator Sistem Informasi",
        password: await bcrypt.hash("esi123", 10),
        departemen: "Sistem Informasi",
        fakultas: "Teknologi Informasi",
        refresh_token: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "adminTekom@gmail.com",
        name: "Administrator Teknik Komputer",
        password: await bcrypt.hash("tekom123", 10),
        departemen: "Teknik Komputer",
        fakultas: "Teknologi Informasi",
        refresh_token: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "adminInfo@gmail.com",
        name: "Administrator Informatika",
        password: await bcrypt.hash("info123", 10),
        departemen: "Informatika",
        fakultas: "Teknologi Informasi",
        refresh_token: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
