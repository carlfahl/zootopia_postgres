'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    modified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    date: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        Comment.belongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        });
        Comment.belongsTo(models.Animal, {
          foreignKey: 'animalId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Comment;
};
