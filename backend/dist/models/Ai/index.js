"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database"));
const sequelize_1 = require("sequelize");
const index_1 = require("../index");
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
    Yourmessage: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: index_1.Users,
            key: "id"
        }
    }
}, {
    tableName: "Aimessages",
    timestamps: true,
});
exports.default = Aimessages;
//# sourceMappingURL=index.js.map