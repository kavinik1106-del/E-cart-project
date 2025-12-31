import ProductModel from './Product.js';
import OrderModel from './Order.js';
import CustomerModel from './Customer.js';
import SettingModel from './Setting.js';

let models = {};

export const initializeModels = (sequelize) => {
  const Product = ProductModel(sequelize);
  const Order = OrderModel(sequelize);
  const Customer = CustomerModel(sequelize);
  const Setting = SettingModel(sequelize);

  models = { Product, Order, Customer, Setting };

  return models;
};

export const getModels = () => models;


