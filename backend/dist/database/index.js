"use strict";
// import { Sequelize } from "sequelize";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// const database = new Sequelize(
//   "chatbackend",
//   "postgres",
//   "new_password",
//   {
//     host: "localhost",
//     dialect: "postgres",
//     // port: 5432,
//     // retry: {
//     //   max: 5, // Maximum retry 5 times
//     //   timeout: 3000 // Timeout after 3s
//     // },
//     // pool: {
//     //   max: 5, // Maximum number of connection in pool
//     //   min: 0, // Minimum number of connection in pool
//     //   acquire: 30000, // The maximum time, in milliseconds, that pool will try to get connection before throwing error
//     //   idle: 10000 // The maximum time, in milliseconds, that a connection can be idle before being released
//     // },
//     // logging: console.log // Enable logging
//   }
// );
// // Add connection testing
// const testConnection = async () => {
//   try {
//     await database.authenticate();
//     console.log('Database connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// };
// testConnection();
// export default database;
const sequelize_1 = require("sequelize");
const database = new sequelize_1.Sequelize("chatbackend", "postgres", "new_password", {
    host: "localhost",
    dialect: "postgres",
});
// // Add connection testing
const testConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database.authenticate();
        console.log('Database connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
testConnection();
exports.default = database;
//# sourceMappingURL=index.js.map