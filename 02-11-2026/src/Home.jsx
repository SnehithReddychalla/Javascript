import { useContext } from "react";
import { ThemeContext } from "./ThemeContext.jsx";

function Home() {
  const { state } = useContext(ThemeContext);

  return (
    <div>
      <h3>Welcome to Home</h3>
      <p>Your selected theme is {state.theme}</p>
    </div>
  );
}

export default Home;