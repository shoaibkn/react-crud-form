import React, { useEffect, useState } from "react";

export const FormPage = () => {
  const [name, setName] = useState("");
  const [employee, setEmployee] = useState("");
  const [work, setWork] = useState("");
  const [dept, setDept] = useState("");
  const [deptList, setDeptList] = useState([]);
  const [empList, setEmpList] = useState([]);

  useEffect(() => {
    try {
      fetch("http://localhost.localdomain:4000/deptList", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        response.json().then((data) => {
          setDeptList(
            data.requestData.map((dep, index) => (
              <option>{dep.department}</option>
            ))
          );
        });
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    try {
      fetch("http://localhost.localdomain:4000/empList", {
        method: "POST",
        body: JSON.stringify({ dept }),
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        response.json().then((data) => {
          setEmpList(
            data.requestData.map((emp, index) => (
              <option>{emp.employee_name}</option>
            ))
          );
        });
      });
    } catch (err) {
      console.log(err);
    }
  }, [dept]);

  async function submitAction(ev) {
    ev.preventDefault();
    if (name === "") {
      alert("Please Enter Name");
      return 0;
    }
    if (dept === "") {
      alert("Please enter Department");
      return 0;
    }
    if (employee === "") {
      alert("Please enter Employee Name");
      return 0;
    }
    if (work === "") {
      alert("Please enter work description");
      return 0;
    }

    const data = new FormData();
    data.set("name", name);
    data.set("work", work);
    data.set("employee", employee);
    data.set("dept", dept);

    console.log(name);
    const response = await fetch(
      "http://localhost.localdomain:4000/submitData",
      {
        method: "POST",
        body: JSON.stringify({ name, employee, work, dept }),
        //body: data,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    const reply = await response.json();
    console.log(reply);
  }

  return (
    <form onSubmit={submitAction}>
      <h1>Visitor Form</h1>
      <label>Full Name</label>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(ev) => setName(ev.target.value)}
      />

      <label>Department</label>
      <input
        list="dept_list"
        type="text"
        placeholder="Please select a department"
        value={dept}
        onChange={(ev) => setDept(ev.target.value)}
      ></input>
      <datalist id="dept_list">{deptList}</datalist>

      <label>Employee Name</label>
      <input
        list="emp_list"
        type="text"
        placeholder="Person to see"
        value={employee}
        onChange={(ev) => setEmployee(ev.target.value)}
      ></input>
      <datalist id="emp_list">{empList}</datalist>

      <label>Description</label>
      <textarea
        placeholder="Description of work"
        value={work}
        onChange={(ev) => setWork(ev.target.value)}
      />
      <button>Submit</button>
    </form>
  );
};
