import { Sequelize } from "sequelize";

const database = new Sequelize({
  database: process.env.DATABASE,
  password: process.env.DATABASEPASSWORD,
  username: process.env.DATABASEUSERNAME,
  dialect: "postgres",
  host: process.env.dbhost,
});

export default database;
