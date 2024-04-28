import database from "../../database";
import { DataTypes } from "sequelize";

const Message = database.define("message", {
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default Message;
