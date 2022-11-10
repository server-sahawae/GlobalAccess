"use strict";
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
module.exports = {
  async up(queryInterface, Sequelize) {
    const { data } = await axios.get("https://dummyjson.com/users");
    const profiles = [];
    const users = [];
    const addresses = [];

    data.users.forEach((el) => {
      const profileId = uuidv4();
      const userId = uuidv4();
      const addressId = uuidv4();
      const {
        address,
        username,
        email,
        password,
        firstName,
        lastName,
        maidenName: middleName,
        gender,
        phone,
        birthDate,
        image,
      } = el;
      const {
        address: newAddress,
        city,
        postalcode,
        state: province,
      } = address;
      addresses.push({
        id: addressId,
        address: newAddress,
        city,
        postalcode,
        province,
        updatedAt: new Date(),
        createdAt: new Date(),
      });
      users.push({
        id: userId,
        username,
        email,
        password,
        ProfileId: profileId,
        updatedAt: new Date(),
        createdAt: new Date(),
      });
      profiles.push({
        id: profileId,
        firstName,
        lastName,
        middleName,
        gender,
        phone,
        birthDate,
        image,
        AddressId: addressId,
        updatedAt: new Date(),
        createdAt: new Date(),
      });
    });

    await queryInterface.bulkInsert("addresses", addresses);
    await queryInterface.bulkInsert("profiles", profiles);
    await queryInterface.bulkInsert("users", users);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("addresses");
    await queryInterface.bulkDelete("profiles");
    await queryInterface.bulkDelete("users");
  },
};
