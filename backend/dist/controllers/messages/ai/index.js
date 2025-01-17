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
exports.getmessages = exports.sendmessages = void 0;
const GemiAI_1 = __importDefault(require("../../../services/GemiAI"));
const http_status_codes_1 = require("http-status-codes");
const models_1 = require("../../../models");
const sendmessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message } = req.body;
        const result = yield GemiAI_1.default.generateContent(message);
        const textresposne = result.response.text();
        const userId = Number(req.user.id);
        console.log(userId, "user number id");
        console.log(textresposne, "from ai response");
        const Aimessage = yield models_1.Aimessages.create({
            Yourmessage: message,
            userId,
            message: textresposne
        });
        return res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
            message: Aimessage
        });
    }
    catch (error) {
        console.log(error, "Errors in sending messages");
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: `${error || "internal server errors"} `
        });
    }
});
exports.sendmessages = sendmessages;
const getmessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.user.id);
        const messages = yield models_1.Aimessages.findAll({
            where: {
                userId
            }
        });
        return res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
            message: "Get the messages sucessfully",
            messages
        });
    }
    catch (error) {
        console.log(error, "Errors in getting the message from ai");
        return res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
            message: `${error || "internal server errors"}`
        });
    }
});
exports.getmessages = getmessages;
//# sourceMappingURL=index.js.map