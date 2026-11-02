import { createContext, useReducer } from "react";

export const ThemeContext = createContext();

const initialState = {
  theme: "Light"
};

function themeReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_THEME":
      return {
        ...state,
        theme: state.theme === "Light" ? "Dark" : "Light"
      };

    default:
      return state;
  }
}

export function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(
    themeReducer,
    initialState
  );

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
}