// server/customer/models/Customer.model.js
import { DataTypes } from 'sequelize';
import customerDB from '../../config/customerDatabase.js';

const Customer = customerDB.define('Customer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: DataTypes.STRING,
  mobile: DataTypes.STRING,
});

export default Customer;
