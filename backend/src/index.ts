import "dotenv/config";
import express from "express";
import cors from "cors";
import database from "./database";
import { userrouter, messageRouter, groupsrouter } from "./router";
import { Groups, Message, UserGroup, Users } from "./models";
import job from "./jobs";
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/users", userrouter);
app.use("/message", messageRouter);
app.use("/Groups", groupsrouter);

Users.hasMany(Message);
Message.belongsTo(Users);
Groups.hasMany(Message);
Message.belongsTo(Groups);
Users.belongsToMany(Groups, { through: UserGroup });
Groups.belongsToMany(Users, { through: UserGroup });
job.start();
database
  .sync()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server at the ${process.env.PORT}`);
    });
  })
  .catch((errors) => {
    console.log(errors);
  });
