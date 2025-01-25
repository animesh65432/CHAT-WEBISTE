import { Users } from "../models"
import jwt from "jsonwebtoken"
import cloudinary from "../services/Cloudinary";
import { UserTypes } from "../types"
import { JWTPayload } from "../types/index"
import { Dummyuser } from "../types"
import bcryt from "bcrypt"

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

        console.log(image, "Get The images")
        let upload = await cloudinary.uploader.upload(image, {
            folder: "/Chatproject"
        })
        console.log(upload, "upload")
        return upload.url
    } catch (error) {
        throw new Error(`errors is uploading images ${error}`)
    }

}
const createJWTtokens = (obj: object): string => {
    const token = jwt.sign(obj, process.env.JSONWEBSECRECT as string);
    return token;
};

const createdummyuser = async (data: Dummyuser) => {
    try {
        let hashpassword = await bcryt.hash(data.password, 10)
        const usercreation = { ...data, password: hashpassword }
        await Users.create(usercreation)
    } catch (error) {
        console.log(error)
    }
}

export { getUserFromToken, UploadwithCloudinary, createJWTtokens, createdummyuser }