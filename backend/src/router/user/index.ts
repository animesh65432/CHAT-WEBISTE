import { Router } from "express";
import { CreateTheUser } from "../../controllers/user";

const router = Router();

router.post("/Singup", CreateTheUser);

export default router;
