'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customers = sequelize.define('Customers', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING
  }, {});
  Customers.associate = function(models) {
    Customers.hasMany(models.Customer_Addresses, {
      foreignKey: 'customer_id',
      as: 'addresses',
    });
  };
  return Customers;
};