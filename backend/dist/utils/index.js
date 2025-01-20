"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJWTtokens = exports.UploadwithCloudinary = exports.getUserFromToken = void 0;
const models_1 = require("../models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Cloudinary_1 = __importDefault(require("../services/Cloudinary"));
const getUserFromToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = jsonwebtoken_1.default.verify(token, process.env.JSONWEBSECRECT);
        const user = yield models_1.Users.findOne({
            where: { email }
        });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
    catch (error) {
        console.log(error, "errors in authentication");
        throw new Error("Authentication failed");
    }
});
exports.getUserFromToken = getUserFromToken;
const UploadwithCloudinary = (image) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let upload = yield Cloudinary_1.default.uploader.upload(image, {
            folder: "/profilepicture"
        });
        console.log(upload);
        return upload.url;
    }
    catch (error) {
        throw new Error(`errors is uploading images ${error}`);
    }
});
exports.UploadwithCloudinary = UploadwithCloudinary;
const createJWTtokens = (obj) => {
    const token = jsonwebtoken_1.default.sign(obj, process.env.JSONWEBSECRECT);
    return token;
};
exports.createJWTtokens = createJWTtokens;
//# sourceMappingURL=index.js.map