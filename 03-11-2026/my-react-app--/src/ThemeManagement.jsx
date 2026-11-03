import React, { createContext, useContext, useState } from "react";

// Create Context
const ThemeContext = createContext();
const AuthContext = createContext();

// Main Component
function ThemeAuth() {

  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null);

  // Theme Management
  function toggleTheme() {
    setTheme(prev =>
      prev === "light" ? "dark" : "light"
    );
  }

  // User Login
  function login() {
    setUser({
      name: "Snehith",
      email: "snehith@gmail.com"
    });
  }

  // User Logout
  function logout() {
    setUser(null);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <AuthContext.Provider value={{ user, login, logout }}>

        <MainContent />

      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}

// Main Content Component
function MainContent() {

  const { theme } = useContext(ThemeContext);

  return (
    <div style={{
      backgroundColor: theme === "light" ? "white" : "#222",
      color: theme === "light" ? "black" : "white",
      minHeight: "400px",
      padding: "30px"
    }}>

      <h1>Global Theme Management</h1>

      <Navbar />

      <Theme />

      <hr />

      <Authentication />

    </div>
  );
}

// Navbar Component
function Navbar() {

  const { user } = useContext(AuthContext);

  return (
    <div>
      <h2>Navbar Component</h2>

      <p>
        {user ? 'Welcome ${user.name}' : "Welcome Guest"}
      </p>
    </div>
  );
}

// Theme Component
function Theme() {

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <h2>Theme Management</h2>

      <p>Current Theme: {theme}</p>

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
      <h2>User Authentication</h2>

      {user ? (
        <>
          <h3>Welcome, {user.name}</h3>

          <p>Email: {user.email}</p>

          <button onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <p>You are not logged in.</p>

          <button onClick={login}>
            Login
          </button>
        </>
      )}

    </div>
  );
}

export default ThemeAuth;