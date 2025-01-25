"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
console.log(process.env.CLOUDYNARY_API_KEY, process.env.CLOUDYNARY_API_SECRECT, process.env.CLOUDYNARY_CLOUD_NAME, "from cloudinary");
cloudinary_1.v2.config({
    api_key: process.env.CLOUDYNARY_API_KEY,
    api_secret: process.env.CLOUDYNARY_API_SECRECT,
    cloud_name: process.env.CLOUDYNARY_CLOUD_NAME,
});
exports.default = cloudinary_1.v2;
//# sourceMappingURL=index.js.map