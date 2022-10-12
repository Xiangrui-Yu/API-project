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
    await queryInterface.bulkInsert('Spots',[
      {
        address:'122 Disney Lane',
        city: 'Orlando',
        state:'Florida',
        country:'United States of America',
        lat:37.7663543,
        ing: -122.475933,
        name:'App Hotel',
        description:"very close to the airport",
        price: 166,
      },

      {
        address:'123 Disney Lane',
        city: 'Orlando',
        state:'Florida',
        country:'United States of America',
        lat:37.7663544,
        ing: -122.475934,
        name:'App Hotel swan',
        description:"very close to DisneyLand",
        price: 168,
      },
      {
        address:'124 Disney Lane',
        city: 'Orlando',
        state:'Florida',
        country:'United States of America',
        lat:37.7663544,
        ing: -122.475934,
        name:'App Hotel Micky',
        description:"very close to Animal Kingdom",
        price: 186,
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
     await queryInterface.bulkDelete('People', null, {});
  }
};
