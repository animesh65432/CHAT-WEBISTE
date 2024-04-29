import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import UserModel from "../models/user";
import { StatusCodes } from "http-status-codes";

const secret = "animeshdutta";

export const createJWTtokens = (obj: object): string => {
  const token = jwt.sign(obj, secret);
  return token;
};

export const Authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.token as string;

    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "No token provided",
      });
    }

    const { email } = jwt.verify(token, secret) as { email: string };

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "User does not exist",
      });
    }

    req.user = user; 
    next();
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Invalid token",
    });
  }
};
