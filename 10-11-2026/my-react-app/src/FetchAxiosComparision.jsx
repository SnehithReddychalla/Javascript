import React, { useState } from "react";
import axios from "axios";

function FetchAxiosComparison() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API_URL = "https://jsonplaceholder.typicode.com/users";

  // Fetch API
  const getFetchData = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Fetch API request failed");
      }

      const data = await response.json();

      setUsers(data);
      setMessage("Fetch API: Data loaded successfully!");

    } catch (error) {
      setMessage("Fetch Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Axios
  const getAxiosData = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await axios.get(API_URL);

      setUsers(response.data);
      setMessage("Axios: Data loaded successfully!");

    } catch (error) {
      setMessage("Axios Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Fetch API vs Axios</h1>

      <button onClick={getFetchData}>
        Get Data using Fetch
      </button>

      <button onClick={getAxiosData}>
        Get Data using Axios
      </button>

      {loading && <h3>Loading...</h3>}

      {message && <h3>{message}</h3>}

      <h2>User Details</h2>

      {users.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <hr />
        </div>
      ))}

    </div>
  );
}

export default FetchAxiosComparison;