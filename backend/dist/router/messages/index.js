"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messages_1 = require("../../controllers/messages");
const middlewares_1 = require("../../middlewares");
const multimediacontroler_1 = require("../../controllers/multimediacontroler");
const router = (0, express_1.Router)();
router.post("/sendMessages", middlewares_1.Authentication, messages_1.sendMessage);
router.post("/sendfile", middlewares_1.Authentication, multimediacontroler_1.sendthefiles);
exports.default = router;
//# sourceMappingURL=index.js.map