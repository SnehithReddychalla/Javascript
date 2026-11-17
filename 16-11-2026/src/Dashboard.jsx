import React, { useContext } from "react";
import { EmployeeContext } from "./EmployeeContext";

function Dashboard() {

  const { employee, setEmployee } =
    useContext(EmployeeContext);

  const updateDepartment = () => {
    setEmployee({
      ...employee,
      department: "React Development"
    });
  };

  return (
    <div>
      <h2>Employee Dashboard</h2>

      <p>Employee: {employee.name}</p>
      <p>Role: {employee.role}</p>
      <p>Department: {employee.department}</p>

      <button onClick={updateDepartment}>
        Update Department
      </button>
    </div>
  );
}

export default Dashboard;