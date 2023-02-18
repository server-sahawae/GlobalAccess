const Controller = require("../controllers/auth");

const routes = require("express").Router();

routes.post("/user/token", Controller.userTokenValidation);

module.exports = routes;
