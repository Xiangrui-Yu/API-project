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
    options.tableName = Reviews

    await queryInterface.bulkInsert(options,[
      {
        spotId:1,
        userId:1,
        review: "This was good place",
        stars: 4.5
      },
      { spotId:2,
        userId:2,
        review: "this was an awesome place",
        stars: 4.6
      },
      {
        spotId:3,
        userId:3,
        review: "this was an wonderful place",
        stars: 4.7
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
