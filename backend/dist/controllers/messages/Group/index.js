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
const Group_1 = __importDefault(require("../../../models/msg/Group"));
const Cloudinary_1 = __importDefault(require("../../../services/Cloudinary"));
const utils_1 = require("../../../utils");
const models_1 = require("../../../models");
const Messagehandler = (socket) => {
    const GetMessages = (_a) => __awaiter(void 0, [_a], void 0, function* ({ GroupId }) {
        if (!GroupId) {
            throw new Error('GroupId is required for this operation Getmessages');
        }
        try {
            let messages = yield Group_1.default.findAll({
                where: { GroupId },
                include: {
                    model: models_1.Users,
                    attributes: ["image", "name"]
                }
            });
            if (messages.length === 0) {
                socket.emit("messages", []);
            }
            else {
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
            if (!GroupId || !message || !token) {
                throw new Error('GroupId is required for this operation Sentmessages');
            }
            let user = yield (0, utils_1.getUserFromToken)(token);
            let newMessage = yield Group_1.default.create({
                message: message,
                GroupId: GroupId,
                userId: user.id,
            });
            socket.join(GroupId.toString());
            const data = {
                message,
                GroupId,
                userId: user.id,
                user: {
                    name: user.name,
                    image: user.image
                }
            };
            console.log("user data", data);
            socket.broadcast.to(GroupId.toString()).emit("NewMessages", data);
            socket.emit("NewMessages", data);
        }
        catch (error) {
            console.log(error);
        }
    });
    const UploadWithMessages = (_a) => __awaiter(void 0, [_a], void 0, function* ({ GroupId, token, ContentType, imageurl }) {
        try {
            if (!GroupId || !token) {
                throw new Error('GroupId is required for this operation upLOADEMESSAGES');
            }
            let user = yield (0, utils_1.getUserFromToken)(token);
            let filename = `${Date.now()}.${ContentType}`;
            const image = yield Cloudinary_1.default.uploader.upload(imageurl, {
                folder: `/cloudinary/${filename}`
            });
            let newfile = yield Group_1.default.create({
                userId: user.id,
                GroupId: GroupId,
                filename: filename,
                imgandvideourl: image.url
            });
            console.log(newfile, "upload the image");
            let NewFileWithMessages = Object.assign(Object.assign({}, newfile), { imgandvideourl: image.url, user: { name: user.name, image: user.image } });
            console.log(NewFileWithMessages);
            socket.join(GroupId.toString());
            socket.broadcast.to(GroupId.toString()).emit("UploadNewFileWithMessages", { NewFileWithMessages });
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