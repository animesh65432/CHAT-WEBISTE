import { v2 as cloudinary } from "cloudinary";

console.log(process.env.CLOUDYNARY_API_KEY, process.env.CLOUDYNARY_API_SECRECT, process.env.CLOUDYNARY_CLOUD_NAME, "from cloudinary")


cloudinary.config({
    api_key: process.env.CLOUDYNARY_API_KEY,
    api_secret: process.env.CLOUDYNARY_API_SECRECT,
    cloud_name: process.env.CLOUDYNARY_CLOUD_NAME,
});

export default cloudinary;

