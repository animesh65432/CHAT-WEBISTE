import database from "../../database";
import { DataTypes } from "sequelize";

const ArchivedChat = database.define("ArchivedChat", {
  id: {
    type: Sequelize.INTEGER,
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
