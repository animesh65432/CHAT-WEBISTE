import AI from "../../../services/GemiAI"
import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { Aimessages } from "../../../models"
const sendmessages = async (req: Request, res: Response) => {
    try {
        const { message } = req.body
        const result = await AI.generateContent(message)
        const textresposne = result.response.text()
        const userid = Number(req.user.id)

        console.log(textresposne, "from ai response")

        await Aimessages.create({
            Yourmessage: message,
            userid,
            message: textresposne
        })


        return res.status(StatusCodes.ACCEPTED).json({
            text: textresposne
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

        const userid = Number(req.user.id)
        const messages = await Aimessages.findAll({
            where: {
                userid
            },
            attributes: {
                exclude: ["userid"]
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