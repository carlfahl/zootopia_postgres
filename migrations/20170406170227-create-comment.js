'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      body: {
        type: Sequelize.STRING
      },
      modified: {
        type: Sequelize.BOOLEAN
      },
      date: {
        type: Sequelize.DATE
      },
      author: {
        type: Sequelize.STRING
      },
      picture: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      animalId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Animals',
          key: 'id',
          as: 'animalId',
        },
      },
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Comments');
  }
};
