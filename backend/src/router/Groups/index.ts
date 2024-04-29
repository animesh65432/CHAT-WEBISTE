import { Router } from "express";
import { CreateTheGroup } from "../../controllers/Groups";
import { Authentication } from "../../middlewares";
const Groupsrouter = Router();

Groupsrouter.post("/createGroup", Authentication, CreateTheGroup);
Groupsrouter.post("/JoinGroup");
Groupsrouter.get("/Groupusers");

export default Groupsrouter;
