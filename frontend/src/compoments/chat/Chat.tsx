import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useEffect } from "react";
import useGetMessages from "../../hooks/useGetMessages";

const Chat = () => {
  const [GetTheMessagesfunc] = useGetMessages();
  useEffect(() => {
    GetTheMessagesfunc();
  }, []);
  return (
    <div className="flex flex-col  justify-between h-[46rem]">
      <ChatMessage />
      <ChatInput />
    </div>
  );
};

export default Chat;
