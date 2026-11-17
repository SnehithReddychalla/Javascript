import React, { createContext, useState } from "react";

// Create Context
export const UserContext = createContext();

// Create Provider
export function UserProvider({ children }) {

  const [user, setUser] = useState({
    name: "Snehith",
    role: "Associate Software Engineer",
    department: "Frontend Development"
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}