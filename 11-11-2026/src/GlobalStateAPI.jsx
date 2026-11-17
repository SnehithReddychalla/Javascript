import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  configureStore,
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import {
  Provider,
  useDispatch,
  useSelector
} from "react-redux";

// 1. API URL
const API_URL = "https://jsonplaceholder.typicode.com/users";

// 2. Fetch API data
const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

// 3. Initial Global State
const initialState = {
  users: [],
  loading: false,
  error: null
};

// 4. Create Redux Slice
const userSlice = createSlice({
  name: "users",
  initialState,

  reducers: {
    clearUsers: (state) => {
      state.users = [];
    }
  },

  extraReducers: (builder) => {

    // Loading
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    // Success
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });

    // Error
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

  }
});

// 5. Redux Store
const store = configureStore({
  reducer: {
    users: userSlice.reducer
  }
});

// 6. Component
function UserManagement() {

  const dispatch = useDispatch();

  // Read global state
  const { users, loading, error } = useSelector(
    (state) => state.users
  );

  const [search, setSearch] = useState("");

  // Fetch data when component loads
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Search users
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>

      <h1>Global State API Management</h1>

      <button onClick={() => dispatch(fetchUsers())}>
        Fetch Users
      </button>

      <input
        type="text"
        placeholder="Search user..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "8px", margin: "10px" }}
      />

      {loading && <h3>Loading data...</h3>}

      {error && <h3>Error: {error}</h3>}

      <h2>Total Users: {filteredUsers.length}</h2>

      {filteredUsers.map((user) => (

        <div
          key={user.id}
          style={{
            border: "1px solid gray",
            padding: "12px",
            margin: "10px",
            borderRadius: "8px"
          }}
        >

          <h3>{user.name}</h3>

          <p>ID: {user.id}</p>

          <p>Email: {user.email}</p>

          <p>Phone: {user.phone}</p>

          <p>City: {user.address.city}</p>

        </div>

      ))}

      <button onClick={() => dispatch(userSlice.actions.clearUsers())}>
        Clear Users
      </button>

    </div>
  );
}

// 7. Main Component
function GlobalStateAPI() {

  return (
    <Provider store={store}>
      <UserManagement />
    </Provider>
  );

}

export default GlobalStateAPI;