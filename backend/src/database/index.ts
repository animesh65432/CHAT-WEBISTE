import { Sequelize } from "sequelize";

const database = new Sequelize(
  process.env.DATABASENAME,
  process.env.DATAUSERNAME,
  process.env.DATAPASSWORD,
  {
    host: process.env.DATABASEHOST,
    dialect: "postgres",
    port: 5432,

  }
);

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