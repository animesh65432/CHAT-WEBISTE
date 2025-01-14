"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ai_1 = require("../../controllers/messages/ai");
const middlewares_1 = require("../../middlewares");
const AimessageRouter = (0, express_1.Router)();
AimessageRouter.post("/send", middlewares_1.Authentication, ai_1.sendmessages);
AimessageRouter.get("/Get", middlewares_1.Authentication, ai_1.getmessages);
exports.default = AimessageRouter;
//# sourceMappingURL=Ai.js.map