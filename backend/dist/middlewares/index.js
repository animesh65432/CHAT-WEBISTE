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
exports.Authentication = exports.createJWTtokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const http_status_codes_1 = require("http-status-codes");
const createJWTtokens = (obj) => {
    const token = jsonwebtoken_1.default.sign(obj, process.env.JSONWEBSECRECT);
    return token;
};
exports.createJWTtokens = createJWTtokens;
const Authentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: "No token provided",
            });
        }
        const { email } = jsonwebtoken_1.default.verify(token, process.env.JSONWEBSECRECT);
        const user = yield user_1.default.findOne({
            where: {
                email: email,
            },
        });
        if (!user) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "User does not exist",
            });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.error(error);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Invalid token",
        });
    }
});
exports.Authentication = Authentication;
//# sourceMappingURL=index.js.map