const { Op } = require("sequelize");
const {
  USER_INVALID,
  JWT_INVALID,
  UNAUTHORIZED,
  BAD_REQUEST,
} = require("../constants/ErrorKeys");
const { hash, compareHash } = require("../helpers/bcrypt");
const { createToken, verifyToken } = require("../helpers/jwt");
const { loggerInfo } = require("../helpers/loggerDebug");
const { User, CompanyUsers, Application } = require("../models");

module.exports = class Controller {
  static async userTokenValidation(req, res, next) {
    try {
      loggerInfo("USER TOKEN VALIDATION");
      const { access_token } = req.body;
      if (!access_token) throw { name: BAD_REQUEST };
      const data = verifyToken(access_token);
      if (!data.UserId) throw { name: UNAUTHORIZED };
      res.status(200).json(true);
    } catch (error) {
      next(error);
    }
  }
};
