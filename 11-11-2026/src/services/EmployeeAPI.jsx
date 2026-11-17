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

// API URL
const API_URL = "https://jsonplaceholder.typicode.com/users";

// API call
const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

// Initial state
const initialState = {
  employees: [],
  loading: false,
  error: null
};

// Redux Slice
const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })

      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

// Redux Store
const store = configureStore({
  reducer: {
    employees: employeeSlice.reducer
  }
});

// Employee Component
function EmployeeList() {

  const dispatch = useDispatch();

  const { employees, loading, error } = useSelector(
    (state) => state.employees
  );

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <div style={{ padding: "20px" }}>

      <h1>Employee Management</h1>

      <button onClick={() => dispatch(fetchEmployees())}>
        Refresh Employees
      </button>

      {loading && <h3>Loading...</h3>}

      {error && <h3>{error}</h3>}

      {employees.map((employee) => (
        <div key={employee.id}>
          <h3>{employee.name}</h3>
          <p>Email: {employee.email}</p>
          <p>City: {employee.address.city}</p>
          <hr />
        </div>
      ))}

    </div>
  );
}

// Main Component
function EmployeeAPI() {
  return (
    <Provider store={store}>
      <EmployeeList />
    </Provider>
  );
}

export default EmployeeAPI;