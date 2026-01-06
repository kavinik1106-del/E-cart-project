import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    type: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(100),
      defaultValue: '',
    },
    brand: {
      type: DataTypes.STRING(100),
      defaultValue: '',
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    mrp: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: null,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    image: {
      type: DataTypes.STRING(255),
      defaultValue: '',
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 4.5,
      validate: {
        min: 0,
        max: 5,
      },
    },
    reviews: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    discount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100,
      },
    },
    colors: {
      type: DataTypes.JSON,
      defaultValue: ['Default'],
    },
    sizeGuide: {
      type: DataTypes.JSON,
      defaultValue: { S: {}, M: {}, L: {}, XL: {} },
    },
    tag: {
      type: DataTypes.STRING(50),
      defaultValue: 'In Stock',
    },
  }, {
    timestamps: true,
    tableName: 'products',
  });

  return Product;
};
