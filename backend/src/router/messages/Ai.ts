import { Router } from "express"
import { sendmessages, getmessages } from "../../controllers/messages/ai"
import { Authentication } from "../../middlewares"
const AimessageRouter = Router()

AimessageRouter.post("/send", Authentication, sendmessages)
AimessageRouter.get("/Get", Authentication, getmessages)

export default AimessageRouter