'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer_Addresses = sequelize.define('Customer_Addresses', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    street_address: DataTypes.STRING,
    postal_code: DataTypes.STRING,
    country: DataTypes.STRING
  }, {});
  Customer_Addresses.associate = function(models) {
    Customer_Addresses.belongsTo(models.Customers, {
      foreignKey: 'customer_id',
      onDelete: 'CASCADE',
    });
  };
  return Customer_Addresses;
};