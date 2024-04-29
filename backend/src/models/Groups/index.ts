import database from "../../database";
import { DataTypes } from "sequelize";

const Groups = database.define("Group", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nameofthegroup: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Groups;
