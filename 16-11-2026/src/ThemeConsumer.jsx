import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function ThemeConsumer() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      style={{
        background: theme === "light" ? "white" : "#222",
        color: theme === "light" ? "black" : "white",
        padding: "30px",
        textAlign: "center",
        minHeight: "200px"
      }}
    >
      <h1>Provider and Consumer</h1>

      <h2>Current Theme: {theme}</h2>

      <button onClick={toggleTheme}>
        Change Theme
      </button>
    </div>
  );
}

export default ThemeConsumer;