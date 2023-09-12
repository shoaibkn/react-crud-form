const Sequelize = require("sequelize");
const sequelize = require("./index");

const Employees = sequelize.define("employees", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  employee_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  department: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Employees;
