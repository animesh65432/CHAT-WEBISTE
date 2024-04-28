import database from "../../database";
import { DataTypes } from "sequelize";

const Groups = database.define("Group", {
  nameofthegroup: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Groups;
