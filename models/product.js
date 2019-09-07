'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {type: DataTypes.STRING, allowNull:false},
    //specification is a json 
    specification: {type: DataTypes.STRING, allowNull:false},
    htmlDescription: {type: DataTypes.STRING, allowNull:false},
    price: {type: DataTypes.FLOAT, allowNull:false},
    visible: {type: DataTypes.BOOLEAN, allowNull:false},
    available: {type: DataTypes.INTEGER, allowNull:false},
    longName: {type: DataTypes.STRING, allowNull:false},
    image: {type: DataTypes.STRING, allowNull:false}
  }, {});

  Product.associate = function(models) {
    // associations can be defined here

    models.Category.hasMany(models.Product, {foreignKey: 'category', sourceKey: 'id'})
    models.Product.belongsTo(models.Category, {foreignKey: 'category', targetKey: 'id'})
  };

  return Product;
};