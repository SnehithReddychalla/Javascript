import React, { createContext, useContext, useState } from "react";

// Create Global Context
const GlobalContext = createContext();

// Provider component
function GlobalProvider({ children }) {
  const [username, setUsername] = useState("Snehith");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <GlobalContext.Provider
      value={{
        username,
        setUsername,
        isLoggedIn,
        setIsLoggedIn
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

// Custom hook
function useGlobal() {
  return useContext(GlobalContext);
}

// Navbar component
function Navbar() {
  const { username, isLoggedIn } = useGlobal();

  return (
    <h2>
      Navbar: {isLoggedIn ? 'Welcome ${username}' : "Please Login"}
    </h2>
  );
}

// Profile component
function Profile() {
  const { username, setUsername } = useGlobal();

  return (
    <div>
      <h3>Profile: {username}</h3>
      <button onClick={() => setUsername("Snehith Reddy")}>
        Update Username
      </button>
    </div>
  );
}

// Dashboard component
function Dashboard() {
  const { isLoggedIn, setIsLoggedIn } = useGlobal();

  return (
    <div>
      <h3>Dashboard</h3>

      <p>Status: {isLoggedIn ? "Logged In" : "Logged Out"}</p>

      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        Toggle Login
      </button>
    </div>
  );
}

// Main component
export default function GlobalState() {
  return (
    <GlobalProvider>
      <div>
        <h1>Global State Management</h1>
        <Navbar />
        <Profile />
        <Dashboard />
      </div>
    </GlobalProvider>
  );
}