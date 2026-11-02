function taskReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };

    case "UPDATE":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? action.payload
            : task
        )
      };

    case "DELETE":
      return {
        ...state,
        tasks: state.tasks.filter(
          (task) => task.id !== action.payload
        )
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}