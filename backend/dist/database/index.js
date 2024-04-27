"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
console.log(process.env.DATABASE, process.env.DATABASEPASSWORD);
const database = new sequelize_1.Sequelize({
    database: process.env.DATABASE,
    password: process.env.DATABASEPASSWORD,
    username: "root",
    dialect: "mysql",
});
exports.default = database;
