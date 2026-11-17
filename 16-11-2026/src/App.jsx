import React, { useState,useContext } from "react";
import ShoppingCart from "./ShoppingCart.jsx";
import GlobalStatePractice from "./GlobalStatePractice.jsx";
import CreateSliceExample from "./CreateSliceExample.jsx";
import ReduxToolkit from "./ReduxToolkit.jsx";
import ReduxActions from "./ReduxActions.jsx";
import ReduxStore from "./ReduxStore.jsx";
import ReduxExample from "./ReduxExample.jsx";
import { GlobalProvider } from "./GlobalContext.jsx";
import { EmployeeProvider } from "./EmployeeContext.jsx";
import Header from "./Header.jsx";
import Profile from "./Profile.jsx";
import Dashboard from "./Dashboard.jsx";
import { UserProvider } from "./UserContext.jsx";
import UserProfile from "./UserProfile.jsx";
import { ThemeProvider } from "./ThemeContext.jsx";
import ThemeConsumer from "./ThemeConsumer.jsx";
import ContextAPI from "./ContextAPI.jsx";
import GlobalState from "./GlobalState.jsx";
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
function Home() {
  const { theme, toggleTheme, user, login, logout } =
    useContext(GlobalContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={{
      background: theme === "dark" ? "#222" : "#fff",
      color: theme === "dark" ? "#fff" : "#222",
      padding: "20px"
    }}>
      <h2>Global Context API</h2>
      <GlobalProvider>
        <Home/>
      </GlobalProvider>

      <h3>Theme: {theme}</h3>
      <button onClick={toggleTheme}>Change Theme</button>

      <hr />

      <h3>User Authentication</h3>

      {user ? (
        <>
          <h3>Welcome {user.username}</h3>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={() => login(username, password)}>
            Login
          </button>
        </>
      )}
    </div>
  );
}
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <ShoppingCart/>
          <GlobalStatePractice/>
          <CreateSliceExample/>
          <ReduxToolkit/>
          <ReduxActions/>
          <ReduxStore/>
          <GlobalState/>
          <ContextAPI/>
          <ThemeProvider>
            <ThemeConsumer/>
          </ThemeProvider>
          <UserProvider>
            <h1>React useContextExample</h1>
            <UserProfile/>
          </UserProvider>
          <EmployeeProvider>
            <div style={{ Padding: "20px"}}>
              <Header/>
              <Profile/>
              <Dashboard/>
            </div>
          </EmployeeProvider>
          
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
