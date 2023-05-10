const routes = require("express").Router();

const accessRoutes = require("./access");
const authRoutes = require("./auth");
const serverRoutes = require("./server");

routes.use("/access", accessRoutes);
routes.use("/auth", authRoutes);
routes.use("/server", serverRoutes);

module.exports = routes;
