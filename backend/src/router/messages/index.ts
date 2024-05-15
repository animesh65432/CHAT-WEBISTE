import { Router } from "express";
import { sendMessage } from "../../controllers/messages";
import { Authentication } from "../../middlewares";
import { sendthefiles } from "../../controllers/multimediacontroler";

const router = Router();

router.post("/sendMessages", Authentication, sendMessage);
router.post("/sendfile", Authentication, sendthefiles);

export default router;
