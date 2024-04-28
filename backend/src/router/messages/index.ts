import { Router } from "express";
import { posthemessage } from "../../controllers/messages";
import { Authentication } from "../../middlewares";

const router = Router();

router.post("/Postmessage", Authentication, posthemessage);

export default router;
