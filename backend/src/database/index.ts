import { Sequelize } from "sequelize";

const database = new Sequelize({
  database: process.env.DATABASE,
  password: process.env.DATABASEPASSWORD,
  username: process.env.DATABASEUSERNAME,
  dialect: "mysql",
  host: process.env.dbhost,
});

export default database;
