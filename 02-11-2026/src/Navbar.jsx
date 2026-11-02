
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext.jsx";

function Navbar() {
  const { state, dispatch } = useContext(ThemeContext);

  return (
    <div>
      <h2>Current Theme: {state.theme}</h2>

      <button
        onClick={() => dispatch({ type: "TOGGLE_THEME" })}
      >
        Change Theme
      </button>
    </div>
  );
}

export default Navbar;