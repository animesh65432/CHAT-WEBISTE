import { Error, ChatMessage, ChatInput } from "./index";
import { useSelector } from "react-redux";
import React from "react";

const Chat: React.FC = () => {
  let isuser = useSelector((state: any) => state.group.isuser);
  let userselectedGrops = useSelector(
    (state: any) => state.group.selectedGroups
  );
  if (userselectedGrops) {
    if (!isuser) {
      return <Error />;
    }
  }

  return (
    <div className="flex flex-col justify-between h-[46rem]">
      <ChatMessage />
      <ChatInput />
    </div>
  );
};

export default Chat;
