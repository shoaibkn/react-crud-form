const Sequelize = require("sequelize");
const sequelize = require("./index");

const Departments = sequelize.define("departments", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    autoIncrement: true,
    primaryKey: true,
  },
  department: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Departments;
