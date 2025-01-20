import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import usermodel from "../../models/user";
import bcrypt from "bcrypt";
import { Op } from "sequelize"
import { UploadwithCloudinary, createJWTtokens } from "../../utils"
const CreateTheUser = async (req: Request, res: Response) => {
  try {
    let { name, password, email } = req.body;
    console.log(password);
    if (!name || !password || !email)
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
const loginTheuser = async (req: Request, res: Response) => {
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

const GetalltheUsers = async (req: Request, res: Response) => {
  try {
    console.log(req.user, "Current User")
    const CurrenUserId = req.user.id
    const users = await usermodel.findAll({
      attributes: { exclude: ["email", "password"] },
      where: {
        id: { [Op.ne]: CurrenUserId }
      }
    });
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

const GetTheCurrentUser = async (req: Request, res: Response) => {
  try {

    const user = req.user

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


const updateuser = async (req: Request, res: Response) => {
  try {
    const { image, name, email } = req.body;
    console.log(image, name, email, "User payload ")
    const User = req.user;

    if (!User || !User.id) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "User not authenticated.",
      });
    }

    const updateValues: Partial<{ image: string; name: string; email: string }> = {};


    if (image) {
      const imageUrl = await UploadwithCloudinary(image);
      console.log(imageUrl)
      updateValues.image = imageUrl
    }


    if (name) {
      updateValues.name = name;
    }
    if (email) {
      updateValues.email = email;
    }


    if (Object.keys(updateValues).length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "No valid fields provided for update.",
      });
    }


    await usermodel.update(updateValues, {
      where: { id: User.id },
    });


    const updatedUser = await usermodel.findByPk(User.id, {
      attributes: ["id", "name", "email", "image"],
    });

    return res.status(StatusCodes.OK).json({
      user: updatedUser,
    });
  } catch (error) {
    console.error(`Error updating user: ${error}`);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: `Error updating user.`,
    });
  }
};


export { CreateTheUser, updateuser, GetTheCurrentUser, GetalltheUsers, loginTheuser }