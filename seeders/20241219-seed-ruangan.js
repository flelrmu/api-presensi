const { Ruangan } = require('../models'); // Ensure this path is correct

module.exports = {
  up: async () => {
    // Synchronize the Ruangan model (create the table if it doesn't exist)
    await Ruangan.sync(); // This will create the 'ruangan' table if it doesn't exist

    // Define the room names (H 1.1 to H 1.10 and H 2.1 to H 2.10)
    const roomNames = [];
    for (let i = 1; i <= 10; i++) {
      roomNames.push(`H 1.${i}`);
    }

    for (let i = 1; i <= 10; i++) {
        roomNames.push(`H 2.${i}`);
    }
    const nomor = [];
    for (let index = 0; index < 20; index++) {
        nomor.push(index);
        
    }

    // Insert the room data
    const rooms = roomNames.map(room => ({
        ruang_id: nomor,
      nama_ruangan: room,
      kapasitas: 50,
    }));

    // Bulk create the rooms in the database
    await Ruangan.bulkCreate(rooms);

    console.log('Rooms seeded successfully!');
  },

  down: async () => {
    // Revert seeding (remove the rooms by their names)
    await Ruangan.destroy({
      where: {
        nama_ruangan: [
          'H 1.1', 'H 1.2', 'H 1.3', 'H 1.4', 'H 1.5', 'H 1.6', 'H 1.7', 'H 1.8', 'H 1.9', 'H 1.10',
          'H 2.1', 'H 2.2', 'H 2.3', 'H 2.4', 'H 2.5', 'H 2.6', 'H 2.7', 'H 2.8', 'H 2.9', 'H 2.10'
        ]
      }
    });

    console.log('Rooms removed successfully!');
  }
};
