"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("class_list", [
      {
        class_name: "Kalkulus",
        class_code: "MATH101",
        lecturer: "Dr Rahman",
        created_at: new Date(), // Menggunakan snake_case
        updated_at: new Date(), // Menggunakan snake_case
      },
      {
        class_name: "Algoritma",
        class_code: "CS102",
        lecturer: "Prof Taufik",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        class_name: "Akuisisi Data",
        class_code: "AK103",
        lecturer: "Prof Rizki",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        class_name: "Kewirausahaan",
        class_code: "KW104",
        lecturer: "Prof Kiwil",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        class_name: "Analisis Data",
        class_code: "AD105",
        lecturer: "Prof Siska",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("class_list", null, {});
  },
};
