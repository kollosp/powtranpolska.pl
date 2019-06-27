'use strict';
module.exports = (sequelize, DataTypes) => {
  const Download = sequelize.define('Download', {
    path: DataTypes.STRING,
    visible: DataTypes.BOOLEAN
  }, {});
  Download.associate = function(models) {
    // associations can be defined here
  };
  return Download;
};