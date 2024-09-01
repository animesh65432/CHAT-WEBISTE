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
exports.Messagehandler = void 0;
const msg_1 = __importDefault(require("../../models/msg"));
const services_1 = require("../../services");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../../models");
const Messagehandler = (socket) => {
    const GetMessages = (_a) => __awaiter(void 0, [_a], void 0, function* ({ GroupId }) {
        try {
            let messages = yield msg_1.default.findAll({
                where: { GroupId },
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
    const SentMessage = (_a) => __awaiter(void 0, [_a], void 0, function* ({ GroupId, message, token, }) {
        try {
            const jwtwebtokenverify = jsonwebtoken_1.default.verify(token, process.env.JSONWEBSECRECT);
            const { email } = jwtwebtokenverify;
            let user = yield models_1.Users.findOne({
                where: { email },
            });
            let newMessage = yield msg_1.default.create({
                message: message,
                GroupId: GroupId,
                userId: user.id,
            });
            socket.emit("NewMessages", newMessage);
        }
        catch (error) {
            console.log(error);
        }
    });
    const UploadWithMessages = (_a) => __awaiter(void 0, [_a], void 0, function* ({ GroupId, token, ContentType, }) {
        try {
            const jwtwebtokenverify = jsonwebtoken_1.default.verify(token, process.env.JSONWEBSECRECT);
            const { email } = jwtwebtokenverify;
            let user = yield models_1.Users.findOne({
                where: { email },
            });
            let filename = `${Date.now()}.${ContentType}`;
            let puturl = yield (0, services_1.putthefile)(ContentType, filename);
            let newfile = yield msg_1.default.create({
                userId: user.id,
                GroupId: GroupId,
                filename: filename,
            });
            socket.emit("UploadUrl", { url: puturl });
            let url = yield (0, services_1.gethefile)(newfile.filename);
            let NewFileWithMessages = Object.assign(Object.assign({}, newfile.dataValues), { imgandvideourl: url });
            socket.emit("UploadNewFileWithMessages", { NewFileWithMessages });
        }
        catch (error) {
            console.log(error);
        }
    });
    socket.on("getMessages", GetMessages);
    socket.on("SentMessages", SentMessage);
    socket.on("UploadWithMessage", UploadWithMessages);
};
exports.Messagehandler = Messagehandler;
//# sourceMappingURL=index.js.map