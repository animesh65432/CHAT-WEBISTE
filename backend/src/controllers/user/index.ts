import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import usermodel from "../../models/user";
export const CreateTheUser = async (req: Request, res: Response) => {
  try {
    let { name, password, email, phonenumber } = req.body;
    if (!name || !password || !email || !phonenumber)
      return res.status(StatusCodes.BAD_REQUEST).json({
        sucess: false,
        message: "invaild creadationals",
      });

    let exsitinguser = await usermodel.findOne({
      where: {
        email: email,
      },
    });
    console.log(exsitinguser);
    if (exsitinguser)
      return res.status(StatusCodes.BAD_REQUEST).json({
        sucess: false,
        message: "user already exsit",
      });

    let NewUser = await usermodel.create({
      name: name,
      password: password,
      email: email,
      phonenumber: phonenumber,
    });

    return res.status(StatusCodes.CREATED).json({
      sucess: true,
      message: "sucessfully create the user",
    });
  } catch (errors) {
    console.log(errors);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      sucess: false,
      message: errors,
    });
  }
};
