"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database"));
const sequelize_1 = require("sequelize");
const Groups = database_1.default.define("Group", {
    nameofthegroup: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
});
exports.default = Groups;
