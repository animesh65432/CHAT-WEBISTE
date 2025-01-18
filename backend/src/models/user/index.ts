import database from "../../database";
import { DataTypes, Model } from "sequelize";

export interface UserTypes {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface UserInstance extends Model<UserTypes>, UserTypes { }

const users = database.define<UserInstance>("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default users;
