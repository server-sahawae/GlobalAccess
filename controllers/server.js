const { UNAUTHORIZED, NO_DATA } = require("../constants/ErrorKeys");
const { Profile, User } = require("../models");
module.exports = class Controller {
  static async getTokenDetail(req, res, next) {
    try {
      if (req.access.Application.id == req.headers.applicationid) {
        const { UserId } = req.access;
        const { id: CompanyId } = req.access.Company;
        const { level: RoleLevel } = req.access.Role;
        res.status(200).json({ UserId, CompanyId, RoleLevel });
      } else throw { name: UNAUTHORIZED };
    } catch (error) {
      next(error);
    }
  }

  static async getUserName(req, res, next) {
    try {
      const { UserId: id } = req.params;
      const data = await User.findOne({
        attributes: [],
        where: { id },
        include: [
          {
            model: Profile,
            attributes: ["firstName", "middleName", "lastName"],
          },
        ],
      });
      if (!data) throw { name: NO_DATA };
      res
        .status(200)
        .json(
          [
            data.Profile.firstName,
            data.Profile.middleName,
            data.Profile.lastName,
          ]
            .filter((el) => el)
            .join(" ")
        );
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getAuthGlobalFiles(req, res, next) {
    try {
      console.log("GET AUTH GLOBAL FILES");
      console.log(
        req.headers.applicationid,
        "ffeca6e1-7d93-41ae-92b9-0f24fe4a9cde"
      );
      if (
        req.headers.applicationid === "ffeca6e1-7d93-41ae-92b9-0f24fe4a9cde"
      ) {
        const { UserId } = req.access;
        const { id: ApplicationId } = req.access.Application;
        console.log(ApplicationId);
        const { id: CompanyId } = req.access.Company;
        const { level: RoleLevel } = req.access.Role;
        res.status(200).json({ UserId, CompanyId, ApplicationId, RoleLevel });
      } else throw { name: UNAUTHORIZED };
    } catch (error) {
      next(error);
    }
  }
};
