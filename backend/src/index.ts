import "dotenv/config";
import express from "express";
import cors from "cors";
import userrouter from "./router/user";
import database from "./database";
import user from "./models/user";
import Message from "./models/msg";
import MessageRouter from "./router/messages";
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/users", userrouter);
app.use("/message", MessageRouter);

user.hasMany(Message);
Message.belongsTo(user);
database
  .sync({ force: true })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server at the ${process.env.PORT}`);
    });
  })
  .catch((errors) => {
    console.log(errors);
  });
