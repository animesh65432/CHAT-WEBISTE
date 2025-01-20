import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { getUserFromToken } from "../utils"

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

    const user = await getUserFromToken(token)

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
