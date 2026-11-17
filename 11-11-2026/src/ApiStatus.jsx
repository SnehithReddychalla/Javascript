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

// 2. Async API Action
const fetchUsers = createAsyncThunk(
  "users/fetchUsers",

  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Something went wrong"
      );
    }
  }
);

// 3. Initial State
const initialState = {
  users: [],
  loading: false,
  success: false,
  error: null
};

// 4. Redux Slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},

  extraReducers: (builder) => {

    // LOADING STATE
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });

    // SUCCESS STATE
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.users = action.payload;
      state.error = null;
    });

    // FAILURE STATE
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload || action.error.message;
    });

  }
});

// 5. Redux Store
const store = configureStore({
  reducer: {
    users: userSlice.reducer
  }
});

// 6. User Component
function ApiStatusComponent() {

  const dispatch = useDispatch();

  const { users, loading, success, error } = useSelector(
    (state) => state.users
  );

  // API call when component loads
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div style={{
      padding: "25px",
      fontFamily: "Arial"
    }}>

      <h1>API Loading, Success and Failure</h1>

      <button
        onClick={() => dispatch(fetchUsers())}
        disabled={loading}
      >
        {loading ? "Fetching..." : "Fetch Users"}
      </button>

      {/* LOADING */}
      {loading && (
        <h3 style={{ color: "blue" }}>
          Please wait! Loading data...
        </h3>
      )}

      {/* SUCCESS */}
      {success && (
        <h3 style={{ color: "green" }}>
          Users fetched successfully!
        </h3>
      )}

      {/* FAILURE */}
      {error && (
        <div>
          <h3 style={{ color: "red" }}>
            API Failed: {error}
          </h3>

          <button onClick={() => dispatch(fetchUsers())}>
            Try Again
          </button>
        </div>
      )}

      {/* DISPLAY USERS */}
      {success && users.map((user) => (
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
        </div>
      ))}

    </div>
  );
}

// 7. Main Component
function ApiStatus() {
  return (
    <Provider store={store}>
      <ApiStatusComponent />
    </Provider>
  );
}

export default ApiStatus;