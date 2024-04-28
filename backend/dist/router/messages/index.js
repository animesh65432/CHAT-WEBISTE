"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messages_1 = require("../../controllers/messages");
const middlewares_1 = require("../../middlewares");
const router = (0, express_1.Router)();
router.post("/Postmessage", middlewares_1.Authentication, messages_1.posthemessage);
router.get("/GettheMessages", middlewares_1.Authentication, messages_1.GettheMesaage);
exports.default = router;
