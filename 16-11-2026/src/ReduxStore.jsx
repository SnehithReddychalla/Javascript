import React from "react";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider, useSelector, useDispatch } from "react-redux";

// STEP 1: Create Slice
const userSlice = createSlice({
  name: "user",

  initialState: {
    name: "Snehith",
    age: 23,
    role: "Associate Software Engineer"
  },

  reducers: {
    updateName: (state, action) => {
      state.name = action.payload;
    },

    updateAge: (state, action) => {
      state.age = action.payload;
    }
  }
});

// STEP 2: Export Actions
const { updateName, updateAge } = userSlice.actions;

// STEP 3: Configure Redux Store
const store = configureStore({
  reducer: {
    user: userSlice.reducer
  }
});

// STEP 4: Create Component
function UserDetails() {

  // Read data from Redux Store
  const user = useSelector((state) => state.user);

  // Dispatch actions
  const dispatch = useDispatch();

  return (
    <div style={{ padding: "20px" }}>

      <h1>Redux Store Example</h1>

      <h2>User Details</h2>

      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <p>Role: {user.role}</p>

      <button onClick={() => dispatch(updateName("Snehith Reddy"))}>
        Update Name
      </button>

      <button onClick={() => dispatch(updateAge(24))}>
        Update Age
      </button>

    </div>
  );
}

// STEP 5: Provide Store
function ReduxStore() {
  return (
    <Provider store={store}>
      <UserDetails />
    </Provider>
  );
}

export default ReduxStore;