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
    // HauntedPlace should belong to a Type
    // HauntedPlace cannot be created without a Type due to the foreign key constraint
    HauntedPlace.belongsTo(models.Type, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return HauntedPlace;
};
