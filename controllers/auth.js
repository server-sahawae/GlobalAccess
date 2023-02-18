const { Op } = require("sequelize");
const {
  USER_INVALID,
  JWT_INVALID,
  UNAUTHORIZED,
  BAD_REQUEST,
} = require("../constants/ErrorKeys");
const { hash, compareHash } = require("../helpers/bcrypt");
const { createToken, verifyToken } = require("../helpers/jwt");
const { User, CompanyUsers, Application } = require("../models");

module.exports = class Controller {
  static async userTokenValidation(req, res, next) {
    try {
      console.log("Checking user token!");
      const { access_token } = req.body;
      console.log(access_token);
      if (!access_token) throw { name: BAD_REQUEST };
      const data = verifyToken(access_token);
      if (!data.UserId) throw { name: UNAUTHORIZED };
      res.status(200).json(true);
    } catch (error) {
      console.log("!!!!!!!!!!!!!!!!!");
      console.log(error);
      next(error);
    }
  }
};
