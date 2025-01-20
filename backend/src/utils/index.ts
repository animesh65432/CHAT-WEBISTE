import { Users } from "../models"
import jwt from "jsonwebtoken"
import cloudinary from "../services/Cloudinary";
import { UserTypes } from "../models/user"
interface JWTPayload {
    email: string;
}

const getUserFromToken = async (token: string): Promise<UserTypes> => {
    try {
        const { email } = jwt.verify(
            token,
            process.env.JSONWEBSECRECT as string
        ) as JWTPayload;

        const user = await Users.findOne({
            where: { email }
        });

        if (!user) {
            throw new Error("User not found");
        }

        return user as UserTypes
    } catch (error) {
        console.log(error, "errors in authentication")
        throw new Error("Authentication failed");
    }
};

const UploadwithCloudinary = async (image: any) => {
    try {
        let upload = await cloudinary.uploader.upload(image, {
            folder: "/profilepicture"
        })
        console.log(upload)
        return upload.url
    } catch (error) {
        throw new Error(`errors is uploading images ${error}`)
    }

}
const createJWTtokens = (obj: object): string => {
    const token = jwt.sign(obj, process.env.JSONWEBSECRECT as string);
    return token;
};

export { getUserFromToken, UploadwithCloudinary, createJWTtokens }