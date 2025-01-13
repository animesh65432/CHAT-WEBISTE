import { Sequelize } from "sequelize";


const database = new Sequelize(
  "chatbackend",
  "postgres",
  "new_password",
  {
    host: "localhost",
    dialect: "postgres",
  }
);

export default database;
