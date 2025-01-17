import database from "../../database";
import { DataTypes, Model } from "sequelize";
import { Users } from "../index"
interface AiMessageAttributes {
    id?: number;
    message: string;
    Yourmessage: string;
    userId: Number
}



interface AiMessageInstance
    extends Model<AiMessageAttributes>,
    AiMessageAttributes { }
const Aimessages = database.define<AiMessageInstance>(
    "Aimessages",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        Yourmessage: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Users,
                key: "id"
            }
        }

    },
    {
        tableName: "Aimessages",
        timestamps: true,
    },

);

export default Aimessages;
