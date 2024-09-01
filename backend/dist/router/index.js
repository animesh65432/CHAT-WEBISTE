"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userrouter = exports.messageRouter = exports.groupsrouter = void 0;
const Groups_1 = __importDefault(require("./Groups"));
exports.groupsrouter = Groups_1.default;
const messages_1 = __importDefault(require("./messages"));
exports.messageRouter = messages_1.default;
const user_1 = __importDefault(require("./user"));
exports.userrouter = user_1.default;
