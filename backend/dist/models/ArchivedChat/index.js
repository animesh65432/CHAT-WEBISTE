"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database"));
const sequelize_1 = require("sequelize");
const ArchivedChat = database_1.default.define("ArchivedChat", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    GroupId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    message: {
        type: sequelize_1.DataTypes.STRING,
    },
});
exports.default = ArchivedChat;
