import React, { ChangeEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { MdOutlineAttachFile } from "react-icons/md";
import { ImagesandVideossend } from "./index";
import { RootState } from "../../reduex";
import { useSocket } from "../../Socket/SocketProvider";
const ChatInput: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const Group = useSelector((state: RootState) => state.group.selectedGroups);
  const [showfile, setthefile] = useState<boolean>(false);
  const token = useSelector((state: RootState) => state.auth.idtoken);
  const handleInputChange = (event: ChangeEvent<HTMLElement>) => {
    const target = event.target as HTMLInputElement;
    setInputText(target.value);
  };
  const { connecttosocket, socket } = useSocket();

  const handleSendMessage = async () => {
    try {
      if (!Group) {
        toast.error("Please Select The Group");
        return;
      }
      connecttosocket();

      console.log(socket?.connected);

      if (socket) {
        socket.emit("SentMessages", {
          GroupId: Group.id,
          message: inputText,
          token,
        });

        setInputText("");
      }
    } catch (errors) {
      console.log(errors);
      toast.error("please try again");
    }
  };

  return (
    <div className="mt-4">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:border-blue-500"
          value={inputText}
          onChange={handleInputChange}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg ml-2"
          onClick={handleSendMessage}
        >
          Send
        </button>
        <button onClick={() => setthefile((prev) => !prev)}>
          <MdOutlineAttachFile />
        </button>
        {showfile && <ImagesandVideossend />}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ChatInput;
