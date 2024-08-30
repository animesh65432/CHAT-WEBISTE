import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { User } from "../../compoments";
import io from "socket.io-client";
import { baseurl } from "../../utils";
interface Group {
  id: string;
  nameofthegroup: string;
}

interface Message {
  message: string;
  imgandvideourl?: string;
}

interface RootState {
  group: {
    selectedGroups: Group | null;
  };
}

const ChatMessage: React.FC = () => {
  const selectedGroups = useSelector(
    (state: RootState) => state.group.selectedGroups
  );
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [showUsers, setShowUsers] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!selectedGroups) {
      return;
    }

    const socket = io(baseurl, {
      withCredentials: true,
    });
    console.log(socket.connected);
    socket.on("messages", (newMessages: Message[]) => {
      console.log(newMessages);
      setMessages(newMessages);
      scrollToBottom();
    });
    console.log(selectedGroups.id);
    socket.emit("getMessages", { GroupId: selectedGroups.id });
  }, [selectedGroups]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!selectedGroups) {
    return <div className="text-center mt-4">Please select a group</div>;
  }

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
