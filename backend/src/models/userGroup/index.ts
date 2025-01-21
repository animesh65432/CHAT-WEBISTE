import database from "../../database";
import { DataTypes, Model } from "sequelize";
import { UserGroupsTypes } from "../../types"

interface UserGroupInstacne extends Model<UserGroupsTypes>, UserGroupsTypes { }
const userGroup = database.define<UserGroupInstacne>("userGroup", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isstrictGroup: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default userGroup;
