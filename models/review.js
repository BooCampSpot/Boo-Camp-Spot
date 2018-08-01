module.exports = function(sequelize, DataTypes) {
    const Review = sequelize.define('Review', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [5, 100],
            msg: 'Title must be between 5 to 100 characters.'
          }
        }
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          len: {
            args: [5, 100],
            msg: 'Content must be between 5 to 100 characters.'
          }
        }
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1, 
          max: 5
        }
      }
    });
  
    Review.associate = (models) => {
      // Review cannot be created without a User due to the foreign key constraint
      Review.belongsTo(models.User, {
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