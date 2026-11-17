import React from "react";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider, useSelector, useDispatch } from "react-redux";

// 1. Create Redux Slice
const userSlice = createSlice({
  name: "user",

  initialState: {
    username: "Snehith",
    age: 22,
    isLoggedIn: false
  },

  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },

    logout: (state) => {
      state.isLoggedIn = false;
    },

    updateName: (state, action) => {
      state.username = action.payload;
    }
  }
});

// 2. Export Actions
const { login, logout, updateName } = userSlice.actions;

// 3. Configure Redux Store
const store = configureStore({
  reducer: {
    user: userSlice.reducer
  }
});

// 4. Create User Component
function UserDetails() {

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  return (
    <div style={{
      textAlign: "center",
      margin: "30px",
      padding: "20px",
      border: "2px solid black"
    }}>

      <h1>Redux Toolkit Configuration</h1>

      <h2>User Details</h2>

      <h3>Name: {user.username}</h3>

      <h3>Age: {user.age}</h3>

      <h3>
        Status: {user.isLoggedIn ? "Logged In" : "Logged Out"}
      </h3>

      <button onClick={() => dispatch(login())}>
        Login
      </button>

      <button onClick={() => dispatch(logout())}>
        Logout
      </button>

      <button onClick={() => dispatch(updateName("Snehith Reddy"))}>
        Update Name
      </button>

    </div>
  );
}

// 5. Provider Configuration
function ReduxToolkit() {
  return (
    <Provider store={store}>
      <UserDetails />
    </Provider>
  );
}

export default ReduxToolkit;