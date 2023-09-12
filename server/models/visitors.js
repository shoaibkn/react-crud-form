const Sequelize = require("sequelize");
const sequelize = require("./index");

const Visitors = sequelize.define("visitors", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  visitor: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  employee_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "employees",
      key: "id",
    },
  },
  work: {
    type: Sequelize.STRING(2500),
    allowNull: false,
  },
});

module.exports = Visitors;
