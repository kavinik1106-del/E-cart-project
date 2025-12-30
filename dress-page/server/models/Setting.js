import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Setting = sequelize.define('Setting', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      defaultValue: 1,
    },
    storeName: {
      type: DataTypes.STRING(255),
      defaultValue: 'Fashion Hub',
    },
    storeEmail: {
      type: DataTypes.STRING(255),
      defaultValue: 'contact@fashionhub.com',
    },
    storePhone: {
      type: DataTypes.STRING(20),
      defaultValue: '+1-555-1000',
    },
    currency: {
      type: DataTypes.STRING(10),
      defaultValue: 'USD',
    },
    taxRate: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 5,
    },
    notificationsEmail: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    notificationsOrders: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    notificationsLowStock: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    timestamps: true,
    tableName: 'settings',
  });

  return Setting;
};
