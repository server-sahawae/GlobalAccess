const Controller = require("../controllers/access");
const {
  CheckApplicationVersion,
  CheckUserDetail,
  CheckAnyToken,
} = require("../middlewares/Auth");
const { LoginUser } = require("../middlewares/Session");

const routes = require("express").Router();
routes.post(
  "/user/company",
  CheckAnyToken,
  CheckApplicationVersion,
  Controller.postTokenUserAndCompany
);
routes.post("/user", LoginUser, Controller.LoginUser);
routes.get(
  "/user",
  CheckAnyToken,
  CheckApplicationVersion,
  CheckUserDetail,
  Controller.getAccessUser
);

module.exports = routes;
