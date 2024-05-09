import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useSelector } from "react-redux";
import Error from "./Error";

const Chat = () => {
  let isuser = useSelector((state) => state.group.isuser);
  let userselectedGrops = useSelector((state) => state.group.selectedGroups);
  console.log(userselectedGrops);
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
