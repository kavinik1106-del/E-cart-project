import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.STRING(20),
      primaryKey: true,
    },
    customer: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    status: {
      type: DataTypes.ENUM('pending', 'processing', 'shipped', 'delivered'),
      defaultValue: 'pending',
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    items: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        min: 1,
      },
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    timestamps: true,
    tableName: 'orders',
  });

  return Order;
};
