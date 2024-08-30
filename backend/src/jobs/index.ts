import { CronJob } from "cron";
import Sequelize from "sequelize";
import Messages from "../models/msg";
import ArchivedChat from "../models/ArchivedChat";

const job = new CronJob("0 0 * * *", async () => {
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
  try {
    const chats = await Messages.findAll({
      where: {
        createdAt: {
          [Sequelize.Op.lt]: yesterday,
        },
      },
    });

    const archivedChats = chats.map((chat) => ({
      message: chat.message || "",
      filename: chat.filename || "",
      imgandvideourl: chat.imgandvideourl || "",
      createdAt: chat.createdAt,
      updatedAt: chat.updatedAt,
    }));

    await ArchivedChat.bulkCreate(archivedChats);
    await Messages.destroy({
      where: {
        createdAt: {
          [Sequelize.Op.lt]: yesterday,
        },
      },
    });
  } catch (error) {
    console.error("Error executing cron job:", error);
  }
});

export default job;
