// Dependencies
// =============================================================

module.exports = function(sequelize, DataTypes) {
    const Reviews = sequelize.define('Reviews', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5, 100]
        }
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          len: [5, 500]
        }
      },
      rating: {
        type: DataTypes.integer,
        allowNull: false
      }
    });
  
    Reviews.associate = (models) => {
      // Reviews cannot be created without a User due to the foreign key constraint
      Reviews.belongsTo(models.Users, {
        foreignKey: {
          allowNull: false
        }
      });
      
      // Reviews cannot be created without a haunted_place due to the foreign key constraint
      Reviews.belongsTo(models.HauntedPlace, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Reviews;
  };