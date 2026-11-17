import React, { createContext, useState } from "react";

// Create Context
export const AppContext = createContext();

// Create Provider
export function AppProvider({ children }) {

  // Theme Management
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === "light" ? "dark" : "light"
    );
  };

  // User Authentication
  const [user, setUser] = useState(null);

  const login = (username) => {
    if (username.trim()) {
      setUser({ name: username });
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        user,
        login,
        logout
      }}
    >
      {children}
    </AppContext.Provider>
  );
}