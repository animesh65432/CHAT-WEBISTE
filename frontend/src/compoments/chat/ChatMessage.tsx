import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import User from "../../users/User";
import io from "socket.io-client";

const ChatMessage = () => {
  const selectedGroups = useSelector((state) => state.group.selectedGroups);
  const messagesEndRef = useRef(null);
  const [showUsers, setShowUsers] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!selectedGroups) {
      return; // Don't do anything if selectedGroups is not available
    }

    const socket = io("http://localhost:4000", {
      withCredentials: true,
    });

    socket.emit("getMessages", selectedGroups.id);

    socket.on("messages", (newMessages) => {
      setMessages(newMessages);
      scrollToBottom();
    });

    return () => {
      socket.disconnect();
    };
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
          {selectedGroups?.nameofthegroup.toUpperCase()}
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
          </div>
        ))}

        <div ref={messagesEndRef}></div>
      </div>
    </div>
  );
};

export default ChatMessage;
