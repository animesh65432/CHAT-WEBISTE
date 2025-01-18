import database from "../../database";
import { Model, DataTypes } from "sequelize"
import { Users } from "../../models"

export interface UserMessagesTypes {
    id: number;
    senderId: number;
    message: string;
    receiverId: number;
}
interface UserMessageInstance extends Model<UserMessagesTypes>, UserMessagesTypes { }

const UserMessages = database.define<UserMessageInstance>("UserMessages", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    message: {
        type: DataTypes.STRING,
        allowNull: true
    },
    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: "id"
        }
    },
    receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: "id"
        }
    }
})


export default UserMessages