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
exports.CreateTheUser = void 0;
const http_status_codes_1 = require("http-status-codes");
const user_1 = __importDefault(require("../../models/user"));
const CreateTheUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { name, password, email, phonenumber } = req.body;
        if (!name || !password || !email || !phonenumber)
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                sucess: false,
                message: "invaild creadationals",
            });
        let exsitinguser = yield user_1.default.findOne({
            where: {
                email: email,
            },
        });
        console.log(exsitinguser);
        if (exsitinguser)
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                sucess: false,
                message: "user already exsit",
            });
        let NewUser = yield user_1.default.create({
            name: name,
            password: password,
            email: email,
            phonenumber: phonenumber,
        });
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({
            sucess: true,
            message: "sucessfully create the user",
        });
    }
    catch (errors) {
        console.log(errors);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            sucess: false,
            message: errors,
        });
    }
});
exports.CreateTheUser = CreateTheUser;
