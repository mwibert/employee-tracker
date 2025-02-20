import sequelize from "./db/connection.js";
import mainMenu from "./models/index.js";

const startApp = async (): Promise<void> => {
  try {
    console.log("Connecting to Employee Tracker Database...");
    await sequelize.authenticate();
    console.log("Database connection established successfully.\n");

    await sequelize.sync();

    mainMenu();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

startApp();
