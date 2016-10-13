'use strict';
module.exports = function(sequelize, DataTypes) {
  var Quest = sequelize.define('Quest', {
    title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
    active: {
    type: DataTypes.BOOLEAN
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Quest.belongsTo(models.User);
      }
    }
  });
  return Quest;
};