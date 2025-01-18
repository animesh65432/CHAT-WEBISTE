import Message from "../../../models/msg/Group";
import { Socket } from "socket.io";
import cloudinary from "../../../services/Cloudinary";
import { getUserFromToken } from "../../../utils"

export const Messagehandler = (socket: Socket) => {
  const GetMessages = async ({ GroupId }: { GroupId: number }) => {
    try {
      let messages = await Message.findAll({
        where: { GroupId },
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

      let user = await getUserFromToken(token)

      let newMessage = await Message.create({
        message: message,
        GroupId: GroupId,
        userId: user.id,
        username: user.name
      });


      socket.join(GroupId.toString());
      socket.broadcast.to(GroupId.toString()).emit("NewMessages", newMessage);
      socket.emit("NewMessages", newMessage);
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

      let user = await getUserFromToken(token)
      let filename = `${Date.now()}.${ContentType}`;

      const image = await cloudinary.uploader.upload(imageurl, {
        folder: `/cloudinary/${filename}`
      });

      console.log(image.url);

      let newfile = await Message.create({
        userId: user.id,
        GroupId: GroupId,
        filename: filename,
        username: user.name,
        imgandvideourl: image.url
      });

      console.log(newfile, "upload the image");

      let NewFileWithMessages = { ...newfile.dataValues, imgandvideourl: image.url };


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