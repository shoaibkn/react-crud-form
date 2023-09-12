const Sequelize = require("sequelize");
const sequelize = new Sequelize("temp-project", "root", "AeAS!hJDuc7ykMckqd", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
