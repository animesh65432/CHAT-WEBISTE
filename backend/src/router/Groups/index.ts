import { Router } from "express";
import {
  CreateTheGroup,
  jointhroughadmin,
  GetAllTheGroups,
  removeuser,
  isAdminOrNot,
  makeadmin,
} from "../../controllers/Groups";
import { Authentication } from "../../middlewares";
const Groupsrouter = Router();

Groupsrouter.post("/createGroup", Authentication, CreateTheGroup);
Groupsrouter.post("/JoinGroupthroungadmin", Authentication, jointhroughadmin);
Groupsrouter.get("/Groupusers", Authentication, GetAllTheGroups);
Groupsrouter.delete("/removeuser", Authentication, removeuser);
Groupsrouter.get("/CheckAdminOrnot/:GroupId", Authentication, isAdminOrNot);
Groupsrouter.post("/MakeAdmin", Authentication, makeadmin);
export default Groupsrouter;
