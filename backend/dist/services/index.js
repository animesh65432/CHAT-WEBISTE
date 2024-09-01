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
Object.defineProperty(exports, "__esModule", { value: true });
exports.putthefile = exports.gethefile = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
console.log(process.env.Secret_access_key, process.env.Access_key, process.env.BUCKET_NAME);
const s3client = new client_s3_1.S3Client({
    credentials: {
        secretAccessKey: process.env.Secret_access_key,
        accessKeyId: process.env.Access_key,
    },
    region: "eu-north-1",
});
const gethefile = (key) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const command = new client_s3_1.GetObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: key,
        });
        let url = yield (0, s3_request_presigner_1.getSignedUrl)(s3client, command);
        return url;
    }
    catch (error) {
        console.log(error);
    }
});
exports.gethefile = gethefile;
const putthefile = (ContentType, key) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({
        Bucket: process.env.BUCKET_NAME,
        Key: key,
        ContentType: ContentType,
    });
    console.log(ContentType);
    try {
        const command = new client_s3_1.PutObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: key,
            ContentType: ContentType,
        });
        const url = yield (0, s3_request_presigner_1.getSignedUrl)(s3client, command);
        console.log(url);
        return url;
    }
    catch (error) {
        console.log(error);
    }
});
exports.putthefile = putthefile;
