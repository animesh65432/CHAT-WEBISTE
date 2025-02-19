"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMessages = exports.Aimessages = exports.Message = exports.UserGroup = exports.Users = exports.ArchivedChat = exports.Groups = void 0;
const Groups_1 = __importDefault(require("./Groups"));
exports.Groups = Groups_1.default;
const ArchivedChat_1 = __importDefault(require("./ArchivedChat"));
exports.ArchivedChat = ArchivedChat_1.default;
const user_1 = __importDefault(require("./user"));
exports.Users = user_1.default;
const userGroup_1 = __importDefault(require("./userGroup"));
exports.UserGroup = userGroup_1.default;
const Group_1 = __importDefault(require("./msg/Group"));
exports.Message = Group_1.default;
const Ai_1 = __importDefault(require("./Ai"));
exports.Aimessages = Ai_1.default;
const User_1 = __importDefault(require("./msg/User"));
exports.UserMessages = User_1.default;
//# sourceMappingURL=index.js.map