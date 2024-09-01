import Message from "../../models/msg";
import { gethefile } from "../../services";
import { Socket } from "socket.io";
import jsonwebtoken from "jsonwebtoken";
import { Users } from "../../models";

type jsonPayload = {
  email: string;
};

export const Messagehandler = (socket: Socket) => {
  const GetMessages = async ({ GroupId }: { GroupId: number }) => {
    try {
      let messages = await Message.findAll({
        where: { GroupId },
      });

      if (messages.length === 0) {
        socket.emit("messages", []);
      } else {
        for (let i = 0; i < messages.length; i++) {
          if (messages[i].filename) {
            messages[i].imgandvideourl = await gethefile(
              messages[i].filename as string
            );
          }
        }

        socket.emit("messages", messages);
      }
    } catch (error) {
      console.log(error);
      socket.emit("messages", []);
    }
  };

  const SentMessage = async ({
    GroupId,
    message,
    token,
  }: {
    GroupId: number;
    message: string;
    token: string;
  }) => {
    try {
      const jwtwebtokenverify = jsonwebtoken.verify(
        token,
        process.env.JSONWEBSECRECT as string
      ) as jsonPayload;

      const { email } = jwtwebtokenverify;

      let user = await Users.findOne({
        where: { email },
      });

      let newMessage = await Message.create({
        message: message,
        GroupId: GroupId,
        userId: user.id,
      });

      socket.emit("NewMessages", newMessage);
    } catch (error) {
      console.log(error);
    }
  };

  socket.on("getMessages", GetMessages);
  socket.on("SentMessages", SentMessage);
};
