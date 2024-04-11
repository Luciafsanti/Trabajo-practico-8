'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Define the sample data to be inserted
    const productsData = [
      {
        product: 'Product 1',
        price: 10.99,
        stock: 100
      },
      {
        product: 'Product 2',
        price: 19.99,
        stock: 50
      },
      // Add more products as needed
    ];

    // Insert the sample data into the 'products' table
    await queryInterface.bulkInsert('products', productsData, {});

    // If needed, update the auto-increment value
    await queryInterface.sequelize.query('ALTER TABLE products AUTO_INCREMENT = 1000;');
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the inserted data from the 'products' table
    await queryInterface.bulkDelete('products', null, {});
  }
};
