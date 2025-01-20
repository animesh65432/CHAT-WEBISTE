"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../../controllers/user");
const middlewares_1 = require("../../middlewares");
const router = (0, express_1.Router)();
router.post("/Singup", user_1.CreateTheUser);
router.post("/login", user_1.loginTheuser);
router.get("/AllTheusers", middlewares_1.Authentication, user_1.GetalltheUsers);
router.get("/GetTheCurrentUser", middlewares_1.Authentication, user_1.GetTheCurrentUser);
router.put("/update", middlewares_1.Authentication, user_1.updateuser);
exports.default = router;
//# sourceMappingURL=index.js.map