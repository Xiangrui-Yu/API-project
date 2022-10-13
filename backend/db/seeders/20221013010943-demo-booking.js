'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Bookings',[
      {
        spotId:1,
        userId:1,
        startDate: '2022-10-12',
        endDate:'2022-10-14'
      },
      {
        spotId:2,
        userId:3,
        startDate: '2022-10-15',
        endDate:'2022-10-18'
      },
      {
        spotId:3,
        userId:2,
        startDate: '2022-11-1',
        endDate:'2022-11-6'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Bookings', null, {});
  }
};