'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

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
    options.tableName = Bookings
    await queryInterface.bulkInsert(options,[
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
        startDate: '2022-11-01',
        endDate:'2022-11-06'
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
     await queryInterface.bulkDelete(options, null, {});
  }
};
