import { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  async function addUser() {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        {
          name: "Rahul",
          email: "rahul@example.com"
        }
      );

      console.log("Response:", response.data);
      setMessage("POST request successful!");
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  }

  return (
    <div>
      <h1>POST Request</h1>

      <button onClick={addUser}>Add User</button>

      <p>{message}</p>
    </div>
  );
}

export default App;