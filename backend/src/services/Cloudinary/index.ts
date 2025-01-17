import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    api_key: process.env.CLOUDYNARY_API_KEY,
    api_secret: process.env.CLOUDYNARY_API_SECRECT,
    cloud_name: process.env.CLOUDYNARY_CLOUD_NAME,
});

export default cloudinary;

