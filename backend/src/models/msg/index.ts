import database from "../../database";
import { DataTypes } from "sequelize";

const Message = database.define("message", {
  message: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imgandvideourl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Message;
