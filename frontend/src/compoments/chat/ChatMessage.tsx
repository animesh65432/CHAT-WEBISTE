import { useSelector } from "react-redux";

const ChatMessage = () => {
  const messages = useSelector((state) => state.msg.messagesarray);
  console.log(messages);

  if (messages.length === 0) {
    return <div className="text-center mt-4">No messages yet.</div>;
  }

  return (
    <div className="mt-4">
      {messages.map((message) => (
        <div key={message.id} className="flex justify-end mb-2">
          <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md">
            {message.message}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessage;
