"use strict";
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "2211523021_muhammad@student.unand.ac.id",
          name: "Muhammad Farhan",
          nim: "2211523021",
          password: await bcrypt.hash("farhan", 10),
          role: "mahasiswa",
          departemen: "Sistem Informasi",
          hp: "085156462439",
          refresh_token: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "2211522033_annisa@student.unand.ac.id",
          name: "Annisa Nurul Hakim",
          nim: "2211521038",
          password: await bcrypt.hash("annisa", 10),
          role: "mahasiswa",
          departemen: "Sistem Informasi",
          hp: "085211593359",
          refresh_token: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "2211522122_benni@student.unand.ac.id",
          name: "Benni Putra Chaniago",
          nim: "2211522122",
          password: await bcrypt.hash("benni", 10),
          role: "mahasiswa",
          departemen: "Sistem Informasi",
          hp: "082384639175",
          refresh_token: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "admin@gmail.com",
          name: "Admin",
          nim: "2216523821",
          password: await bcrypt.hash("admin", 10),
          role: "admin",
          departemen: "Sistem Informasi",
          hp: "083264422379",
          refresh_token: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
