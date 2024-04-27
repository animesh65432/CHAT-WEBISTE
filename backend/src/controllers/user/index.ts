import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import usermodel from "../../models/user";
import bcrypt from "bcrypt";
export const CreateTheUser = async (req: Request, res: Response) => {
  try {
    let { name, password, email, phonenumber } = req.body;
    console.log(password);
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

    const haspassword = await bcrypt.hash(password, 10);

    let NewUser = await usermodel.create({
      name: name,
      password: haspassword,
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
export const loginTheuser = async (req: Request, res: Response) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    let user = await usermodel.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "User not found. Please sign up first.",
      });
    }
    console.log(user.password);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid);

    if (!isPasswordValid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Invalid password",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
    });
  }
};
