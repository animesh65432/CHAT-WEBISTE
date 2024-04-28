import React, { useState } from "react";
import usesentMessages from "../../hooks/useSentMessage";
import { ToastContainer, toast } from "react-toastify";
const ChatInput = () => {
  const [inputText, setInputText] = useState("");
  const [SentTheMessage] = usesentMessages();
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendMessage = async () => {
    try {
      let res = await SentTheMessage({
        message: inputText,
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
      </div>
      <ToastContainer />
    </div>
  );
};

export default ChatInput;
