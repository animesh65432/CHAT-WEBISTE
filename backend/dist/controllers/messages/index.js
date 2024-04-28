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
exports.posthemessage = void 0;
const msg_1 = __importDefault(require("../../models/msg"));
const http_status_codes_1 = require("http-status-codes");
const posthemessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message } = req.body;
        if (!message)
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                sucess: false,
                json: "there is no message",
            });
        const CreateNewUser = yield msg_1.default.create({
            message: message,
            userId: req.user.id,
        });
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            sucess: true,
            message: "message sucessfully sent ",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            sucess: false,
            message: error,
        });
    }
});
exports.posthemessage = posthemessage;
