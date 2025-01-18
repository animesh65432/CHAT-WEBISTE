import database from "../../database";
import { DataTypes, Model } from "sequelize";

interface MessageModelTypes {
  message?: String;
  filename?: String;
  imgandvideourl?: String;
  GroupId?: number;
  userId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  username: string
}

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
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

export default Message;
