import React, { useState } from "react";

const GroupsMessage = () => {
  const [message, setMessage] = useState("");

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = () => {
    // Add your logic to send the message
    console.log("Message sent:", message);
    // Reset the message input after sending
    setMessage("");
  };

  return (
    <div className="fixed bottom-0 right-0 w-4/5 p-4 bg-white shadow-md rounded-lg">
      <div className="max-w-md mx-auto">
        <div className="bg-white shadow-md rounded-md p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Message
            </label>
            <div className="flex">
              <input
                type="text"
                id="message"
                placeholder="Type your message here..."
                value={message}
                onChange={handleMessageChange}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500 flex-1 mr-2"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GroupsMessage;
