import database from "../../database";
import { DataTypes, Model, STRING } from "sequelize";
interface AiMessageAttributes {
    id?: number;
    message: string;
    userid: number;
    Yourmessage: string
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
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Yourmessage: {
            type: DataTypes.TEXT,
            allowNull: false
        }

    },
    {
        tableName: "Aimessages",
        timestamps: true,
    }
);

export default Aimessages;
