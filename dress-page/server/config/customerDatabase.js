import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const customerDB = new Sequelize(
  process.env.CUSTOMER_DB_NAME || "customer_db",
  process.env.CUSTOMER_DB_USER || "root",
  process.env.CUSTOMER_DB_PASSWORD || "root",
  {
    host: process.env.CUSTOMER_DB_HOST || "localhost",
    port: process.env.CUSTOMER_DB_PORT || 3306,
    dialect: "mysql",
    logging: false,
  }
);

export default customerDB;
