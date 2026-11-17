import React, { useState } from "react";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { Provider, useSelector, useDispatch } from "react-redux";

// 1. Create Redux Slice
const userSlice = createSlice({
  name: "user",

  initialState: {
    name: "Snehith",
    age: 22,
    city: "Hyderabad",
    count: 0
  },

  reducers: {

    updateName: (state, action) => {
      state.name = action.payload;
    },

    updateAge: (state, action) => {
      state.age = action.payload;
    },

    updateCity: (state, action) => {
      state.city = action.payload;
    },

    increment: (state) => {
      state.count += 1;
    },

    decrement: (state) => {
      state.count -= 1;
    },

    reset: (state) => {
      state.count = 0;
    }

  }
});

// 2. Export Actions
const {
  updateName,
  updateAge,
  updateCity,
  increment,
  decrement,
  reset
} = userSlice.actions;

// 3. Configure Redux Store
const store = configureStore({
  reducer: {
    user: userSlice.reducer
  }
});

// 4. Create Component
function GlobalState() {

  // Access Global State
  const user = useSelector((state) => state.user);

  // Access Dispatch Function
  const dispatch = useDispatch();

  // Local Input State
  const [newName, setNewName] = useState("");

  return (
    <div style={{
      textAlign: "center",
      padding: "25px",
      margin: "20px",
      border: "2px solid blue",
      borderRadius: "10px"
    }}>

      <h1>Redux Global State Management</h1>

      <h2>User Details</h2>

      <h3>Name: {user.name}</h3>
      <h3>Age: {user.age}</h3>
      <h3>City: {user.city}</h3>

      <hr />

      <h2>Update Global State</h2>

      <input
        type="text"
        placeholder="Enter new name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />

      <button
        onClick={() => {
          if (newName.trim()) {
            dispatch(updateName(newName.trim()));
            setNewName("");
          }
        }}
      >
        Update Name
      </button>

      <br /><br />

      <button onClick={() => dispatch(updateAge(user.age + 1))}>
        Increase Age
      </button>

      <button onClick={() => dispatch(updateCity("Bangalore"))}>
        Change City
      </button>

      <hr />

      <h2>Counter: {user.count}</h2>

      <button onClick={() => dispatch(increment())}>
        Increment +
      </button>

      <button onClick={() => dispatch(decrement())}>
        Decrement -
      </button>

      <button onClick={() => dispatch(reset())}>
        Reset
      </button>

    </div>
  );
}

// 5. Provider Configuration
function GlobalStatePractice() {
  return (
    <Provider store={store}>
      <GlobalState />
    </Provider>
  );
}

export default GlobalStatePractice;