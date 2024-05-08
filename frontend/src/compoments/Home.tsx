import Chat from "./chat/Chat";
import { useEffect } from "react";
import useGetMessages from "../hooks/useGetMessages";
import Groups from "../Groups/Groups";
const Home = () => {
  const [GetTheMessagesfunc] = useGetMessages();
  useEffect(() => {
    GetTheMessagesfunc();
  }, []);
  return (
    <div className="flex h-screen">
      <div className="flex-grow flex-shrink-0 w-1/3">
        <Groups />
      </div>
      <div className="flex-grow w-2/3">
        <Chat />
      </div>
    </div>
  );
};

export default Home;
