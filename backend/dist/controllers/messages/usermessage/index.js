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
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatHandler = void 0;
const models_1 = require("../../../models");
const sequelize_1 = require("sequelize");
const utils_1 = require("../../../utils");
const chatHandler = (socket) => {
    // Store user ID to socket mapping
    let currentUserId = null;
    // Handle initial connection
    socket.on("authenticate", (_a) => __awaiter(void 0, [_a], void 0, function* ({ token }) {
        try {
            console.log(token, "Get token from frontend");
            const user = yield (0, utils_1.getUserFromToken)(token);
            currentUserId = user.id;
            // Join user's personal room
            console.log(`CuurentUserId ${user.id}`);
            socket.join(`user_${user.id}`);
            console.log(`User ${user.id} authenticated and joined their room`);
        }
        catch (error) {
            socket.emit("error", { message: "Authentication failed" });
        }
    }));
    // Handle sending messages
    const handleSendMessage = (_a) => __awaiter(void 0, [_a], void 0, function* ({ message, receiverId, token }) {
        try {
            const sender = yield (0, utils_1.getUserFromToken)(token);
            // Validate receiver exists
            const receiver = yield models_1.Users.findOne({
                where: { id: receiverId }
            });
            if (!receiver) {
                socket.emit("error", { message: "Receiver not found" });
                return;
            }
            // Create and save message
            const newMessage = yield models_1.UserMessages.create({
                senderId: sender.id,
                receiverId,
                message,
            });
            // Emit to both sender and receiver rooms
            socket.emit("messageSent", { message: newMessage });
            socket.to(`user_${receiverId}`).emit("messageReceived", {
                message: newMessage,
                sender: {
                    id: sender.id,
                    // Add other sender details you want to include
                }
            });
            console.log(`Message sent from ${sender.id} to ${receiverId}`);
        }
        catch (error) {
            console.error("Error sending message:", error);
            socket.emit("error", { message: "Failed to send message" });
        }
    });
    const handleGetMessages = (_a) => __awaiter(void 0, [_a], void 0, function* ({ receiverId, token }) {
        try {
            const user = yield (0, utils_1.getUserFromToken)(token);
            const messages = yield models_1.UserMessages.findAll({
                where: {
                    [sequelize_1.Op.or]: [
                        { senderId: user.id, receiverId },
                        { senderId: receiverId, receiverId: user.id }
                    ]
                },
                order: [['createdAt', 'ASC']] // Order messages by time
            });
            socket.emit("messageHistory", { messages });
        }
        catch (error) {
            console.error("Error fetching messages:", error);
            socket.emit("error", { message: "Failed to fetch messages" });
        }
    });
    // Handle disconnection
    socket.on("disconnect", () => {
        if (currentUserId) {
            console.log(`User ${currentUserId} disconnected`);
        }
    });
    socket.on("sendMessage", handleSendMessage);
    socket.on("getMessagesForUser", handleGetMessages);
};
exports.chatHandler = chatHandler;
//# sourceMappingURL=index.js.map