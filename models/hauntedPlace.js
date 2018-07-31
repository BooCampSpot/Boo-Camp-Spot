module.exports = function(sequelize, DataTypes) {
  const HauntedPlace = sequelize.define('HauntedPlace', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 100]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [5, 500]
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 100]
      }
    }
  });

  HauntedPlace.associate = (models) => {
    HauntedPlace.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
      }
    });

    HauntedPlace.belongsTo(models.Type, {
      foreignKey: {
        allowNull: false
      }
    });

    HauntedPlace.hasMany(models.Review);
  };

  return HauntedPlace;
};
