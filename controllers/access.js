const { Op } = require("sequelize");
const sequelize = require("sequelize");
const {
  Company,
  ApplicationVersions,
  AccessCompanies,
  User,
  Profile,
  AccessUsers,
  Address,
  Role,
} = require("../models");
const { verifyToken, createToken } = require("../helpers/jwt");
const {
  APPLICATION_INVALID,
  VERSION_OUTDATED,
  USER_INVALID,
  UNAUTHORIZED,
} = require("../constants/ErrorKeys");
const { compareHash } = require("../helpers/bcrypt");
const ObjectFilter = require("../helpers/ObjectFilter");
module.exports = class Controller {
  static async LoginUser(req, res, next) {
    try {
      const { username, password, exp } = req.body;
      if (!username || !password) throw { name: USER_INVALID };

      const dataUser = await User.findOne({
        where: {
          [Op.or]: [
            sequelize.where(
              sequelize.fn("BINARY", sequelize.col("username")),
              username
            ),
            sequelize.where(
              sequelize.fn("BINARY", sequelize.col("email")),
              username
            ),
          ],
        },
        include: {
          model: Profile,
          attributes: [
            "id",
            "lastname",
            "firstname",
            "middlename",
            "gender",
            "phone",
            "birthDate",
            "image",
            "address",
            "coordinates",
            "country",
            "province",
            "city",
            "district",
            "ward",
            "postalcode",
          ],
        },
      });

      if (!dataUser || !compareHash(password, dataUser.password))
        throw { name: USER_INVALID };

      const {
        id: UserId,
        username: dataUsername,
        password: dataUserPassword,
        email,
        CreatorId,
      } = dataUser;
      const result = {
        UserId,
        email,
        password: dataUserPassword,
        username: dataUsername,
        Profile: dataUser.Profile,
        CreatorId,
      };
      const access_token = createToken(result, exp);
      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getAccessUser(req, res, next) {
    try {
      const { RoleLevel, id: ApplicationId } = req.access.Application;

      const userDetail = verifyToken(req.headers.access_token);
      if (userDetail.UserId == "2a8c1619-41e1-4ac5-990a-2069276e9d52") {
        let result = await AccessCompanies.findAll({
          attributes: [],
          where: { ApplicationId },
          include: [{ model: Company, attributes: ["id", "name"] }],
        });
        result = result.map((el) => {
          return { CompanyId: el.Company.id, name: el.Company.name };
        });
        res.status(200).json(result);
      } else {
        const dataAccessUser = await AccessUsers.findAll({
          attributes: [],
          where: {
            [Op.and]: [{ ApplicationId }, { UserId: userDetail.UserId }],
          },
          include: [
            { model: Company },
            { model: Role, where: { level: RoleLevel } },
          ],
        });
        const accessUser = dataAccessUser.filter((el) => el.Role.id);
        console.log("===============ACCESS USER=========");
        // console.log(accessUser);
        if (accessUser.length < 1) throw { name: UNAUTHORIZED };
        const result = accessUser.map((el) => {
          return { CompanyId: el.Company.id, name: el.Company.name };
        });
        res.status(200).json(result);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async postTokenUserAndCompany(req, res, next) {
    try {
      const { RoleLevel, id: ApplicationId } = req.access.Application;
      const { CompanyId } = req.body;
      console.log(CompanyId, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
      const userDetail = verifyToken(req.headers.access_token);
      if (userDetail.UserId == "2a8c1619-41e1-4ac5-990a-2069276e9d52") {
        const dataCompany = await Company.findOne({ where: { id: CompanyId } });

        const dataRole = await AccessCompanies.findOne({
          where: {
            [Op.and]: [{ CompanyId }, { ApplicationId }],
          },
          include: [{ model: Role, where: { level: RoleLevel } }],
        });
        const access_token = createToken({
          ...req.access,
          Company: dataCompany,
          Role: dataRole.dataValues.Roles[0].dataValues,
        });

        console.log("=====================");
        // console.log(dataRole.dataValues.Roles[0].dataValues);
        // console.log({
        //   Company: ObjectFilter(dataCompany.dataValues),
        //   Profile: ObjectFilter(req.access.Profile),
        //   Role: dataRole.dataValues.Roles[0].dataValues.name,
        // });
        console.log("=====================");

        res.status(200).json({
          Company: ObjectFilter(dataCompany.dataValues),
          Profile: ObjectFilter({
            ...req.access.Profile,
            role: dataRole.Roles[0].name,
          }),
          access_token,
        });
        // res.status(200).json(dataRole);

        // SUPER ADMIN PRIVILEGE
      } else {
        const accessUser = await AccessUsers.findOne({
          attributes: [],
          where: {
            [Op.and]: [
              { ApplicationId },
              { CompanyId },
              { UserId: userDetail.UserId },
            ],
          },
          include: [
            { model: Company },
            { model: Role, where: { level: RoleLevel } },
          ],
        });

        if (!accessUser) throw { name: UNAUTHORIZED };
        const dataCompany = await Company.findOne({
          where: { id: accessUser.Company.id },
        });
        const access_token = createToken({
          ...req.access,
          Company: dataCompany,
          Role: accessUser.Role.dataValues,
        });
        console.log("=====================");
        console.log(accessUser.Role.dataValues);
        // console.log({
        //   Company: ObjectFilter(dataCompany.dataValues),
        //   Profile: ObjectFilter(req.access.Profile),
        //   Role: ObjectFilter(accessUser.Role.dataValues),
        // });
        console.log("=====================");
        res.status(200).json({
          Company: ObjectFilter(dataCompany.dataValues),
          Profile: ObjectFilter({
            ...req.access.Profile,
            role: accessUser.Role.dataValues.name,
          }),
          access_token,
        });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
};
