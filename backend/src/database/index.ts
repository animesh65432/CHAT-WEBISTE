import { Sequelize } from "sequelize";

console.log(process.env.DATABASE, process.env.DATABASEPASSWORD);
const database = new Sequelize({
  database: process.env.DATABASE,
  password: process.env.DATABASEPASSWORD,
  username: process.env.DATABASEUSERNAME,
  dialect: "mysql",
  port: 3306,
  host: process.env.dbhost,
});

export default database;
