import React, { createContext, useContext, useState } from "react";

// Create Contexts
const ThemeContext = createContext();
const AuthContext = createContext();

// Main Component
function ThemeAuth() {

  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null);

  // Change Theme
  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  // Login Function
  function login() {
    setUser({
      name: "Snehith",
      email: "snehith@gmail.com"
    });
  }

  // Logout Function
  function logout() {
    setUser(null);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <AuthContext.Provider value={{ user, login, logout }}>

        <div style={{
          background: theme === "light" ? "white" : "#222",
          color: theme === "light" ? "black" : "white",
          padding: "30px",
          minHeight: "300px"
        }}>

          <h1>Theme Management</h1>

          <Theme />

          <hr />

          <h1>User Authentication</h1>

          <Authentication />

        </div>

      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}

// Theme Component
function Theme() {

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <h2>Current Theme: {theme}</h2>

      <button onClick={toggleTheme}>
        Change Theme
      </button>
    </div>
  );
}

// Authentication Component
function Authentication() {

  const { user, login, logout } = useContext(AuthContext);

  return (
    <div>

      {user ? (
        <>
          <h2>Welcome {user.name}</h2>
          <p>Email: {user.email}</p>

          <button onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <h2>You are not logged in</h2>

          <button onClick={login}>
            Login
          </button>
        </>
      )}

    </div>
  );
}

export default ThemeAuth;