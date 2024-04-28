import React from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

const Chat = () => {
  return (
    <div className="flex flex-col h-screen justify-between">
      <ChatMessage />
      <ChatInput />
    </div>
  );
};

export default Chat;
