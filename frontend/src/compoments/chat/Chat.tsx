import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

const Chat = () => {
  return (
    <div className="flex flex-col  justify-between h-[46rem]">
      <ChatMessage />
      <ChatInput />
    </div>
  );
};

export default Chat;
