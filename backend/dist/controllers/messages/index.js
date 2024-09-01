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
exports.Messagehandler = exports.sendMessage = void 0;
const msg_1 = __importDefault(require("../../models/msg"));
const http_status_codes_1 = require("http-status-codes");
const services_1 = require("../../services");
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { GroupId, message } = req.body;
        if (!GroupId && !message)
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                sucess: false,
                message: "groupid and messages nedded",
            });
        yield msg_1.default.create({
            message: message,
            GroupId: GroupId,
            userId: req.user.id,
        });
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({
            sucess: true,
            message: "sucessfully created it",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error" });
    }
});
exports.sendMessage = sendMessage;
const Messagehandler = (socket) => {
    const GetMessages = (_a) => __awaiter(void 0, [_a], void 0, function* ({ GroupId }) {
        try {
            let messages = yield msg_1.default.findAll({
                where: {
                    GroupId: GroupId,
                },
            });
            if (messages.length === 0) {
                socket.emit("messages", []);
            }
            else {
                for (let i = 0; i < messages.length; i++) {
                    if (messages[i].filename) {
                        messages[i].imgandvideourl = yield (0, services_1.gethefile)(messages[i].filename);
                    }
                }
                socket.emit("messages", messages);
            }
        }
        catch (error) {
            console.log(error);
            socket.emit("messages", []);
        }
    });
    socket.on("getMessages", GetMessages);
};
exports.Messagehandler = Messagehandler;
