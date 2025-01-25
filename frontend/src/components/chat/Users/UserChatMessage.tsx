import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from "react-redux"
import { RootState } from "@/reduex/index"
import { useSocket } from "@/Socket/SocketProvider"
import notificationsound from "../../../assets/notification-2-269292.mp3"

interface Message {
    id: number;
    message: string;
    senderId: number;
    receiverId: number;
    createdAt: string;
}

const UserChatMessage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const user = useSelector((state: RootState) => state.userMessages.SelectedUser);
    const token = useSelector((state: RootState) => state.auth.idtoken);
    const { socket, connecttosocket } = useSocket();
    const audioPlayer = useRef<HTMLAudioElement | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (!socket) {
            connecttosocket();
        }

        if (socket && user?.id) {
            // Authenticate first
            socket.emit('authenticate', { token });

            // Then get message history
            socket.emit("getMessagesForUser", { token, receiverId: user.id });

            // Listen for new messages
            socket.on("messageHistory", ({ messages }) => {
                setMessages(messages);
                scrollToBottom();
            });

            socket.on("messageSent", (data) => {
                setMessages(prev => [...prev, data.message]);
                scrollToBottom();
            });

            socket.on("messageReceived", (data) => {
                setMessages(prev => [...prev, data.message]);
                scrollToBottom();
                if (audioPlayer) {
                    audioPlayer.current?.play()
                }
            });

            socket.on("error", (error) => {
                console.error("Socket error:", error);
            });
        }

        return () => {
            socket?.off("messageHistory");
            socket?.off("messageSent");
            socket?.off("messageReceived");
            socket?.off("error");
        };
    }, [socket, user?.id, token]);

    if (!user) {
        return (
            <div className='h-[85vh] flex justify-center items-center font-mono'>
                <div>Please select a user to start chatting</div>
            </div>
        );
    }

    return (
        <div className='h-[75vh] flex flex-col overflow-y-scroll'>
            <div className='h-[5vh] flex justify-center items-center font-mono  gap-2 bg-slate-300'>
                <div>
                    <img src={user.image} className='w-12' />
                </div>
                <div>
                    {user.name.toUpperCase()}
                </div>
            </div>
            <div className='flex-1 overflow-y-auto p-4 space-y-4'>
                {messages.map((msg, index) => (
                    <div
                        key={msg.id || index}
                        className={`p-3 rounded-lg max-w-[63%] ${msg.senderId === user.id
                            ? 'ml-auto bg-black text-white'
                            : 'bg-gray-100'
                            }`}
                    >
                        <p>{msg.message}</p>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <audio ref={audioPlayer} src={notificationsound} />
        </div>
    );
};

export default UserChatMessage