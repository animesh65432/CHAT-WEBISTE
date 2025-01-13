"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database = new sequelize_1.Sequelize("chatbackend", "postgres", "new_password", {
    host: "localhost",
    dialect: "postgres",
});
exports.default = database;
//# sourceMappingURL=index.js.map