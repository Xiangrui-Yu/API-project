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
    options.tableName = 'Spots';
    await queryInterface.bulkInsert(options,[
      {
        ownerId:1,
        address:'122 Disney Lane',
        city: 'Orlando',
        state:'Florida',
        country:'United States of America',
        lat:37.7663543,
        lng: -122.475933,
        name:'App Hotel',
        description:"very close to the airport",
        price: 166,
      },

      {
        ownerId:2,
        address:'123 Disney Lane',
        city: 'Orlando',
        state:'Florida',
        country:'United States of America',
        lat:37.7663544,
        lng: -122.475934,
        name:'App Hotel swan',
        description:"very close to DisneyLand",
        price: 168,
      },
      {
        ownerId:3,
        address:'124 Disney Lane',
        city: 'Orlando',
        state:'Florida',
        country:'United States of America',
        lat:37.7663544,
        lng: -122.475934,
        name:'App Hotel Micky',
        description:"very close to Animal Kingdom",
        price: 186,
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete(options, null, {});
  }
};
