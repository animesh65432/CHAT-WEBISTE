"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database"));
const sequelize_1 = require("sequelize");
const Message = database_1.default.define("message", {
    message: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
});
exports.default = Message;