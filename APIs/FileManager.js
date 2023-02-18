const { BAD_REQUEST } = require("../constants/ErrorKeys");
const { APIFileManager } = require("./ApiManager");

const APICompanyCreate = async (data, access_token) => {
  try {
    const result = await APIFileManager("/company/create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        access_token,
      },
      data: data,
    });
    return result;
  } catch (error) {
    throw { name: BAD_REQUEST };
  }
};

module.exports = { APICompanyCreate };
