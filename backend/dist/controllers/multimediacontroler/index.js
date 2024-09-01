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
exports.sendthefiles = void 0;
const msg_1 = __importDefault(require("../../models/msg"));
const http_status_codes_1 = require("http-status-codes");
const services_1 = require("../../services");
const sendthefiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { GroupId, ContentType } = req.body;
        if (!GroupId || !ContentType) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                sucess: false,
                error: "grouid is needed",
            });
        }
        let filename = `${Date.now()}.${ContentType}`;
        let puturl = yield (0, services_1.putthefile)(ContentType, filename);
        let messages = yield msg_1.default.create({
            userId: req.user.id,
            GroupId: GroupId,
            filename: filename,
        });
        console.log(puturl);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            sucess: true,
            url: puturl,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            sucess: false,
            error: "internal server errors",
        });
    }
});
exports.sendthefiles = sendthefiles;
