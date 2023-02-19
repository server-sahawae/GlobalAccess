const fs = require("fs");

module.exports = {
  development: {
    username: "root",
    password: null,
    database: "globalaccess_development",
    host: "127.0.0.1",
    dialect: "mysql",
    dialectOptions: {
      " useUTC": false,
    },
    timezone: "+07:00",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
    dialectOptions: {
      " useUTC": false,
    },
    timezone: "+07:00",
  },
  production: {
    username: "proj9117_sahawae",
    password: "sabiqnatya25",
    database: "proj9117_GlobalAccess",
    host: "127.0.0.1",
    dialect: "mysql",
    dialectOptions: {
      " useUTC": false,
    },
    timezone: "+07:00",
  },
};
