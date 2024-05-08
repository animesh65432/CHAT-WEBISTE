import { Router } from "express";
import { sendMessage } from "../../controllers/messages";
import { Authentication } from "../../middlewares";

const router = Router();

router.post("/sendMessages", Authentication, sendMessage);

export default router;
