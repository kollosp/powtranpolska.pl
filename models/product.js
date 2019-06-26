'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {type: DataTypes.STRING, allowNull:false},
    specification: {type: DataTypes.STRING, allowNull:false},
    htmlDescription: {type: DataTypes.STRING, allowNull:false},
    price: {type: DataTypes.FLOAT, allowNull:false},
    visible: {type: DataTypes.BOOLEAN, allowNull:false},
    available: {type: DataTypes.INTEGER, allowNull:false}
  }, {});

  Product.associate = function(models) {
    // associations can be defined here

    models.Category.hasMany(models.Product)
    models.Product.belongsTo(models.Category)
  };

  return Product;
};