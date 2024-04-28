import { Request, Response } from "express";
import MessageModel from "../../models/msg";
import { StatusCodes } from "http-status-codes";

export const posthemessage = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    if (!message)
      return res.status(StatusCodes.BAD_REQUEST).json({
        sucess: false,
        json: "there is no message",
      });

    const CreateNewUser = await MessageModel.create({
      message: message,
      userId: req.user.id,
    });

    return res.status(StatusCodes.OK).json({
      sucess: true,
      message: "message sucessfully sent ",
    });
  } catch (error) {
    console.log(error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      sucess: false,
      message: error,
    });
  }
};
