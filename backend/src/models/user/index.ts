import database from "../../database";
import { DataTypes, Model } from "sequelize";
import { UserTypes } from "../../types/index"

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
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

export default users;
