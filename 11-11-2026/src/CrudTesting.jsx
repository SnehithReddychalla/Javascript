import React, { useState, useEffect } from "react";
import axios from "axios";

function CrudTesting() {

  const API = "https://jsonplaceholder.typicode.com/users";

  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [editId, setEditId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  // READ - GET
  const getUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(API);
      setUsers(res.data);
      setMessage("Users loaded successfully");

    } catch (err) {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // CREATE - POST
  const addUser = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(API, {
        name,
        email,
        address: { city }
      });

      setUsers([...users, res.data]);
      setMessage("User added successfully");
      clearForm();

    } catch (err) {
      setError("Create operation failed");
    } finally {
      setLoading(false);
    }
  };

  // SELECT USER
  const editUser = (user) => {
    setEditId(user.id);
    setName(user.name);
    setEmail(user.email);
    setCity(user.address?.city || "");
  };

  // UPDATE - PUT
  const updateUser = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.put('${API}/${editId}', {
        id: editId,
        name,
        email,
        address: { city }
      });

      setUsers(users.map(user =>
        user.id === editId ? res.data : user
      ));

      setMessage("User updated successfully");
      clearForm();

    } catch (err) {
      setError("Update operation failed");
    } finally {
      setLoading(false);
    }
  };

  // PATCH
  const patchUser = async (user) => {
    const newEmail = prompt("Enter new email", user.email);

    if (!newEmail) return;

    try {
      setLoading(true);

      await axios.patch('${API}/${user.id}', {
        email: newEmail
      });

      setUsers(users.map(item =>
        item.id === user.id
          ? { ...item, email: newEmail }
          : item
      ));

      setMessage("Email updated successfully");

    } catch (err) {
      setError("Patch operation failed");
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      setLoading(true);

      await axios.delete('${API}/${id}');

      setUsers(users.filter(user => user.id !== id));
      setMessage("User deleted successfully");

    } catch (err) {
      setError("Delete operation failed");
    } finally {
      setLoading(false);
    }
  };

  // CLEAR FORM
  const clearForm = () => {
    setName("");
    setEmail("");
    setCity("");
    setEditId(null);
  };

  // SEARCH
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "25px" }}>

      <h1>CRUD Operations Testing</h1>

      {loading && <p>Loading...</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>{editId ? "Update User" : "Add User"}</h2>

      <form onSubmit={editId ? updateUser : addUser}>

        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          placeholder="City"
          value={city}
          onChange={e => setCity(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {editId ? "Update User" : "Add User"}
        </button>

        <button type="button" onClick={clearForm}>
          Clear
        </button>

      </form>

      <hr />

      <h2>Employee List</h2>

      <input
        placeholder="Search name or email"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <button onClick={getUsers} disabled={loading}>
        Refresh
      </button>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address?.city}</td>

              <td>
                <button onClick={() => editUser(user)}>
                  Edit
                </button>

                <button onClick={() => patchUser(user)}>
                  PATCH
                </button>

                <button onClick={() => deleteUser(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default CrudTesting;