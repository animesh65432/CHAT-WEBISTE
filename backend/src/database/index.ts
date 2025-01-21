import { Sequelize } from "sequelize";

const database = new Sequelize(
  "chatbackend",
  "postgres",
  "new_password",
  {
    host: "database",
    dialect: "postgres",
    port: 5432,

  }
);

// Add connection testing
const testConnection = async () => {
  try {
    await database.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection();

export default database;