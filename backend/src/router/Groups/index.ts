import { Router } from "express";
import {
  CreateTheGroup,
  jointhroughadmin,
  GetAllTheGroups,
  JoinTheGroup,
  removeuser,
} from "../../controllers/Groups";
import { Authentication } from "../../middlewares";
const Groupsrouter = Router();

Groupsrouter.post("/createGroup", Authentication, CreateTheGroup);
Groupsrouter.post("/JoinGroupthroungadmin/:id", Authentication, jointhroughadmin);
Groupsrouter.get("/Groupusers", Authentication, GetAllTheGroups);
Groupsrouter.post("/removeuser/", Authentication, removeuser);
Groupsrouter.post("/JoinTheGroup/:id", Authentication, JoinTheGroup);

export default Groupsrouter;
