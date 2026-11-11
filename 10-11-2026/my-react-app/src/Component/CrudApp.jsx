import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CrudApp.css";

function CrudApp() {

  const API = "https://jsonplaceholder.typicode.com/users";

  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterCity, setFilterCity] = useState("");

  // READ
  const getUsers = async () => {
    try {
      const response = await axios.get(API);
      setUsers(response.data);
    } catch (error) {
      console.log("Error fetching users", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // CREATE AND UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name: name,
      email: email,
      address: { city: city }
    };

    try {
      if (editId !== null) {

        const response = await axios.put(
          '${API}/${editId}',
          userData
        );

        setUsers(users.map((user) =>
          user.id === editId
            ? { ...user, ...response.data }
            : user
        ));

        setEditId(null);

      } else {

        const response = await axios.post(API, userData);

        setUsers([...users, response.data]);
      }

      setName("");
      setEmail("");
      setCity("");

    } catch (error) {
      console.log("Error saving user", error);
    }
  };

  // EDIT
  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setCity(user.address.city);
    setEditId(user.id);
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete('${API}/${id}');

      setUsers(users.filter((user) => user.id !== id));

    } catch (error) {
      console.log("Error deleting user", error);
    }
  };

  // SEARCH AND FILTER
  const filteredUsers = users.filter((user) => {

    const searchMatch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const cityMatch =
      filterCity === "" ||
      user.address.city === filterCity;

    return searchMatch && cityMatch;
  });

  const cities = [...new Set(
    users.map((user) => user.address.city)
  )];

  return (
    <div className="crud-container">

      <h1>Axios CRUD Application</h1>

      <h2>{editId !== null ? "Update User" : "Add User"}</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />

        <button type="submit">
          {editId !== null ? "Update User" : "Add User"}
        </button>

        {editId !== null && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setName("");
              setEmail("");
              setCity("");
            }}
          >
            Cancel
          </button>
        )}

      </form>

      <hr />

      <h2>Search Users</h2>

      <input
        type="text"
        placeholder="Search name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h2>Filter By City</h2>

      <select
        value={filterCity}
        onChange={(e) => setFilterCity(e.target.value)}
      >
        <option value="">All Cities</option>

        {cities.map((cityName) => (
          <option key={cityName} value={cityName}>
            {cityName}
          </option>
        ))}
      </select>

      <hr />

      <h2>User Details</h2>

      {filteredUsers.length === 0 ? (
        <p>No users found</p>
      ) : (

        filteredUsers.map((user) => (

          <div className="user-card" key={user.id}>

            <h3>{user.name}</h3>

            <p>Email: {user.email}</p>

            <p>City: {user.address.city}</p>

            <button onClick={() => handleEdit(user)}>
              Edit
            </button>

            <button onClick={() => handleDelete(user.id)}>
              Delete
            </button>

          </div>

        ))
      )}

    </div>
  );
}

export default CrudApp;