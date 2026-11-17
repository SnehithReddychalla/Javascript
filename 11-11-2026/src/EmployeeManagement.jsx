import React, { useEffect, useState } from "react";
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

// ==================================
// 1. API SERVICE FUNCTIONS
// ==================================

const API_URL = "https://jsonplaceholder.typicode.com/users";

const employeeService = {
  getEmployees: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getEmployeeById: async (id) => {
    const response = await axios.get('${API_URL}/${id}');
    return response.data;
  },

  addEmployee: async (employee) => {
    const response = await axios.post(API_URL, employee);
    return response.data;
  },

  updateEmployee: async (id, employee) => {
    const response = await axios.put('${API_URL}/${id}', employee);
    return response.data;
  },

  deleteEmployee: async (id) => {
    const response = await axios.delete('${API_URL}/${id}');
    return response.data;
  }
};

// ==================================
// 2. ASYNC THUNK
// ==================================

const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    return await employeeService.getEmployees();
  }
);

// ==================================
// 3. REDUX SLICE
// ==================================

const employeeSlice = createSlice({
  name: "employees",

  initialState: {
    employees: [],
    loading: false,
    error: null
  },

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

// ==================================
// 4. REDUX STORE
// ==================================

const store = configureStore({
  reducer: {
    employees: employeeSlice.reducer
  }
});

// ==================================
// 5. REUSABLE EMPLOYEE CARD
// ==================================

function EmployeeCard({ employee }) {
  return (
    <div style={styles.card}>
      <h3>{employee.name}</h3>
      <p>Email: {employee.email}</p>
      <p>City: {employee.address.city}</p>
      <p>Phone: {employee.phone}</p>
    </div>
  );
}

// ==================================
// 6. REUSABLE SEARCH AND FILTER
// ==================================

function SearchFilter({
  search,
  setSearch,
  selectedCity,
  setSelectedCity,
  cities
}) {
  return (
    <div style={styles.controls}>
      <input
        type="text"
        placeholder="Search name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.input}
      />

      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        style={styles.input}
      >
        <option value="All">All Cities</option>

        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
}

// ==================================
// 7. REUSABLE PAGINATION
// ==================================

function Pagination({
  currentPage,
  totalPages,
  setCurrentPage
}) {
  if (totalPages <= 1) return null;

  return (
    <div style={styles.pagination}>
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

// ==================================
// 8. MAIN EMPLOYEE COMPONENT
// ==================================

function EmployeeContent() {
  const dispatch = useDispatch();

  const { employees, loading, error } = useSelector(
    (state) => state.employees
  );

  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const employeesPerPage = 5;

  // Fetch employees from API
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  // Reset pagination when search/filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCity]);

  // Search and filter employees
  const filteredEmployees = employees.filter((employee) => {
    const searchMatch =
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.email.toLowerCase().includes(search.toLowerCase());

    const cityMatch =
      selectedCity === "All" ||
      employee.address.city === selectedCity;

    return searchMatch && cityMatch;
  });

  // Get unique cities
  const cities = [
    ...new Set(
      employees.map((employee) => employee.address.city)
    )
  ];

  // Pagination calculations
  const totalPages = Math.ceil(
    filteredEmployees.length / employeesPerPage
  );

  const startIndex = (currentPage - 1) * employeesPerPage;

  const currentEmployees = filteredEmployees.slice(
    startIndex,
    startIndex + employeesPerPage
  );

  return (
    <div style={styles.container}>

      <h1>Employee Management System</h1>

      <SearchFilter
        search={search}
        setSearch={setSearch}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        cities={cities}
      />

      {loading && <h3>Loading employees...</h3>}

      {error && (
        <h3 style={{ color: "red" }}>
          Error: {error}
        </h3>
      )}

      {!loading && !error && (
        <>
          {currentEmployees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
            />
          ))}

          {filteredEmployees.length === 0 && (
            <p>No employees found.</p>
          )}

          <p>
            Total employees: {filteredEmployees.length}
          </p>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}

    </div>
  );
}

// ==================================
// 9. APP PROVIDER
// ==================================

function EmployeeManagement() {
  return (
    <Provider store={store}>
      <EmployeeContent />
    </Provider>
  );
}

// ==================================
// 10. CSS STYLES
// ==================================

const styles = {
  container: {
    maxWidth: "900px",
    margin: "30px auto",
    padding: "20px",
    fontFamily: "Arial"
  },

  controls: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "20px"
  },

  input: {
    padding: "10px",
    flex: "1",
    minWidth: "180px"
  },

  card: {
    border: "1px solid gray",
    padding: "15px",
    marginBottom: "12px",
    borderRadius: "8px"
  },

  pagination: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    marginTop: "20px"
  }
};

export default EmployeeManagement;