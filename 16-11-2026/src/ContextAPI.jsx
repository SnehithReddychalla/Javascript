import React, { createContext, useContext, useState } from "react";

const MyContext = createContext();

function MyProvider({ children }) {
  const [username, setUsername] = useState("Snehith");
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <MyContext.Provider
      value={{ username, setUsername, theme, toggleTheme }}
    >
      {children}
    </MyContext.Provider>
  );
}

function Home() {
  const { username, theme, toggleTheme } = useContext(MyContext);

  return (
    <div style={{
      background: theme === "light" ? "white" : "#222",
      color: theme === "light" ? "black" : "white",
      padding: "30px"
    }}>
      <h1>Context API Example</h1>

      <h2>Welcome {username}</h2>

      <h3>Current Theme: {theme}</h3>

      <button onClick={toggleTheme}>
        Change Theme
      </button>
    </div>
  );
}

export default function ContextAPI() {
  return (
    <MyProvider>
      <Home />
    </MyProvider>
  );
}