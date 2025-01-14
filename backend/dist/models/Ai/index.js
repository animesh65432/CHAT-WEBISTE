"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database"));
const sequelize_1 = require("sequelize");
const Aimessages = database_1.default.define("Aimessages", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    message: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    userid: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    Yourmessage: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: "Aimessages",
    timestamps: true,
});
exports.default = Aimessages;
//# sourceMappingURL=index.js.map