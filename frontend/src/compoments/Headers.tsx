import React from "react";
import { chaticon } from "../assets/images";

const Headers: React.FC = () => {
  return (
    <div className="bg-gray-900 py-4 flex items-center justify-between px-4">
      <div className="flex items-center">
        <img src={chaticon} alt="Chat Icon" className="h-8 w-8 mr-2" />
        <p className="text-white text-lg font-semibold">
          Welcome To The Chat App
        </p>
      </div>
    </div>
  );
};

export default Headers;
