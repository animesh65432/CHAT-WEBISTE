import AI from "../../../services/GemiAI"
import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { Aimessages } from "../../../models"
const sendmessages = async (req: Request, res: Response) => {
    try {
        const { message } = req.body
        const result = await AI.generateContent(message)
        const textresposne = result.response.text()
        const userId = Number(req.user.id)
        console.log(userId, "user number id")

        console.log(textresposne, "from ai response")

        const Aimessage = await Aimessages.create({
            Yourmessage: message,
            userId,
            message: textresposne
        })


        return res.status(StatusCodes.ACCEPTED).json({
            message: Aimessage
        })

    } catch (error) {
        console.log(error, "Errors in sending messages")
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: `${error || "internal server errors"} `
        })

    }
}

const getmessages = async (req: Request, res: Response) => {
    try {

        const userId = Number(req.user.id)
        const messages = await Aimessages.findAll({
            where: {
                userId
            }
        })

        return res.status(StatusCodes.ACCEPTED).json({
            message: "Get the messages sucessfully",
            messages
        })
    } catch (error) {
        console.log(error, "Errors in getting the message from ai")

        return res.status(StatusCodes.ACCEPTED).json({
            message: `${error || "internal server errors"}`
        })
    }
}


export { sendmessages, getmessages }