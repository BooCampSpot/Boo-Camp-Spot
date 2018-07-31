module.exports = function(sequelize, DataTypes) {
  const HauntedPlace = sequelize.define('HauntedPlace', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5, 100],
          msg: 'Name must be between 5 to 100 characters.'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: {
          args: [5, 500],
          msg: 'Description must be between 5 to 500 characters.'
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5, 100],
          msg: 'Location must be between 5 to 100 characters.'
        }
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
