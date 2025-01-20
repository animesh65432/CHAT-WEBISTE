import { Socket } from "socket.io";
import { Users, UserMessages } from "../../../models";
import { Op } from "sequelize";
import { getUserFromToken } from "../../../utils";

interface MessagePayload {
    message: string;
    receiverId: number;
    token: string;
}

export const chatHandler = (socket: Socket) => {
    // Store user ID to socket mapping
    let currentUserId: number | null = null;

    // Handle initial connection
    socket.on("authenticate", async ({ token }: { token: string }) => {
        try {

            console.log(token, "Get token from frontend")
            const user = await getUserFromToken(token);
            currentUserId = user.id;

            // Join user's personal room

            console.log(`CuurentUserId ${user.id}`)
            socket.join(`user_${user.id}`);

            console.log(`User ${user.id} authenticated and joined their room`);
        } catch (error) {
            socket.emit("error", { message: "Authentication failed" });
        }
    });

    // Handle sending messages
    const handleSendMessage = async ({ message, receiverId, token }: MessagePayload) => {
        try {
            const sender = await getUserFromToken(token);

            // Validate receiver exists
            const receiver = await Users.findOne({
                where: { id: receiverId }
            });

            if (!receiver) {
                socket.emit("error", { message: "Receiver not found" });
                return;
            }

            // Create and save message
            const newMessage = await UserMessages.create({
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
        } catch (error) {
            console.error("Error sending message:", error);
            socket.emit("error", { message: "Failed to send message" });
        }
    };

    const handleGetMessages = async ({ receiverId, token }: Omit<MessagePayload, 'message'>) => {
        try {
            const user = await getUserFromToken(token);

            const messages = await UserMessages.findAll({
                where: {
                    [Op.or]: [
                        { senderId: user.id, receiverId },
                        { senderId: receiverId, receiverId: user.id }
                    ]
                },
                order: [['createdAt', 'ASC']] // Order messages by time
            });

            socket.emit("messageHistory", { messages });
        } catch (error) {
            console.error("Error fetching messages:", error);
            socket.emit("error", { message: "Failed to fetch messages" });
        }
    };

    // Handle disconnection
    socket.on("disconnect", () => {
        if (currentUserId) {
            console.log(`User ${currentUserId} disconnected`);
        }
    });

    socket.on("sendMessage", handleSendMessage);
    socket.on("getMessagesForUser", handleGetMessages);
};