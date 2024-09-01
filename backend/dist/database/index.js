"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database = new sequelize_1.Sequelize(process.env.DATABASE, process.env.DATABASEUSERNAME, process.env.DATABASEPASSWORD, {
    host: process.env.dbhost,
    port: 15391,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});
exports.default = database;
//# sourceMappingURL=index.js.map