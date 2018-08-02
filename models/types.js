'use strict';
module.exports = (sequelize, DataTypes) => {
  var Types = sequelize.define('Types', {
    name: DataTypes.STRING
  }, {});
  return Types;
};