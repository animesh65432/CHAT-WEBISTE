"use strict";
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
const messages_1 = require("./controllers/messages");
const jobs_1 = __importDefault(require("./jobs"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "https://chat-webiste-bplv.vercel.app" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const server = http_1.default.createServer(app);
// https://chat-webiste-bplv.vercel.app
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "https://chat-webiste-bplv.vercel.app",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
    },
});
app.use("/users", router_1.userrouter);
app.use("/message", router_1.messageRouter);
app.use("/Groups", router_1.groupsrouter);
app.get("/", (req, res) => {
    res.status(200).json({
        message: "just start the server",
    });
});
models_1.Users.hasMany(models_1.Message);
models_1.Message.belongsTo(models_1.Users);
models_1.Groups.hasMany(models_1.Message);
models_1.Message.belongsTo(models_1.Groups);
models_1.Users.belongsToMany(models_1.Groups, { through: models_1.UserGroup });
models_1.Groups.belongsToMany(models_1.Users, { through: models_1.UserGroup });
jobs_1.default.start();
io.on("connection", (socket) => {
    (0, messages_1.Messagehandler)(socket);
    socket.off("disconnect", () => {
        console.log("user disconnected");
    });
});
database_1.default
    .sync()
    .then(() => {
    server.listen(process.env.PORT, () => {
        console.log(`server at the ${process.env.PORT}`);
    });
})
    .catch((errors) => {
    console.log(errors);
});
//# sourceMappingURL=index.js.map