import database from "../../database";
import { DataTypes, Model } from "sequelize";
interface GroupTypes {
  id?: number;
  nameofthegroup: string;
}

interface GroupIntances extends Model<GroupTypes>, GroupTypes {}
const Groups = database.define<GroupIntances>("Group", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nameofthegroup: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default Groups;
