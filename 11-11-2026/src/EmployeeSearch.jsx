import React, { useEffect, useMemo, useState } from "react";
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

// 1. Fetch employees using createAsyncThunk
const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

// 2. Initial state
const initialState = {
  employees: [],
  loading: false,
  error: null
};

// 3. Create Redux slice
const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
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

// 4. Configure Redux store
const store = configureStore({
  reducer: {
    employees: employeeSlice.reducer
  }
});

// 5. Employee component
function EmployeeList() {
  const dispatch = useDispatch();

  const { employees, loading, error } = useSelector(
    (state) => state.employees
  );

  // Search and filter states
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  const employeesPerPage = 5;

  // Fetch API data
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  // 6. Search and filter employees
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const searchMatch =
        employee.name.toLowerCase().includes(search.toLowerCase()) ||
        employee.email.toLowerCase().includes(search.toLowerCase());

      const cityMatch =
        selectedCity === "All" ||
        employee.address.city === selectedCity;

      return searchMatch && cityMatch;
    });
  }, [employees, search, selectedCity]);

  // 7. Pagination calculations
  const totalPages = Math.ceil(
    filteredEmployees.length / employeesPerPage
  );

  const startIndex = (currentPage - 1) * employeesPerPage;

  const currentEmployees = filteredEmployees.slice(
    startIndex,
    startIndex + employeesPerPage
  );

  // Get unique cities for dropdown
  const cities = [
    ...new Set(employees.map((employee) => employee.address.city))
  ];

  // Reset page when search or filter changes
  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleCityFilter = (value) => {
    setSelectedCity(value);
    setCurrentPage(1);
  };

  return (
    <div style={{
      padding: "25px",
      fontFamily: "Arial",
      maxWidth: "900px",
      margin: "auto"
    }}>

      <h1>Employee Management</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ padding: "10px", marginRight: "10px" }}
      />

      {/* City Filter */}
      <select
        value={selectedCity}
        onChange={(e) => handleCityFilter(e.target.value)}
        style={{ padding: "10px" }}
      >
        <option value="All">All Cities</option>

        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {/* Loading */}
      {loading && <h3>Loading employees...</h3>}

      {/* Error */}
      {error && <h3 style={{ color: "red" }}>{error}</h3>}

      {/* Employee List */}
      {!loading && currentEmployees.map((employee) => (
        <div
          key={employee.id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginTop: "12px",
            borderRadius: "8px"
          }}
        >
          <h3>{employee.name}</h3>
          <p>Email: {employee.email}</p>
          <p>City: {employee.address.city}</p>
          <p>Phone: {employee.phone}</p>
        </div>
      ))}

      {/* No Results */}
      {!loading && filteredEmployees.length === 0 && (
        <h3>No employees found.</h3>
      )}

      {/* Pagination */}
      {!loading && filteredEmployees.length > 0 && (
        <div style={{ marginTop: "20px" }}>

          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span style={{ margin: "0 15px" }}>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>

          <p>
            Showing {startIndex + 1}–
            {Math.min(startIndex + employeesPerPage, filteredEmployees.length)}
            {" "}of {filteredEmployees.length} employees
          </p>

        </div>
      )}

    </div>
  );
}

// 8. Provider
function EmployeeSearch() {
  return (
    <Provider store={store}>
      <EmployeeList />
    </Provider>
  );
}

export default EmployeeSearch;