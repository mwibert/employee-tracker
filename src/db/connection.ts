import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const DB_NAME = process.env.DB_NAME || "employee_tracker";
const DB_USER = process.env.DB_USER || "postgres";
const DB_PASSWORD = process.env.DB_PASSWORD || "Root";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  logging: false,
  port: DB_PORT,
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection to database has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();

export default sequelize;
