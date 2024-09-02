import "dotenv/config";
import http from "http";
import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import database from "./database";
import cookieparser from "cookie-parser";
import { userrouter, messageRouter, groupsrouter } from "./router";
import { Groups, Message, UserGroup, Users } from "./models";
import { Messagehandler } from "./controllers/messages";
import job from "./jobs";
const app = express();
app.use(cors({ origin: "https://chat-webiste-bplv.vercel.app" }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieparser());

const server = http.createServer(app);
// https://chat-webiste-bplv.vercel.app
const io = new Server(server, {
  cors: {
    origin: "https://chat-webiste-bplv.vercel.app",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

app.use("/users", userrouter);
app.use("/message", messageRouter);
app.use("/Groups", groupsrouter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "just start the server",
  });
});

Users.hasMany(Message);
Message.belongsTo(Users);
Groups.hasMany(Message);
Message.belongsTo(Groups);
Users.belongsToMany(Groups, { through: UserGroup });
Groups.belongsToMany(Users, { through: UserGroup });
job.start();

io.on("connection", (socket) => {
  Messagehandler(socket);
  socket.off("disconnect", () => {
    console.log("user disconnected");
  });
});
database
  .sync()
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(`server at the ${process.env.PORT}`);
    });
  })
  .catch((errors) => {
    console.log(errors);
  });
