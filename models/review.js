'use strict';
module.exports = (sequelize, DataTypes) => {
  var Review = sequelize.define('Review', {
    title: DataTypes.STRING
  }, {});
  Review.associate = function (models) {
    Review.belongsTo(models.hauntedPlaces, { foreignKey: 'hauntedID' });
  };
  Review.associate = function (models) {
    Review.belongsTo(models.user, { foreignKey: 'userID' });
  };
  return Review;
};