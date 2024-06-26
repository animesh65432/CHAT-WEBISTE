import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import userGroup from "../../models/userGroup";
import Groups from "../../models/Groups";
import database from "../../database";
export const CreateTheGroup = async (req: Request, res: Response) => {
  const t = await database.transaction();
  try {
    let { nameofthegroup, isstrictGroup } = req.body;
    let id = req.user.id;

    if (!nameofthegroup) {
      await t.rollback();
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Group should have a name",
      });
    }

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
        userId: id,
        GroupId: NewGroup.id,
        isstrictGroup: isstrictGroup,
      },
      {
        transaction: t,
      }
    );

    await t.commit();
    return res.status(StatusCodes.CREATED).json({
      success: true,
      data: "Successfully created the group",
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

export const removeuser = async (req: Request, res: Response) => {
  let t;
  try {
    t = await database.transaction();
    let currentuserid = req.user.id;
    let { GroupId, UserId } = req.body;

    let CheckAdmin = await userGroup.findOne({
      where: { userId: currentuserid, GroupId: GroupId },
      transaction: t,
    });

    if (!CheckAdmin.isAdmin) {
      await t.rollback();
      return res.status(StatusCodes.BAD_REQUEST).json({
        sucess: false,
        message: "you are not admin",
      });
    }

    let user = await userGroup.destroy({
      where: {
        userId: UserId,
        GroupId: GroupId,
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

export const jointhroughadmin = async (req: Request, res: Response) => {
  let t;
  try {
    t = await database.transaction();
    let { GroupId, UserId } = req.body;
    let id = req.user.id;
    let CheckAdmin = await userGroup.findOne({
      where: {
        userId: id,
        GroupId: GroupId,
      },
      transaction: t,
    });

    if (!CheckAdmin || !CheckAdmin.isAdmin) {
      await t.rollback();
      return res.status(StatusCodes.OK).json({
        success: false,
        message: "User is not an admin",
      });
    }

    let newUserGroup = await userGroup.create(
      {
        userId: UserId,
        GroupId: GroupId,
        isAdmin: false,
      },
      {
        transaction: t,
      }
    );
    console.log(newUserGroup);

    await t.commit();
    return res.status(StatusCodes.CREATED).json({
      success: true,
      data: "Successfully joined the group",
      userGroup: newUserGroup,
    });
  } catch (error) {
    await t.rollback();
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      errors: error,
    });
  }
};

export const GetAllTheGroups = async (req: Request, res: Response) => {
  try {
    let AllGroup = await Groups.findAll({});
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

export const isAdminOrNot = async (req: Request, res: Response) => {
  try {
    let UserId = req.user.id;
    let GroupId = req.params.GroupId;

    if (!GroupId)
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Group ID is required",
      });

    let GroupAndUser = await userGroup.findOne({
      where: {
        userId: UserId,
        GroupId: GroupId,
      },
    });

    if (!GroupAndUser) {
      return res.status(StatusCodes.BAD_GATEWAY).json({
        success: false,
        message: "User is not joined in this group",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      data: GroupAndUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      errors: "Internal server error",
    });
  }
};

export const makeadmin = async (req: Request, res: Response) => {
  let t;
  try {
    t = await database.transaction();
    let { UserId, GroupId } = req.body;
    let id = req.user.id;

    let CheckAdmin = await userGroup.findOne({
      where: {
        userId: id,
        GroupId: GroupId,
      },
    });

    if (!CheckAdmin && !CheckAdmin.isAdmin) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        Sucess: false,
        errors: "user is not admin",
      });
    }

    let userWithGroup = await userGroup.findOne({
      where: {
        userId: UserId,
        GroupId: GroupId,
      },
    });

    if (userWithGroup) {
      let update = await userWithGroup.update(
        {
          isAdmin: true,
        },
        {
          where: {
            userId: UserId,
            GroupId: GroupId,
          },
        }
      );

      return res.status(StatusCodes.OK).json({
        sucess: true,
        data: update,
      });
    } else {
      let user = await userGroup.create({
        where: {
          userId: UserId,
          GroupId: GroupId,
          isAdmin: true,
        },
      });

      return res.status(StatusCodes.OK).json({
        sucess: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      sucess: false,
      error: "internal server errors",
    });
  }
};
