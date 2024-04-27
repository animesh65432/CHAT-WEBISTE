import { Router } from "express";
import { CreateTheUser, loginTheuser } from "../../controllers/user";

const router = Router();

router.post("/Singup", CreateTheUser);
router.post("/login", loginTheuser);

export default router;
