import database from "../../database";
import { DataTypes } from "sequelize";

const userGroup = database.define("userGroup", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
  },
  isstrictGroup: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default userGroup;
