if (process.env.NODE_ENV !== "production") require("dotenv").config();

const express = require("express");
const ErrorHandler = require("./middlewares/ErrorHandler");
const routes = require("./routes");
const app = express();
const port = process.env.PORT || 3000;

const session = require("express-session");
const RedisStore = require("connect-redis").default;
const cors = require("cors");
const { loggerInfo } = require("./helpers/loggerDebug");
const redis = require("./config/redisConfig");
let redisStore = new RedisStore({
  client: redis,
  prefix: "GlobalAccess",
});
app.use(cors({ origin: true, credentials: true }));
app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: true, limit: 10485760 }));
app.use(express.json());
app.use(
  session({
    secret: process.env.ENCRYPTION_KEY,
    resave: true,
    saveUninitialized: false,
    store: redisStore,
  })
);

app.get("/log", (req, res) => {
  loggerInfo(`CHECK LOG`);
  res.sendFile(path.join(__dirname + "/logs.log"));
});

app.use(routes);
app.use(ErrorHandler);
app.listen(port, async () => {
  if (process.env.DEBUG) {
    loggerInfo(`Element Control listening on port ${port}`);
  } else console.log(`Element Control listening on port ${port}`);
  redis
    .on("error", (err) => loggerInfo("Redis Client Error", err))
    .on("ready", () => loggerInfo("Redis on"));
  await redis.connect();
});
