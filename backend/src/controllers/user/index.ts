import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import usermodel from "../../models/user";
import { createJWTtokens } from "../../middlewares";
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

    if (exsitinguser)
      return res.status(StatusCodes.BAD_REQUEST).json({
        sucess: false,
        message: "user already exsit",
      });

    const haspassword = await bcrypt.hash(password, 10);

    let idtoken = createJWTtokens({
      email: email,
      password: haspassword,
    });

    let NewUser = await usermodel.create({
      name: name,
      password: haspassword,
      email: email,
      phonenumber: phonenumber,
    });

    return res.status(StatusCodes.CREATED).json({
      sucess: true,
      message: "sucessfully create the user",
      token: idtoken,
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
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Invalid password",
      });
    }

    let idtoken = createJWTtokens({
      email: email,
      password: password,
    });

    res.cookie("token", idtoken, { maxAge: 604800000 });
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Login successful",
      token: idtoken,
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const GetalltheUsers = async (req: Request, res: Response) => {
  try {
    let users = await usermodel.findAll({});
    return res.status(StatusCodes.OK).json({
      sucesss: true,
      data: users,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      sucesss: false,
      errors: error,
    });
  }
};

export const GetTheCurrentUser = async (req: Request, res: Response) => {
  try {
    let user = await usermodel.findOne({
      where: {
        email: req.user.email,
      },
    });

    return res.status(StatusCodes.OK).json({
      sucess: true,
      data: user,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      sucesss: false,
      errors: error,
    });
  }
};
