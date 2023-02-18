const { Op } = require("sequelize");

const {
  UNAUTHORIZED,
  APPLICATION_INVALID,
  BAD_REQUEST,
  VERSION_OUTDATED,
} = require("../constants/ErrorKeys");
const { verifyToken } = require("../helpers/jwt");
const { Application, ApplicationVersions, User } = require("../models");

async function CheckApplicationVersion(req, res, next) {
  try {
    console.log("=======================");
    console.log("CheckApplicationVersion");
    const { applicationversionsid: id } = req.headers;
    const appVersion = await ApplicationVersions.findOne({
      where: { id },
      order: [["updatedAt", "DESC"]],
    });
    if (!appVersion) throw { name: APPLICATION_INVALID };
    const LatestVersion = await ApplicationVersions.findOne({
      where: { ApplicationId: appVersion.ApplicationId },
      order: [["updatedAt", "DESC"]],
    });
    if (appVersion.id != LatestVersion.id) throw { name: VERSION_OUTDATED };
    const appDetail = await Application.findOne({
      where: { id: LatestVersion.ApplicationId },
    });

    req.access = { ...req.access, Application: appDetail.dataValues };
    // console.log(req.access);
    console.log("=======================");

    next();
  } catch (error) {
    console.log(error);
    console.log("=======================");
    next(error);
  }
}

async function CheckUserDetail(req, res, next) {
  try {
    console.log("=======================");
    console.log("CheckUserDetail");

    const { access_token } = req.headers;
    const data = verifyToken(access_token);
    req.access = { ...req.access, user: data };
    console.log("req.access");
    console.log(req.access);
    console.log("=======================");
    next();
  } catch (error) {
    console.log("!!!!!!!!!!!!!!!!!!!!!!");
    next(error);
  }
}

async function CheckAnyToken(req, res, next) {
  try {
    console.log("=======================");
    req.access = verifyToken(req.headers.access_token);
    console.log(req.access);
    console.log("CHECK ANY TOKEN");
    const { UserId: id, password } = req.access;
    console.log({ id, password });
    const checkUserPassword = await User.findOne({
      where: { [Op.and]: [{ id }, { password }] },
    });
    console.log({ passwordDatabase: checkUserPassword?.password, password });
    if (!checkUserPassword) throw { name: UNAUTHORIZED };
    console.log("=======================");

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function AllowedCompanyAccess(req, res, next) {
  try {
  } catch (error) {}
}
module.exports = {
  CheckApplicationVersion,
  CheckUserDetail,
  CheckAnyToken,
};
