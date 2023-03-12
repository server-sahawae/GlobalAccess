const Controller = require("../controllers/server");
const {
  CheckAnyToken,
  AllowedApplicationAccess,
} = require("../middlewares/Auth");

const routes = require("express").Router();

routes.get(
  "/",
  CheckAnyToken,
  AllowedApplicationAccess,
  Controller.getTokenDetail
);
routes.get(
  "/globalfiles",
  CheckAnyToken,
  AllowedApplicationAccess,
  Controller.getAuthGlobalFiles
);
routes.get(
  "/:UserId",
  // CheckAnyToken,
  AllowedApplicationAccess,
  Controller.getUserName
);

module.exports = routes;
