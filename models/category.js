'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: { type: DataTypes.STRING, allowNull: false},
    description: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
    visible: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 1 },
    image: {type: DataTypes.STRING, allowNull:false}
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
    models.Category.hasMany(models.Category, {foreignKey: 'subcategoryFor', sourceKey: 'id'})
    models.Category.belongsTo(models.Category, {foreignKey: 'subcategoryFor', targetKey: 'id'})
  
  };
  return Category;
};