'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Customer_Addresses', [
      {
        id: 1,
        customer_id: 2,
        street_address: '123 Big Walk Way',
        postal_code: '75023',
        country: 'US',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        customer_id: 3,
        street_address: '509 Charter Road ',
        postal_code: '90021',
        country: 'US',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        customer_id: 1,
        street_address: '999 Night Stalker Road ',
        postal_code: '12345',
        country: 'US',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Customer_Addresses', null, {});
  }
};
