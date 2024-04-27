"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifytokens = exports.createjwttokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let secret = "animeshdutta";
const createjwttokens = (obj) => {
    let token = jsonwebtoken_1.default.sign(obj, secret);
    return token;
};
exports.createjwttokens = createjwttokens;
const verifytokens = (token) => {
    let body = jsonwebtoken_1.default.verify(token, secret);
    return body;
};
exports.verifytokens = verifytokens;
