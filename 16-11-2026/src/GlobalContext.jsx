import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {

  // Theme Management
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(prev =>
      prev === "light" ? "dark" : "light"
    );
  };

  // Authentication
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    if (username.trim() && password.trim()) {
      setUser({ username });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <GlobalContext.Provider
      value={{ theme, toggleTheme, user, login, logout }}
    >
      {children}
    </GlobalContext.Provider>
  );
}