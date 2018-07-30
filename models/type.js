module.exports = function(sequelize, DataTypes) {
    var Type = sequelize.define("Type", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5, 100]
        }
      }
    });
  
    Type.associate = function(models) {
      Type.hasMany(models.HauntedPlace);
    };
  
    return Type;
  };
  