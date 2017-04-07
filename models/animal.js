'use strict';
module.exports = function(sequelize, DataTypes) {
  var Animal = sequelize.define('Animal', {
    name: DataTypes.STRING,
    species: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Animal.hasMany(models.Comment, {
          foreignKey: 'animalId',
          as: 'animalComments'
        });
      }
    }
  });
  return Animal;
};
