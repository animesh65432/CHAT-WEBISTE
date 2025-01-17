import Message from "../../models/msg";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { putthefile } from "../../services";

export const sendthefiles = async (req: Request, res: Response) => {
  try {
    let { GroupId, ContentType } = req.body;

    if (!GroupId || !ContentType) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        sucess: false,
        error: "grouid is needed",
      });
    }
    let filename = `${Date.now()}.${ContentType}`;

    let puturl = await putthefile(ContentType, filename);

    let messages = await Message.create({
      userId: Number(req.user.id),
      GroupId: GroupId,
      filename: filename,
    });

    console.log(puturl);

    return res.status(StatusCodes.OK).json({
      sucess: true,
      url: puturl,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      sucess: false,
      error: "internal server errors",
    });
  }
};
