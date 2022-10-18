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
        startDate: '2022-10-12 20:39:36',
        endDate:'2022-10-14 20:39:36'
      },
      {
        spotId:2,
        userId:3,
        startDate: '2022-10-15 20:45:36',
        endDate:'2022-10-18 20:45:36'
      },
      {
        spotId:3,
        userId:2,
        startDate: '2022-11-01 20:50:36',
        endDate:'2022-11-06 20:50:36'
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
