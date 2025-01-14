"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generative_ai_1 = require("@google/generative-ai");
const gentAi = new generative_ai_1.GoogleGenerativeAI(process.env.GENAIAPIKEY);
const AI_Model = gentAi.getGenerativeModel({ model: "gemini-1.5-flash" });
exports.default = AI_Model;
//# sourceMappingURL=index.js.map