import { useState } from "react";

const ChatMessage = () => {
  const [messages, setMessages] = useState([]);

  if (messages.length === 0) {
    return <div className="text-center mt-4">No messages yet.</div>;
  }

  return (
    <div className="mt-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`${
            message.sender === "user1" ? "text-right" : "text-left"
          } mb-2`}
        >
          <span
            className={`inline-block px-2 py-1 rounded-lg ${
              message.sender === "user1"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {message.text}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ChatMessage;
