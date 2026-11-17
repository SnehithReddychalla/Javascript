import React, { useContext } from "react";
import { EmployeeContext } from "./EmployeeContext";

function Header() {

  const { employee } = useContext(EmployeeContext);

  return (
    <div>
      <h2>Employee Management System</h2>
      <h3>Welcome, {employee.name}</h3>
    </div>
  );
}

export default Header;