const express = require("express");
const cors = require("cors");
const sequelize = require("./models/index");
const bp = require("body-parser");

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost.localdomain:3000",
  })
);
app.use(express.json());
//app.use(bp.json());
//app.use(bp.urlencoded({ extended: true }));

const Employees = require("./models/employees");
const Visitors = require("./models/visitors");
const Departments = require("./models/departments");
app.listen(4000);

Employees.hasMany(Visitors);
Visitors.belongsTo(Employees);

sequelize.sync();
app.get("/test", (req, res) => {
  res.json("Ok");
});

app.get("/deptList", async (req, res) => {
  try {
    Departments.findAll().then((response) => {
      //console.log(response);
      res.json({ requestData: response });
    });
  } catch (err) {
    res.send(err);
  }
});

app.post("/empList", async (req, res) => {
  try {
    const { dept } = req.body;
    console.log(dept);
    const data = await Employees.findAll({ where: { department: dept } });
    res.json({ requestData: data });
  } catch (err) {
    console.log(err);
  }
});

app.post("/submitData", async (req, res) => {
  try {
    const { name, employee, dept, work } = req.body;
    //    console.log(req.body);

    const emp_id = await Employees.findOne({
      where: {
        employee_name: employee,
      },
    });
    //    console.log(emp_id.id);
    const update = await Visitors.create({
      visitor: name,
      employee_id: emp_id.id,
      work: work,
      employeeId: emp_id.id,
    });
    res.json({ message: update });
  } catch (err) {
    //    console.log(err);
    res.json({ message: err });
  }
});
