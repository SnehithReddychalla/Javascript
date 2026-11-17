import React, { useEffect } from "react";
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

// 2. Create Asynchronous Action
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",

  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_URL);

      return response.data;

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.message
      );

    }
  }
);

// 3. Initial State
const initialState = {
  users: [],
  loading: false,
  error: null
};

// 4. Create Redux Slice
const userSlice = createSlice({
  name: "users",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    // Pending State
    builder.addCase(fetchUsers.pending, (state) => {

      state.loading = true;
      state.error = null;

    });

    // Fulfilled State
    builder.addCase(fetchUsers.fulfilled, (state, action) => {

      state.loading = false;
      state.users = action.payload;

    });

    // Rejected State
    builder.addCase(fetchUsers.rejected, (state, action) => {

      state.loading = false;
      state.error = action.payload || action.error.message;

    });

  }
});

// 5. Configure Redux Store
const store = configureStore({

  reducer: {
    users: userSlice.reducer
  }

});

// 6. User Component
function UserList() {

  const dispatch = useDispatch();

  const { users, loading, error } = useSelector(
    (state) => state.users
  );

  // API Call
  useEffect(() => {

    dispatch(fetchUsers());

  }, [dispatch]);

  return (

    <div style={{ padding: "20px", fontFamily: "Arial" }}>

      <h1>Asynchronous API Handling</h1>

      <button onClick={() => dispatch(fetchUsers())}>
        Fetch Users
      </button>

      {loading && (
        <h3>Loading users...</h3>
      )}

      {error && (
        <h3 style={{ color: "red" }}>
          Error: {error}
        </h3>
      )}

      {!loading && !error && users.length === 0 && (
        <p>No users found.</p>
      )}

      {users.map((user) => (

        <div
          key={user.id}
          style={{
            border: "1px solid gray",
            padding: "12px",
            margin: "10px 0",
            borderRadius: "8px"
          }}
        >

          <h3>{user.name}</h3>

          <p>Email: {user.email}</p>

          <p>City: {user.address.city}</p>

          <p>Phone: {user.phone}</p>

        </div>

      ))}

    </div>

  );

}

// 7. Main Component
function AsyncThunkAPI() {

  return (

    <Provider store={store}>
      <UserList />
    </Provider>

  );

}

export default AsyncThunkAPI;