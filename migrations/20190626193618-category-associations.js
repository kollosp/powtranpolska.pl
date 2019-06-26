'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/


    return queryInterface.addColumn('Categories', 'subcategoryFor', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id'
        },
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return queryInterface.removeColumn('Category', 'subcategoryFor');
    
  }
};
