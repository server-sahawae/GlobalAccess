const axios = require("axios");

const APIFileManager = axios.create({
  baseURL: "http://localhost:3002",
  responseType: "json",
  withCredentials: true,
});

module.exports = { APIFileManager };
