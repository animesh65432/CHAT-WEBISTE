import { Socket } from "socket.io";
import { Users, UserMessages } from "../../../models";
import { Op } from "sequelize"
import { getUserFromToken } from "../../../utils"

interface MessagePayload {
    message: string;
    receiverId: number;
    token: string;
}

export const chatHandler = (socket: Socket) => {


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


            socket.to(receiverId.toString()).emit("newMessage", {
                message: newMessage
            });


            socket.emit("messageSent", { message: newMessage });

        } catch (error) {
            console.error("Error sending message:", error);
            socket.emit("error", { message: "Failed to send message" });
        }
    };

    // Handle fetching message history
    const handleGetMessages = async ({ receiverId, token }: Omit<MessagePayload, 'message'>) => {
        try {
            const user = await getUserFromToken(token);

            // Get messages between these two users (both sent and received)
            const messages = await UserMessages.findAll({
                where: {
                    [Op.or]: [
                        { senderId: user.id, receiverId },
                        { senderId: receiverId, receiverId: user.id }
                    ]
                },
                order: [['createdAt', 'ASC']],
                include: [{
                    model: Users,
                    as: 'sender',
                    attributes: ['id', 'email']
                }]
            });

            socket.emit("messageHistory", { messages });

        } catch (error) {
            console.error("Error fetching messages:", error);
            socket.emit("error", { message: "Failed to fetch messages" });
        }
    };


    socket.on("sendMessage", handleSendMessage);
    socket.on("getMessages", handleGetMessages);


};