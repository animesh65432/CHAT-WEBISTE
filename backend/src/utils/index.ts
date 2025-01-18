import { Users } from "../models"
import jwt from "jsonwebtoken"
interface JWTPayload {
    email: string;
}

const getUserFromToken = async (token: string) => {
    try {
        const { email } = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JWTPayload;

        const user = await Users.findOne({
            where: { email }
        });

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    } catch (error) {
        throw new Error("Authentication failed");
    }
};

export { getUserFromToken }