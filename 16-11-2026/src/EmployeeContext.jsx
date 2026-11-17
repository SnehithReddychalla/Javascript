import React, { createContext, useState } from "react";

// Create Context
export const EmployeeContext = createContext();

// Create Provider
export function EmployeeProvider({ children }) {

  const [employee, setEmployee] = useState({
    name: "Snehith",
    role: "Associate Software Engineer",
    department: "Frontend Development",
    location: "Hyderabad"
  });

  return (
    <EmployeeContext.Provider
      value={{ employee, setEmployee }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}