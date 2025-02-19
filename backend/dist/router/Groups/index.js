"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Groups_1 = require("../../controllers/Groups");
const middlewares_1 = require("../../middlewares");
const Groupsrouter = (0, express_1.Router)();
Groupsrouter.post("/createGroup", middlewares_1.Authentication, Groups_1.CreateTheGroup);
Groupsrouter.post("/JoinGroupthroungadmin", middlewares_1.Authentication, Groups_1.jointhroughadmin);
Groupsrouter.get("/Groupusers", middlewares_1.Authentication, Groups_1.GetAllTheGroups);
Groupsrouter.delete("/removeuser", middlewares_1.Authentication, Groups_1.removeuser);
Groupsrouter.get("/CheckAdminOrnot/:GroupId", middlewares_1.Authentication, Groups_1.isAdminOrNot);
Groupsrouter.post("/MakeAdmin", middlewares_1.Authentication, Groups_1.makeadmin);
exports.default = Groupsrouter;
//# sourceMappingURL=index.js.map