'use strict';
module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define('Location', {
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Location.belongsToMany(models.User, {
          through: 'UserLocation'
        })
      }
    }
  });
  return Location;
};
