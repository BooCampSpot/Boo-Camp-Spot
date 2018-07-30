module.exports = function(sequelize, DataTypes) {
    const Review = sequelize.define('Review', {
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
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1, 
          max: 5
        }
      }
    });
  
    Review.associate = (models) => {
      // Review cannot be created without a User due to the foreign key constraint
      Reviews.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
      
      // Review cannot be created without a HauntedPlace due to the foreign key constraint
      Review.belongsTo(models.HauntedPlace, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Review;
  };