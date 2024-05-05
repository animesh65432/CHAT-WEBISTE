import { Router } from "express";
import {
  CreateTheUser,
  loginTheuser,
  GetalltheUsers,
  GetTheCurrentUser,
} from "../../controllers/user";
import { Authentication } from "../../middlewares";

const router = Router();

router.post("/Singup", CreateTheUser);
router.post("/login", loginTheuser);
router.get("/AllTheusers", Authentication, GetalltheUsers);
router.get("/GetTheCurrentUser", Authentication, GetTheCurrentUser);
export default router;
