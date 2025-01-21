import database from "../../database";
import { DataTypes, Model } from "sequelize";
import { ArchivedChatTypes } from "../../types"

interface ArchivedChatInstance
  extends Model<ArchivedChatTypes>,
  ArchivedChatTypes { }

const ArchivedChat = database.define<ArchivedChatInstance>("ArchivedChat", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
  },
  GroupId: {
    type: DataTypes.INTEGER,
  },
  message: {
    type: DataTypes.STRING,
  },
});

export default ArchivedChat;
