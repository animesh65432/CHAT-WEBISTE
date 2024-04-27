import { Sequelize } from "sequelize";

console.log(process.env.DATABASE, process.env.DATABASEPASSWORD);
const database = new Sequelize({
  database: process.env.DATABASE,
  password: process.env.DATABASEPASSWORD,
  username: "root",
  dialect: "mysql",
});

export default database;
