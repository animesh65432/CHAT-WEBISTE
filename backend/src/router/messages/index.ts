import { Router } from "express";
import { posthemessage, GettheMesaage } from "../../controllers/messages";
import { Authentication } from "../../middlewares";

const router = Router();

router.post("/Postmessage", Authentication, posthemessage);
router.get("/GettheMessages", Authentication, GettheMesaage);

export default router;
