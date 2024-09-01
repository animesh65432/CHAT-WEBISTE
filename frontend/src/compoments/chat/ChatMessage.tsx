import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { User } from "../../compoments";
import { RootState } from "../../reduex";
import { useSocket } from "../../Socket/SocketProvider";
interface MessageArray {
  message?: string;
  imgandvideourl?: string;
  id: number;
}
const ChatMessage: React.FC = () => {
  const selectedGroups = useSelector(
    (state: RootState) => state.group.selectedGroups
  );
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [showUsers, setShowUsers] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageArray[]>([]);
  const { socket, connecttosocket } = useSocket();

  useEffect(() => {
    if (!selectedGroups) return;

    connecttosocket();

    if (socket) {
      socket.on("messages", (newMessages: MessageArray[]) => {
        console.log("Received messages:", newMessages);
        setMessages(newMessages);
        scrollToBottom();
      });

      socket.on("NewMessages", (newMessage: MessageArray) => {
        console.log("Received new message:", newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        scrollToBottom();
      });

      socket.on(
        "UploadNewFileWithMessages",
        ({ NewFileWithMessages }: { NewFileWithMessages: MessageArray }) => {
          console.log(
            "Received new message:",
            NewFileWithMessages.imgandvideourl
          );

          setMessages((PrevMessage) => {
            const updatedMessages = [...PrevMessage, NewFileWithMessages];
            console.log(updatedMessages);
            return updatedMessages;
          });

          scrollToBottom();
        }
      );

      socket.emit("getMessages", { GroupId: selectedGroups.id });
    }

    return () => {
      socket?.off("messages");
      socket?.off("NewMessages");
    };
  }, [selectedGroups, socket]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!selectedGroups) {
    return <div className="text-center mt-4">Please select a group</div>;
  }
  console.log(messages);

  return (
    <div className="mt-4 overflow-y-auto border border-gray-300 rounded-lg">
      <div className="p-4 bg-gray-100 flex justify-between items-center">
        <h3 className="text-xl font-bold">
          {selectedGroups.nameofthegroup.toUpperCase()}
        </h3>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowUsers((prev) => !prev)}
        >
          {showUsers ? "Hide Users" : "Show Users"}
        </button>
        {showUsers && <User />}
      </div>
      <div className="messages-container">
        {messages.map((messageObj, index) => (
          <div key={index} className="message bg-gray-200 rounded p-2 mb-2">
            {messageObj.message}
            {messageObj.imgandvideourl && (
              <img
                src={messageObj.imgandvideourl}
                className="w-full h-auto rounded-lg"
                alt="Message content"
              />
            )}
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
    </div>
  );
};

export default ChatMessage;
