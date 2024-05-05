import "dotenv/config";
import express from "express";
import cors from "cors";
import userrouter from "./router/user";
import database from "./database";
import user from "./models/user";
import Message from "./models/msg";
import MessageRouter from "./router/messages";
import Groups from "./models/Groups";
import userGroup from "./models/userGroup";
import Groupsrouter from "./router/Groups";
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/users", userrouter);
app.use("/message", MessageRouter);
app.use("/Groups", Groupsrouter);

user.hasMany(Message);
Message.belongsTo(user);
Groups.hasMany(Message);
Message.belongsTo(Groups);
userGroup.belongsToMany(Groups, { through: "userGroup" });
userGroup.belongsToMany(user, { through: "userGroup" });

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
