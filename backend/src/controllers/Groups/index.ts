import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import userGroup from "../../models/userGroup";
import Groups from "../../models/Groups";
export const CreateTheGroup = async (req: Request, res: Response) => {
  try {
    let { nameofthegroup } = req.body;
    if (!nameofthegroup)
      return res.status(StatusCodes.BAD_REQUEST).json({
        sucess: false,
        message: "Group should have name",
      });

    let NewGroup = await Groups.create({
      nameofthegroup: nameofthegroup,
    });
    let UserGroup = await userGroup.create({
      isAdmin: true,
      userGroupId: req.user.id,
      GroupId: NewGroup.id,
    });

    return res.status(StatusCodes.CREATED).json({
      sucess: true,
      data: "sucessfully created The Group",
    });
  } catch (error) {
    console.log(error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      sucess: true,
      data: error,
    });
  }
};
