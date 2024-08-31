import React from "react";
import { chaticon } from "../assets/images";
import { deleteidtoken } from "../reduex/Auth";
import { useDispatch } from "react-redux";

const Headers: React.FC = () => {
  const dispatch = useDispatch();

  const onuserlogout = () => {
    dispatch(deleteidtoken());
  };
  return (
    <div className="bg-gray-900 py-4 flex items-center justify-between px-4">
      <div className="flex items-center">
        <img src={chaticon} alt="Chat Icon" className="h-8 w-8 mr-2" />
        <p className="text-white text-lg font-semibold">
          Welcome To The Chat App
        </p>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onuserlogout}
      >
        logout
      </button>
    </div>
  );
};

export default Headers;
