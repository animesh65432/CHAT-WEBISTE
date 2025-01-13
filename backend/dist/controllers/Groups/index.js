"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeadmin = exports.isAdminOrNot = exports.GetAllTheGroups = exports.jointhroughadmin = exports.removeuser = exports.CreateTheGroup = void 0;
const http_status_codes_1 = require("http-status-codes");
const userGroup_1 = __importDefault(require("../../models/userGroup"));
const Groups_1 = __importDefault(require("../../models/Groups"));
const database_1 = __importDefault(require("../../database"));
const CreateTheGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const t = yield database_1.default.transaction();
    try {
        let { nameofthegroup, isstrictGroup } = req.body;
        let id = req.user.id;
        if (!nameofthegroup) {
            yield t.rollback();
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Group should have a name",
            });
        }
        let checktheGroups = yield Groups_1.default.findOne({
            where: { nameofthegroup },
            transaction: t,
        });
        if (checktheGroups) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                message: "Group name must me unique",
            });
        }
        let NewGroup = yield Groups_1.default.create({
            nameofthegroup: nameofthegroup,
        }, {
            transaction: t,
        });
        yield userGroup_1.default.create({
            isAdmin: true,
            userId: id,
            GroupId: NewGroup.id,
            isstrictGroup: isstrictGroup,
        }, {
            transaction: t,
        });
        yield t.commit();
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({
            success: true,
            data: "Successfully created the group",
        });
    }
    catch (error) {
        console.log(error);
        yield t.rollback();
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            data: error,
        });
    }
});
exports.CreateTheGroup = CreateTheGroup;
const removeuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let t = yield database_1.default.transaction();
    try {
        let currentuserid = req.user.id;
        let { GroupId, UserId } = req.body;
        let CheckAdmin = yield userGroup_1.default.findOne({
            where: { userId: currentuserid, GroupId: GroupId },
            transaction: t,
        });
        if (!CheckAdmin) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                sucess: false,
                message: "you are not admin",
            });
        }
        if (!CheckAdmin.isAdmin) {
            yield t.rollback();
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                sucess: false,
                message: "you are not admin",
            });
        }
        let user = yield userGroup_1.default.destroy({
            where: {
                userId: UserId,
                GroupId: GroupId,
            },
            transaction: t,
        });
        yield t.commit();
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            sucess: true,
            message: "sucessfully remove the user",
        });
    }
    catch (error) {
        console.log(error);
        yield t.rollback();
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            sucess: false,
            message: "something went wrong",
        });
    }
});
exports.removeuser = removeuser;
const jointhroughadmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let t = yield database_1.default.transaction();
    try {
        let { GroupId, UserId } = req.body;
        let id = req.user.id;
        let CheckAdmin = yield userGroup_1.default.findOne({
            where: {
                userId: id,
                GroupId: GroupId,
            },
            transaction: t,
        });
        if (!CheckAdmin || !CheckAdmin.isAdmin) {
            yield t.rollback();
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                success: false,
                message: "User is not an admin",
            });
        }
        let newUserGroup = yield userGroup_1.default.create({
            userId: UserId,
            GroupId: GroupId,
            isAdmin: false,
        }, {
            transaction: t,
        });
        console.log(newUserGroup);
        yield t.commit();
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({
            success: true,
            data: "Successfully joined the group",
            userGroup: newUserGroup,
        });
    }
    catch (error) {
        yield t.rollback();
        console.log(error);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            errors: error,
        });
    }
});
exports.jointhroughadmin = jointhroughadmin;
const GetAllTheGroups = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let AllGroup = yield Groups_1.default.findAll({});
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            sucess: true,
            data: AllGroup,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            sucess: false,
            errors: error,
        });
    }
});
exports.GetAllTheGroups = GetAllTheGroups;
const isAdminOrNot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let UserId = req.user.id;
        let GroupId = req.params.GroupId;
        if (!GroupId)
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Group ID is required",
            });
        let GroupAndUser = yield userGroup_1.default.findOne({
            where: {
                userId: UserId,
                GroupId: GroupId,
            },
        });
        if (!GroupAndUser) {
            return res.status(http_status_codes_1.StatusCodes.BAD_GATEWAY).json({
                success: false,
                message: "User is not joined in this group",
            });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            data: GroupAndUser,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            errors: "Internal server error",
        });
    }
});
exports.isAdminOrNot = isAdminOrNot;
const makeadmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let transaction;
    try {
        transaction = yield database_1.default.transaction();
        const { UserId, GroupId } = req.body;
        const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!id) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                success: false,
                errors: "User not authenticated",
            });
        }
        const CheckAdmin = yield userGroup_1.default.findOne({
            where: {
                userId: id,
                GroupId: GroupId,
                isAdmin: true,
            },
        });
        if (!CheckAdmin) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                errors: "User is not an admin",
            });
        }
        const userWithGroup = yield userGroup_1.default.findOne({
            where: {
                userId: UserId,
                GroupId: GroupId,
            },
        });
        if (userWithGroup) {
            yield userWithGroup.update({ isAdmin: true }, { transaction });
            yield transaction.commit();
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                success: true,
                data: userWithGroup,
            });
        }
        else {
            const newUserGroup = yield userGroup_1.default.create({
                userId: UserId,
                GroupId: GroupId,
                isAdmin: true,
            }, { transaction });
            yield transaction.commit();
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                success: true,
                data: newUserGroup,
            });
        }
    }
    catch (error) {
        if (transaction)
            yield transaction.rollback();
        console.error(error);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: "Internal server error",
        });
    }
});
exports.makeadmin = makeadmin;
//# sourceMappingURL=index.js.map