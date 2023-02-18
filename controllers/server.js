const { UNAUTHORIZED } = require("../constants/ErrorKeys");

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
};
