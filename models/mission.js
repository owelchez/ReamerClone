'use strict';
module.exports = function(sequelize, DataTypes) {
  var Mission = sequelize.define('Mission', {
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
        Mission.belongsTo(models.User);
        Mission.belongsTo(models.Quest);
      }
    }
  });
  return Mission;
};