module.exports = function(sequelize, DataTypes) {
    var Type = sequelize.define("Type", {
      name: DataTypes.STRING
    });
  
    Type.associate = function(models) {
      Type.hasMany(models.Post, {
      });
    };
  
    return Type;
  };
  