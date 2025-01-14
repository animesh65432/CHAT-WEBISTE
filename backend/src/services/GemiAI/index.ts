import { GoogleGenerativeAI } from "@google/generative-ai"
const gentAi = new GoogleGenerativeAI(process.env.GENAIAPIKEY)
const AI_Model = gentAi.getGenerativeModel({ model: "gemini-1.5-flash" })
export default AI_Model