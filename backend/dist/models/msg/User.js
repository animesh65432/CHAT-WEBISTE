"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database"));
const sequelize_1 = require("sequelize");
const models_1 = require("../../models");
const UserMessages = database_1.default.define("UserMessages", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    message: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    senderId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: models_1.Users,
            key: "id"
        }
    },
    receiverId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: models_1.Users,
            key: "id"
        }
    }
});
exports.default = UserMessages;
//# sourceMappingURL=User.js.map