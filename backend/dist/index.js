"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./router/user"));
const database_1 = __importDefault(require("./database"));
const user_2 = __importDefault(require("./models/user"));
const msg_1 = __importDefault(require("./models/msg"));
const messages_1 = __importDefault(require("./router/messages"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use("/users", user_1.default);
app.use("/message", messages_1.default);
user_2.default.hasMany(msg_1.default);
msg_1.default.belongsTo(user_2.default);
database_1.default
    .sync({ force: true })
    .then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`server at the ${process.env.PORT}`);
    });
})
    .catch((errors) => {
    console.log(errors);
});
