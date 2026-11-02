import { useReducer } from "react";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };

    case "DECREMENT":
      return { count: state.count - 1 };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

function UseReducerPractice() {
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div>
      <h2>useReducer Practice</h2>
      <h3>Count: {state.count}</h3>

      <button onClick={() =>
        dispatch({ type: "INCREMENT" })
      }>
        Increment
      </button>

      <button onClick={() =>
        dispatch({ type: "DECREMENT" })
      }>
        Decrement
      </button>

      <button onClick={() =>
        dispatch({ type: "RESET" })
      }>
        Reset
      </button>
    </div>
  );
}

export default UseReducerPractice;