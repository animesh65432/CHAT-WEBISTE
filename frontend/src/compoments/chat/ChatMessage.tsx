import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import User from "../../users/User";

const ChatMessage = () => {
  const messages = useSelector((state) => state.msg.messagesarray);
  const selectedGroups = useSelector((state) => state.group.selectedGroups);
  const messagesEndRef = useRef(null);
  const [showusers, Setshowusers] = useState(false);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (selectedGroups === undefined) {
    return <div className="text-center mt-4">Not Yet Select The Group</div>;
  }

  return (
    <div className="mt-4 overflow-y-auto border border-gray-300 rounded-lg">
      <div className="p-4 bg-gray-100 flex justify-between items-center">
        <h3 className="text-xl font-bold">
          {selectedGroups?.nameofthegroup.toUpperCase()}
        </h3>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => Setshowusers((prev) => !prev)}
        >
          users
        </button>
        {showusers && <User />}
      </div>
      <div className="scroll-to-bottom" ref={messagesEndRef}></div>
    </div>
  );
};

export default ChatMessage;
