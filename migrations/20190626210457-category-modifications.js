'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn('Categories', 'desctiption', { transaction: t }),
                queryInterface.removeColumn('Categories', 'visible', { transaction: t }),
                queryInterface.removeColumn('Categories', 'name', { transaction: t }),
            ])
        })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return queryInterface.dropTable('Categories');
  
  }
};
