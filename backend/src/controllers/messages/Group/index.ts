import Message from "../../../models/msg/Group";
import { Socket } from "socket.io";
import cloudinary from "../../../services/Cloudinary";
import { getUserFromToken } from "../../../utils"
import { Users } from "../../../models";

export const Messagehandler = (socket: Socket) => {
  const GetMessages = async ({ GroupId }: { GroupId: number }) => {
    if (!GroupId) {
      throw new Error('GroupId is required for this operation Getmessages');
    }

    try {
      let messages = await Message.findAll({
        where: { GroupId },
        include: {
          model: Users,
          attributes: ["image", "name"]
        }
      });

      if (messages.length === 0) {
        socket.emit("messages", []);
      } else {
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
      if (!GroupId || !message || !token) {
        throw new Error('GroupId is required for this operation Sentmessages');
      }

      let user = await getUserFromToken(token)

      let newMessage = await Message.create({
        message: message,
        GroupId: GroupId,
        userId: user.id,
      });


      socket.join(GroupId.toString());
      const data = {
        message,
        GroupId,
        userId: user.id,
        user: {
          name: user.name,
          image: user.image
        }
      }
      console.log("user data", data)
      socket.broadcast.to(GroupId.toString()).emit("NewMessages", data);
      socket.emit("NewMessages", data);
    } catch (error) {
      console.log(error);
    }
  };

  const UploadWithMessages = async ({
    GroupId,
    token,
    ContentType,
    imageurl
  }: {
    GroupId: number;
    token: string;
    ContentType: string;
    imageurl: string
  }) => {
    try {

      if (!GroupId || !token) {
        throw new Error('GroupId is required for this operation upLOADEMESSAGES');
      }

      let user = await getUserFromToken(token)
      let filename = `${Date.now()}.${ContentType}`;

      const image = await cloudinary.uploader.upload(imageurl, {
        folder: `/cloudinary/${filename}`
      });

      let newfile = await Message.create({
        userId: user.id,
        GroupId: GroupId,
        filename: filename,
        imgandvideourl: image.url
      });

      console.log(newfile, "upload the image");

      let NewFileWithMessages = { ...newfile, imgandvideourl: image.url, user: { name: user.name, image: user.image } };
      console.log(NewFileWithMessages)
      socket.join(GroupId.toString());
      socket.broadcast.to(GroupId.toString()).emit("UploadNewFileWithMessages", { NewFileWithMessages });
      socket.emit("UploadNewFileWithMessages", { NewFileWithMessages });
    } catch (error) {
      console.log(error);
    }
  };



  socket.on("getMessages", GetMessages);
  socket.on("SentMessages", SentMessage);
  socket.on("UploadWithMessage", UploadWithMessages);
};