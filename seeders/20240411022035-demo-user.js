'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Define an array of user objects
    const usersData = [
      {
        username: 'user1',
        password: 'password1',
        email: 'user1@example.com'
      },
      {
        username: 'user2',
        password: 'password2',
        email: 'user2@example.com'
      },
      // Add more user objects as needed
    ];

    // Use bulkCreate to insert users into the database
    await queryInterface.bulkInsert('users', usersData, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the seeded data
    await queryInterface.bulkDelete('users', null, {});
  }
};