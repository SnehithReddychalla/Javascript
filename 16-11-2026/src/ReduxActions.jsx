import React from "react";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { Provider, useSelector, useDispatch } from "react-redux";

// Create Slice: Actions and Reducer
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

// Export Actions
const { increment, decrement, reset } = counterSlice.actions;

// Create Redux Store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
});

// Counter Component
function Counter() {

  const count = useSelector(
    (state) => state.counter.count
  );

  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: "center", margin: "40px" }}>

      <h1>Actions, Reducers and Dispatch</h1>

      <h2>Counter: {count}</h2>

      <button onClick={() => dispatch(increment())}>
        Increment
      </button>

      <button onClick={() => dispatch(decrement())}>
        Decrement
      </button>

      <button onClick={() => dispatch(reset())}>
        Reset
      </button>

    </div>
  );
}

// Provider Component
function ReduxActions() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

export default ReduxActions;