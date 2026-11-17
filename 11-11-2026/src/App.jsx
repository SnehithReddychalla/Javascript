import CompleteEmployeeApp from "./CompleteEmployeeApp";
import CrudTesting from "./CrudTesting";
import EmployeeManagement from "./EmployeeManagement";
import EmployeeAPI from "./services/EmployeeAPI";
import ApiStatus from "./ApiStatus";
import AsyncThunkAPI from "./AsyncThunkAPI";
import GlobalStateAPI from "./GlobalStateAPI";
import { useContext } from "react";
import { ThemeContext } from "./Context/ThemeContext";

function App() {

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <h1>Context API Theme Management</h1>

      <h2>Current Theme: {theme}</h2>
      <GlobalStateAPI/>
      <AyncThunkAPI />
      <ApiStatus/>
      <EmployeeSearch/>
      <EmployeeManagement/>
      <CrudTesting/>
      <CompleteEmployeeApp/>

      <button onClick={toggleTheme}>
        Change Theme
      </button>
    </div>
  );
}

export default App;