"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cron_1 = require("cron");
const sequelize_1 = __importDefault(require("sequelize"));
const Group_1 = __importDefault(require("../models/msg/Group"));
const ArchivedChat_1 = __importDefault(require("../models/ArchivedChat"));
const job = new cron_1.CronJob("0 0 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    try {
        const chats = yield Group_1.default.findAll({
            where: {
                createdAt: {
                    [sequelize_1.default.Op.lt]: yesterday,
                },
            },
        });
        const archivedChats = chats.map((chat) => ({
            message: chat.message || "",
            filename: chat.filename || "",
            imgandvideourl: chat.imgandvideourl || "",
            createdAt: chat.createdAt,
            updatedAt: chat.updatedAt,
        }));
        yield ArchivedChat_1.default.bulkCreate(archivedChats);
        yield Group_1.default.destroy({
            where: {
                createdAt: {
                    [sequelize_1.default.Op.lt]: yesterday,
                },
            },
        });
    }
    catch (error) {
        console.error("Error executing cron job:", error);
    }
}));
exports.default = job;
//# sourceMappingURL=index.js.map