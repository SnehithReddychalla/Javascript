import { useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  async function getUsers() {
    try {
      setError("");

      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );

      setUsers(response.data);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <h1>GET Request</h1>

      <button onClick={getUsers}>Get Users</button>

      {error && <p>{error}</p>}

      {users.map((user) => (
        <p key={user.id}>
          {user.id}. {user.name} - {user.email}
        </p>
      ))}
    </div>
  );
}

export default App;