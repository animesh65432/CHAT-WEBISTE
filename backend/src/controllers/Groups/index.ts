import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import userGroup from "../../models/userGroup";
import Groups from "../../models/Groups";
import users from "../../models/user";
import database from "../../database";
export const CreateTheGroup = async (req: Request, res: Response) => {
  const t = await database.transaction();
  try {
    let { nameofthegroup } = req.body;
    if (!nameofthegroup)
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Group should have name",
      });

    let NewGroup = await Groups.create(
      {
        nameofthegroup: nameofthegroup,
      },
      {
        transaction: t,
      }
    );

    let UserGroup = await userGroup.create(
      {
        isAdmin: true,
        userGroupId: req.user.id,
        GroupId: NewGroup.id,
      },
      {
        transaction: t,
      }
    );

    await t.commit();
    return res.status(StatusCodes.CREATED).json({
      success: true,
      data: "successfully created The Group",
    });
  } catch (error) {
    console.log(error);

    await t.rollback();

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      data: error,
    });
  }
};

export const JoinTheGroup = async (req: Request, res: Response) => {
  const t = await database.transaction();
  try {
    let GroupId = req.params.id;

    let Group = await userGroup.findOne({
      where: {
        GroupId: GroupId,
      },
      transaction: t,
    });

    if (!Group.isstrictGroup) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        sucess: false,
        message: "you need admin permsission",
      });
    }

    let result = await userGroup.create(
      {
        GroupId: GroupId,
        userGroupId: req.user.id,
        isAdmin: false,
      },
      {
        transaction: t,
      }
    );

    await t.commit();

    return res.status(StatusCodes.OK).json({
      sucess: true,
      data: "sucessfully join the group",
    });
  } catch (error) {
    await t.rollback();
    console.log(error);
    return res.status(StatusCodes.BAD_REQUEST).json({
      sucess: false,
      errors: error,
    });
  }
};

export const removeuser = (req: Request, res: Response) => {
  const t = await database.transaction();
  try {
    let userid = req.query.userid;
    let Groupid = req.query.Groupid;
    let CurrentUser = req.user.id;

    let CheckAdmin = await userGroup.findOne({
      where: { userGroupId: CurrentUser, GroupId: Groupid },
      transaction: t,
    });

    if (!CheckAdmin.isAdmin) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        sucess: false,
        message: "you are not admin",
      });
    }

    let user = await userGroup.destroy({
      where: {
        userGroupId: userid,
      },
      transaction: t,
    });

    await t.commit();
    return res.status(StatusCodes.OK).json({
      sucess: true,
      message: "sucessfully remove the user",
    });
  } catch (error) {
    console.log(error);
    await t.rollback();
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      sucess: false,
      message: "something went wrong",
    });
  }
};

export const jointhroughadmin = (req: Request, res: Response) => {
  const t = await database.transaction();
  try {
    let CurrentUserid = req.user.id;
    let { GroupId, newuserid } = req.body;
    let CheckAdmin = await userGroup.findOne({
      where: {
        userGroupId: CurrentUserid,
        GroupId: GroupId,
      },
      transaction: t,
    });

    if (!CheckAdmin.isAdmin) {
      return res.status(StatusCodes.Ok).json({
        sucesss: false,
        message: "user is not admin",
      });
    }

    let Newuser = await userGroup.create(
      {
        userGroupId: newuserid,
        GroupId: GroupId,
      },
      {
        transaction: t,
      }
    );

    await t.commit();
    return res.status(StatusCodes.CREATED).json({
      sucess: true,
      data: "sucessfully join the group",
    });
  } catch (error) {
    await t.rollback();
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      sucess: false,
      errors: error,
    });
  }
};

export const GetAllTheGroups = async (req: Request, res: Response) => {
  try {
    let AllGroup = await Groups.findAll({ attributes: [" nameofthegroup"] });
    return res.status(StatusCodes.OK).json({
      sucess: true,
      data: AllGroup,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      sucess: false,
      errors: error,
    });
  }
};
