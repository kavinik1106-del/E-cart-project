import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Customer = sequelize.define('Customer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING(20),
      defaultValue: '',
    },
    location: {
      type: DataTypes.STRING(255),
      defaultValue: '',
    },
    orders: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    spent: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    joined: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    timestamps: true,
    tableName: 'customers',
  });

  return Customer;
};
