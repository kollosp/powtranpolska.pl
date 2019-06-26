'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      specification: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "{}"
      },
      htmlDescription: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ""
      },
      price: {
        type: Sequelize.FLOAT,
      },
      visible: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 1
      },
      available: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      category: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Products');
  }
};