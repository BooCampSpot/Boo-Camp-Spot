'use strict';
module.exports = (sequelize, DataTypes) => {
  var hauntedPlaces = sequelize.define('HauntedPlaces', {
    name: DataTypes.STRING
  }, {});
  hauntedPlaces.associate = function(models) {
    hauntedPlaces.belongsTo(models.Types, {foreignKey: 'typeID'});
    };
  return hauntedPlaces;
};