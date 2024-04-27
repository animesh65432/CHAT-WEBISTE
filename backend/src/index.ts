import "dotenv/config";
import express from "express";
import cors from "cors";
import userrouter from "./router/user";
import database from "./database";
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/users", userrouter);
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
