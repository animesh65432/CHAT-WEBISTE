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

    await ArchivedChat.bulkCreate(chats);
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
