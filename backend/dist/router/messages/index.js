"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../../middlewares");
const multimediacontroler_1 = require("../../controllers/multimediacontroler");
const router = (0, express_1.Router)();
router.post("/sendfile", middlewares_1.Authentication, multimediacontroler_1.sendthefiles);
exports.default = router;
//# sourceMappingURL=index.js.map