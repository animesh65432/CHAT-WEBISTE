import { Router } from "express";
import { Authentication } from "../../middlewares";
import { sendthefiles } from "../../controllers/multimediacontroler";

const router = Router();

router.post("/sendfile", Authentication, sendthefiles);

export default router;
