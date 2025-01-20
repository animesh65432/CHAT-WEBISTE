import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSocket } from "@/Socket/SocketProvider";
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';
import { RootState } from '@/reduex';

const UserChatInput: React.FC = () => {
    const [message, setMessage] = useState<string>("");
    const [isSending, setIsSending] = useState(false);
    const { socket, connecttosocket } = useSocket();
    const token = useSelector((state: RootState) => state.auth.idtoken);
    const receiverId = useSelector((state: RootState) => state.userMessages.SelectedUser?.id);

    const handleSendMessage = async () => {
        if (isSending) return;

        try {
            setIsSending(true);

            if (!socket) {
                connecttosocket();
                return;
            }

            if (message.trim().length === 0) {
                toast.error("Message is empty");
                return;
            }

            if (!receiverId) {
                toast.error("Please select a user first");
                return;
            }

            socket.emit("sendMessage", { token, message, receiverId });
            setMessage("");
        } catch (error) {
            console.error("Error in sending message:", error);
            toast.error("Failed to send message");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className='flex flex-row gap-2 p-4 border-t'>
            <Input
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                placeholder="Type a message..."
                className='flex-1'
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isSending}
            />
            <Button
                className='bg-blue-600 hover:bg-blue-800 px-6'
                onClick={handleSendMessage}
                disabled={isSending}
            >
                {isSending ? 'Sending...' : 'Send'}
            </Button>
        </div>
    );
};

export default UserChatInput