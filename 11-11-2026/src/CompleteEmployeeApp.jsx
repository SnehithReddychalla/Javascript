import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  configureStore,
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";

// =====================================
// 1. API SERVICE
// =====================================

const API = "https://jsonplaceholder.typicode.com/users";

const api = {
  getEmployees: () => axios.get(API),

  addEmployee: (employee) => axios.post(API, employee),

  updateEmployee: (id, employee) =>
    axios.put('${API}/${id}', employee),

  deleteEmployee: (id) =>
    axios.delete('${API}/${id}')
};

// =====================================
// 2. ASYNC THUNKS
// =====================================

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getEmployees();

      return response.data.map((emp) => ({
        ...emp,
        department: emp.company?.bs || "General"
      }));
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (employee, { rejectWithValue }) => {
    try {
      const response = await api.addEmployee(employee);
      return {
        ...response.data,
        ...employee
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async ({ id, employee }, { rejectWithValue }) => {
    try {
      const response = await api.updateEmployee(id, employee);

      return {
        ...response.data,
        ...employee,
        id
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id, { rejectWithValue }) => {
    try {
      await api.deleteEmployee(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// =====================================
// 3. REDUX SLICE
// =====================================

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
      // FETCH EMPLOYEES
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
        state.error = action.payload;
      })

      // ADD EMPLOYEE
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees.unshift(action.payload);
      })

      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE EMPLOYEE
      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.employees.findIndex(
          (emp) => emp.id === action.payload.id
        );

        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })

      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE EMPLOYEE
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;

        state.employees = state.employees.filter(
          (emp) => emp.id !== action.payload
        );
      })

      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// =====================================
// 4. REDUX STORE
// =====================================

const store = configureStore({
  reducer: {
    employees: employeeSlice.reducer
  }
});

// =====================================
// 5. REUSABLE EMPLOYEE FORM
// =====================================

function EmployeeForm({ onSave, editing, onCancel }) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    phone: ""
  });

  useEffect(() => {
    if (editing) {
      setForm({
        name: editing.name || "",
        email: editing.email || "",
        department: editing.department || "",
        phone: editing.phone || ""
      });
    } else {
      setForm({
        name: "",
        email: "",
        department: "",
        phone: ""
      });
    }
  }, [editing]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      alert("Name and email are required");
      return;
    }

    onSave(form);

    setForm({
      name: "",
      email: "",
      department: "",
      phone: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>

      <h3>{editing ? "Update Employee" : "Add New Employee"}</h3>

      <input
        name="name"
        placeholder="Employee Name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Employee Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        name="department"
        placeholder="Department"
        value={form.department}
        onChange={handleChange}
      />

      <input
        name="phone"
        placeholder="Phone Number"
        value={form.phone}
        onChange={handleChange}
      />

      <div style={styles.buttons}>
        <button type="submit" style={styles.addButton}>
          {editing ? "Update Employee" : "Add Employee"}
        </button>

        {editing && (
          <button type="button" onClick={onCancel}
            style={styles.cancelButton}>
            Cancel
          </button>
        )}
      </div>

    </form>
  );
}

// =====================================
// 6. REUSABLE EMPLOYEE TABLE
// =====================================

function EmployeeTable({ employees, onEdit, onDelete }) {

  if (employees.length === 0) {
    return <p>No employees found.</p>;
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={styles.table}>

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>{emp.phone}</td>

              <td>
                <button
                  onClick={() => onEdit(emp)}
                  style={styles.editButton}
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(emp.id)}
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

// =====================================
// 7. MAIN EMPLOYEE APPLICATION
// =====================================

function EmployeeDashboard() {

  const dispatch = useDispatch();

  const { employees, loading, error } = useSelector(
    (state) => state.employees
  );

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [editing, setEditing] = useState(null);

  // FETCH DATA
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  // ADD / UPDATE
  const handleSave = async (form) => {

    try {
      if (editing) {
        await dispatch(
          updateEmployee({
            id: editing.id,
            employee: form
          })
        ).unwrap();

        alert("Employee updated successfully!");
        setEditing(null);

      } else {
        await dispatch(addEmployee(form)).unwrap();

        alert("Employee added successfully!");
      }

    } catch (err) {
      alert("Operation failed: " + err);
    }
  };

  // DELETE
  const handleDelete = async (id) => {

    if (!window.confirm("Are you sure you want to delete?")) {
      return;
    }

    try {
      await dispatch(deleteEmployee(id)).unwrap();
      alert("Employee deleted successfully!");
    } catch (err) {
      alert("Delete failed: " + err);
    }
  };

  // SEARCH AND FILTER
  const departments = [
    "All",
    ...new Set(
      employees.map((emp) => emp.department).filter(Boolean)
    )
  ];

  const filteredEmployees = employees.filter((emp) => {

    const matchesSearch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment =
      department === "All" ||
      emp.department === department;

    return matchesSearch && matchesDepartment;
  });

  return (
    <div style={styles.container}>

      <h1>Employee Management System</h1>

      <p>Manage your employee records using React, Axios and Redux Toolkit.</p>

      {/* SUMMARY */}
      <div style={styles.summary}>
        <h3>Total Employees: {employees.length}</h3>
        <h3>Showing: {filteredEmployees.length}</h3>
      </div>

      {/* FORM */}
      <EmployeeForm
        onSave={handleSave}
        editing={editing}
        onCancel={() => setEditing(null)}
      />

      {/* SEARCH */}
      <div style={styles.searchArea}>

        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

      </div>

      {/* LOADING */}
      {loading && <h3>Loading employees...</h3>}

      {/* ERROR */}
      {error && (
        <p style={{ color: "red" }}>
          Error: {error}
        </p>
      )}

      {/* EMPLOYEE LIST */}
      {!loading && !error && (
        <EmployeeTable
          employees={filteredEmployees}
          onEdit={setEditing}
          onDelete={handleDelete}
        />
      )}

    </div>
  );
}

// =====================================
// 8. APPLICATION PROVIDER
// =====================================

export default function EmployeeManagement() {

  return (
    <Provider store={store}>
      <EmployeeDashboard />
    </Provider>
  );
}

// =====================================
// 9. BASIC CSS STYLES
// =====================================

const styles = {

  container: {
    padding: "25px",
    fontFamily: "Arial, sans-serif",
    background: "#f4f6f9",
    minHeight: "100vh"
  },

  form: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },

  summary: {
    display: "flex",
    gap: "30px",
    flexWrap: "wrap"
  },

  searchArea: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "20px"
  },

  buttons: {
    display: "flex",
    gap: "10px"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "white"
  },

  addButton: {
    padding: "10px",
    background: "#198754",
    color: "white",
    border: "none",
    cursor: "pointer"
  },

  editButton: {
    padding: "7px",
    background: "#0d6efd",
    color: "white",
    border: "none",
    margin: "3px",
    cursor: "pointer"
  },

  deleteButton: {
    padding: "7px",
    background: "#dc3545",
    color: "white",
    border: "none",
    margin: "3px",
    cursor: "pointer"
  },

  cancelButton: {
    padding: "10px",
    background: "#6c757d",
    color: "white",
    border: "none",
    cursor: "pointer"
  }
};