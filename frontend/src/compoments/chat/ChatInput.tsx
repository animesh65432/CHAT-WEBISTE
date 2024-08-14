import React, { useState } from "react";
import { useSentMessage } from "../../hooks";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { MdOutlineAttachFile } from "react-icons/md";
import { ImagesandVideossend } from "./index";
const ChatInput: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const Group = useSelector((state: any) => state.group.selectedGroups);
  const [SentTheMessage] = useSentMessage();
  const [showfile, setthefile] = useState(false);
  const handleInputChange = (event: any) => {
    setInputText(event.target.value);
  };

  const handleSendMessage = async () => {
    try {
      if (!Group) {
        toast.error("Please Select The Group");
        return;
      }
      let res = await SentTheMessage({
        message: inputText,
        GroupId: Group.id,
      });

      if (res) {
        toast.success("Sucessfully Sent it");
      } else {
        setInputText("");
        toast.error("please try again");
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
