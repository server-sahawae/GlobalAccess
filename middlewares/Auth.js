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

    next();
  } catch (error) {
    next(error);
  }
}

async function CheckUserDetail(req, res, next) {
  try {
    const { access_token } = req.headers;
    const data = verifyToken(access_token);
    req.access = { ...req.access, user: data };

    next();
  } catch (error) {
    next(error);
  }
}

async function CheckAnyToken(req, res, next) {
  try {
    if (req.headers.access_token)
      req.access = verifyToken(req.headers.access_token);
    const { UserId: id, password } = req.access;
    const checkUserPassword = await User.findOne({
      where: { [Op.and]: [{ id }, { password }] },
    });
    if (!checkUserPassword) throw { name: UNAUTHORIZED };

    next();
  } catch (error) {
    next(error);
  }
}

async function AllowedApplicationAccess(req, res, next) {
  try {
    const { applicationid: id } = req.headers;
    const data = await Application.findOne({ where: { id } });
    if (!data) throw { name: UNAUTHORIZED };
    next();
  } catch (error) {
    next(error);
  }
}
module.exports = {
  CheckApplicationVersion,
  CheckUserDetail,
  CheckAnyToken,
  AllowedApplicationAccess,
};
