import database from "../../database";
import { DataTypes, Model } from "sequelize";
import { MessageModelTypes } from "../../types"

interface Messageinterface
  extends Model<MessageModelTypes>,
  MessageModelTypes { }

const Message = database.define<Messageinterface>("message", {
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
  }
});

export default Message;
