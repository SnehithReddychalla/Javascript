import React from "react";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { Provider, useSelector, useDispatch } from "react-redux";

// 1. Create Redux Slice
const studentSlice = createSlice({

  name: "student",

  initialState: {
    name: "Snehith",
    age: 22,
    course: "React JS",
    marks: 75
  },

  reducers: {

    updateName: (state, action) => {
      state.name = action.payload;
    },

    increaseMarks: (state) => {
      state.marks += 5;
    },

    decreaseMarks: (state) => {
      state.marks -= 5;
    },

    resetMarks: (state) => {
      state.marks = 75;
    }

  }
});

// 2. Export Actions
const {
  updateName,
  increaseMarks,
  decreaseMarks,
  resetMarks
} = studentSlice.actions;

// 3. Configure Redux Store
const store = configureStore({

  reducer: {
    student: studentSlice.reducer
  }

});

// 4. Student Component
function StudentDetails() {

  const student = useSelector(
    (state) => state.student
  );

  const dispatch = useDispatch();

  return (

    <div style={{
      textAlign: "center",
      margin: "30px",
      padding: "20px",
      border: "2px solid blue",
      borderRadius: "10px"
    }}>

      <h1>Redux Toolkit Create Slice</h1>

      <h2>Student Details</h2>

      <h3>Name: {student.name}</h3>

      <h3>Age: {student.age}</h3>

      <h3>Course: {student.course}</h3>

      <h3>Marks: {student.marks}</h3>

      <button onClick={() =>
        dispatch(updateName("Snehith Reddy"))
      }>
        Update Name
      </button>

      <button onClick={() =>
        dispatch(increaseMarks())
      }>
        Increase Marks
      </button>

      <button onClick={() =>
        dispatch(decreaseMarks())
      }>
        Decrease Marks
      </button>

      <button onClick={() =>
        dispatch(resetMarks())
      }>
        Reset Marks
      </button>

    </div>

  );
}

// 5. Provider
function CreateSliceExample() {

  return (

    <Provider store={store}>
      <StudentDetails />
    </Provider>

  );

}

export default CreateSliceExample;