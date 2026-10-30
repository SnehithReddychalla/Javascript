import { useState } from "react";
import axios from "axios";

function ApiResponseHandling() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  async function getUsers() {
    setLoading(true);
    setError("");
    setStatus("");
    setUsers([]);

    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );

      // 1. Check response status
      setStatus("HTTP Status: " + response.status);

      // 2. Get response data
      const data = response.data;

      // 3. Check whether data is an array
      if (!Array.isArray(data)) {
        throw new Error("Unexpected response format");
      }

      // 4. Update React state
      setUsers(data);

    } catch (err) {
      // 5. Handle errors
      if (err.response) {
        setError(
          "API Error: " + err.response.status
        );
      } else if (err.request) {
        setError("No response received from server");
      } else {
        setError(err.message);
      }
    } finally {
      // 6. Stop loading
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>API Response Handling</h1>

      <button onClick={getUsers} disabled={loading}>
        {loading ? "Loading..." : "Get Users"}
      </button>

      <p>{status}</p>

      {loading && <p>Please wait...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && users.length === 0 && (
        <p>No users to display. Click Get Users.</p>
      )}

      {users.length > 0 && (
        <div>
          <h2>User List</h2>

          {users.map((user) => (
            <p key={user.id}>
              <strong>{user.name}</strong>
              <br />
              {user.email}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default ApiResponseHandling;