import React, { useContext } from "react";
import { EmployeeContext } from "./EmployeeContext";

function Profile() {

  const { employee } = useContext(EmployeeContext);

  return (
    <div>
      <h2>Employee Profile</h2>

      <p>Name: {employee.name}</p>
      <p>Role: {employee.role}</p>
      <p>Department: {employee.department}</p>
      <p>Location: {employee.location}</p>
    </div>
  );
}

export default Profile;