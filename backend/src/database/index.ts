import { Sequelize } from "sequelize";

const database = new Sequelize(
  process.env.DATABASE as string,
  process.env.DATABASEUSERNAME as string,
  process.env.DATABASEPASSWORD as string,
  {
    host: process.env.dbhost as string,
    port: 15391,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

export default database;
