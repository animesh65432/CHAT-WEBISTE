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
require("dotenv/config");
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./database"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const router_1 = require("./router");
const models_1 = require("./models");
const Group_1 = require("./controllers/messages/Group");
const usermessage_1 = require("./controllers/messages/usermessage");
const jobs_1 = __importDefault(require("./jobs"));
const utils_1 = require("./utils");
const app = (0, express_1.default)();
//https://chat-webiste-v5pz.vercel.app
app.use((0, cors_1.default)({ origin: "http://localhost:3000" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json({ limit: '50mb' }));
app.use((0, cookie_parser_1.default)());
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    },
});
app.use("/users", router_1.userrouter);
app.use("/message", router_1.messageRouter);
app.use("/Groups", router_1.groupsrouter);
app.use("/Aimessage", router_1.AimessageRouter);
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield models_1.Users.findAll({});
        return res.status(200).json({
            users,
            message: "start the backend server"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: `internal server errors ${error}`
        });
    }
}));
models_1.Users.hasMany(models_1.Message);
models_1.Message.belongsTo(models_1.Users);
models_1.Users.hasMany(models_1.Aimessages);
models_1.Aimessages.belongsTo(models_1.Users);
models_1.Groups.hasMany(models_1.Message);
models_1.Message.belongsTo(models_1.Groups);
models_1.Users.belongsToMany(models_1.Groups, { through: models_1.UserGroup });
models_1.Groups.belongsToMany(models_1.Users, { through: models_1.UserGroup });
models_1.Users.hasMany(models_1.UserMessages, { foreignKey: "senderId" });
models_1.Users.hasMany(models_1.UserMessages, { foreignKey: "receiverId" });
models_1.UserMessages.belongsTo(models_1.Users, { foreignKey: "senderId" });
models_1.UserMessages.belongsTo(models_1.Users, { foreignKey: "receiverId" });
jobs_1.default.start();
io.on("connection", (socket) => {
    (0, Group_1.Messagehandler)(socket);
    (0, usermessage_1.chatHandler)(socket);
    socket.off("disconnect", () => {
        console.log("user disconnected");
    });
});
database_1.default
    .sync({ force: true })
    .then(() => {
    server.listen(process.env.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            (0, utils_1.createdummyuser)({
                email: "test@gmail.com",
                name: "testname",
                password: "testpassword"
            });
            console.log(`server at the ${process.env.PORT}`);
        }
        catch (error) {
            console.log(error);
            process.exit(1);
        }
    }));
})
    .catch((errors) => {
    console.log(errors);
});
//# sourceMappingURL=index.js.map