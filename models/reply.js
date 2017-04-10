'use strict';
module.exports = function(sequelize, DataTypes) {
  var Reply = sequelize.define('Reply', {
    text: DataTypes.STRING,
    user: DataTypes.STRING,
    picture: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Reply.belongsTo(models.Comment, {
          foreignKey: 'commentId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Reply;
};
