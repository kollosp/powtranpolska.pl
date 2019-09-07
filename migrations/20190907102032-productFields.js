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
        queryInterface.addColumn('Products', 'longName', {
            type: Sequelize.STRING,
            allowNull: false
        }, { transaction: t }),
        /*queryInterface.addColumn('Categories', 'visible', {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 1
        }, { transaction: t }),
        queryInterface.addColumn('Categories', 'name', {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: ""
        }, { transaction: t })*/
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
