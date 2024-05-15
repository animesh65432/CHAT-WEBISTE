import { Server } from "socket.io";
import { Request, Response } from "express";
import Message from "../../models/msg";
import { StatusCodes } from "http-status-codes";
import { gethefile } from "../../services";

const io = new Server(4000, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("getMessages", async (GroupId) => {
    try {
      let messages = await Message.findAll({
        where: {
          GroupId: GroupId,
        },
      });

      for (let i = 0; i < messages.length; i++) {
        if (messages[i].filename) {
          messages[i].imgandvideourl = await gethefile(messages[i].filename);
        }
      }

      socket.emit("messages", messages);
    } catch (error) {
      console.log(error);
    }
  });
});

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { GroupId, message } = req.body;

    if (!GroupId && !message)
      return res.status(StatusCodes.BAD_REQUEST).json({
        sucess: false,
        message: "groupid and messages nedded",
      });

    await Message.create({
      message: message,
      GroupId: GroupId,
      userId: req.user.id,
    });

    return res.status(StatusCodes.CREATED).json({
      sucess: true,
      message: "sucessfully created it",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error" });
  }
};
