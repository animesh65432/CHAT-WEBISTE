import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { User } from "../../index";
import { RootState } from "@/reduex";
import { useSocket } from "@/Socket/SocketProvider";
import notificationsound from "../../../assets/notification-2-269292.mp3"
import { Button } from "@/components/ui/button"
import { CiUser } from "react-icons/ci";
interface MessageArray {
  message?: string;
  imgandvideourl?: string;
  id: number;
  username: string
  user: {
    name: string;
    image: string
  }
}
const GroupGroupChatMessage: React.FC = () => {
  const selectedGroups = useSelector(
    (state: RootState) => state.group.selectedGroups
  );
  const [showUsers, setShowUsers] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageArray[]>([]);
  const { socket, connecttosocket } = useSocket();
  const notificationref = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!selectedGroups) return;

    connecttosocket();

    if (socket) {
      socket.on("messages", (newMessages: MessageArray[]) => {
        console.log("Received messages:", newMessages);
        setMessages(newMessages);

      });

      socket.on("NewMessages", (newMessage: MessageArray) => {
        console.log("Received new message:", newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        notificationref?.current?.play()

      });

      socket.on(
        "UploadNewFileWithMessages",
        ({ NewFileWithMessages }: { NewFileWithMessages: MessageArray }) => {
          console.log(
            "Received new message:",
            NewFileWithMessages.imgandvideourl
          );

          setMessages((PrevMessage) => {
            const updatedMessages = [...PrevMessage, NewFileWithMessages];
            console.log(updatedMessages);
            return updatedMessages;
          });


        }
      );

      socket.emit("getMessages", { GroupId: selectedGroups.id });
    }

    return () => {
      socket?.off("messages");
      socket?.off("NewMessages");
    };
  }, [selectedGroups, socket]);


  if (!selectedGroups) {
    return <div className="text-center mt-4 flex items-center justify-center">
      <div>did not select anything</div>
    </div>;
  }
  console.log(messages);

  return (
    <div className=" border border-gray-300 rounded-lg">
      <div className="p-4 bg-gray-100 flex justify-between items-center">
        <h3 className="text-xl font-bold">
          {selectedGroups.nameofthegroup.toUpperCase()}
        </h3>
        <Button
          onClick={() => setShowUsers((prev) => !prev)}
        >
          {showUsers ? "Hide Users" : "Show Users"}
        </Button>
        {showUsers && <User />}
      </div>
      <div className="overflow-auto  p-4 h-[550px]">
        {messages.map((messageObj, index) => (
          <div key={index} className={`message bg-gray-200 rounded p-2  ${messages.length - 1 !== index ? "mb-1" : "mb-0"} flex justify-between`}>
            <div>
              {messageObj.message}
              {messageObj.imgandvideourl && (
                <img
                  src={messageObj.imgandvideourl}
                  className="w-full h-auto rounded-lg"
                  alt="Message content"
                />
              )}
            </div>
            <div className="gap-2">
              <div className="flex justify-center">
                <div><span className="text-black font-bold">{messageObj.user.name}</span></div>
                <div>{messageObj.user.image ? <img src={messageObj.user.image} className="h-10 w-10 rounded-md"></img> : <CiUser />}</div>
              </div>
            </div>
          </div>
        ))}

      </div>
      <audio src={notificationsound} ref={notificationref}></audio>

    </div>
  );
};

export default GroupGroupChatMessage;
