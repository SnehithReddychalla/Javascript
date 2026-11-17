import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";

// Step 1: Create Redux Slice
const counterSlice = createSlice({
  name: "counter",

  initialState: {
    count: 0
  },

  reducers: {
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

// Step 2: Export Actions
const { increment, decrement, reset } =
  counterSlice.actions;

// Step 3: Configure Redux Store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
});

// Step 4: Create Component
function Counter() {

  // Get data from Redux Store
  const count = useSelector(
    (state) => state.counter.count
  );

  // Send actions to Redux Store
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: "center", padding: "30px" }}>

      <h1>Redux State Management</h1>

      <h2>Counter: {count}</h2>

      <button onClick={() => dispatch(increment())}>
        Increase +
      </button>

      <button onClick={() => dispatch(decrement())}>
        Decrease -
      </button>

      <button onClick={() => dispatch(reset())}>
        Reset
      </button>

    </div>
  );
}

// Step 5: Provide Store to Application
function ReduxExample() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

export default ReduxExample;