const Controller = require("../controllers/server");
const { CheckAnyToken } = require("../middlewares/Auth");

const routes = require("express").Router();

routes.get("/", CheckAnyToken, Controller.getTokenDetail);

module.exports = routes;
