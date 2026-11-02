export default function EmployeeApp(){
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";

// ================= CONTEXT =================

const EmployeeContext = createContext(null);
const AuthContext = createContext(null);

// ================= REDUCER =================

function employeeReducer(state, action) {
  switch (action.type) {
    case "SET_EMPLOYEES":
      return { ...state, employees: action.payload };

    case "ADD_EMPLOYEE":
      return {
        ...state,
        employees: [action.payload, ...state.employees],
      };

    case "UPDATE_EMPLOYEE":
      return {
        ...state,
        employees: state.employees.map((emp) =>
          emp.id === action.payload.id ? action.payload : emp
        ),
      };

    case "DELETE_EMPLOYEE":
      return {
        ...state,
        employees: state.employees.filter(
          (emp) => emp.id !== action.payload
        ),
      };

    default:
      return state;
  }
}

// ================= CUSTOM HOOK =================

function useApi(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch employee data");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}

// ================= PROVIDERS =================

function EmployeeProvider({ children }) {
  const { data, loading, error } = useApi(
    "https://jsonplaceholder.typicode.com/users"
  );

  const [state, dispatch] = useReducer(employeeReducer, {
    employees: [],
  });

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!loading && !error && !initialized) {
      const employees = data.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        department: ["IT", "HR", "Finance", "Sales"][
          (user.id - 1) % 4
        ],
        role: user.company?.bs || "Employee",
        phone: user.phone,
        city: user.address?.city || "Unknown",
        salary: 30000 + user.id * 5000,
        status: "Active",
      }));

      dispatch({ type: "SET_EMPLOYEES", payload: employees });
      setInitialized(true);
    }
  }, [data, loading, error, initialized]);

  return (
    <EmployeeContext.Provider
      value={{
        employees: state.employees,
        dispatch,
        loading,
        error,
        initialized,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(
    () => sessionStorage.getItem("employeeLogin") === "true"
  );

  function login() {
    sessionStorage.setItem("employeeLogin", "true");
    setLoggedIn(true);
  }

  function logout() {
    sessionStorage.removeItem("employeeLogin");
    setLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ================= REUSABLE COMPONENTS =================

function Button({ children, onClick, color = "#2563eb", type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        background: color,
        color: "white",
        padding: "10px 15px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        margin: "4px",
      }}
    >
      {children}
    </button>
  );
}

function PageTitle({ title, children }) {
  return (
    <div style={styles.title}>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { loggedIn } = useContext(AuthContext);
  return loggedIn ? children : <Navigate to="/login" replace />;
}

function EmployeeTable({ employees, onDelete }) {
  // Props: parent sends employees and delete function
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Status</th>
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
              <td>{emp.status}</td>
              <td>
                <Link to={/employees/${emp.id}}>View</Link>{" "}
                |{" "}
                <Link to={/employees/${emp.id}/edit}>Edit</Link>
                {" | "}
                <button
                  onClick={() => onDelete(emp.id)}
                  style={{ color: "red", cursor: "pointer" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {employees.length === 0 && (
            <tr>
              <td colSpan="6">No employees found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// ================= LOGIN =================

function Login() {
  const { login, loggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  if (loggedIn) return <Navigate to="/" replace />;

  return (
    <div style={styles.login}>
      <h1>Employee Management System</h1>
      <p>Demo login</p>
      <Button
        onClick={() => {
          login();
          navigate("/");
        }}
      >
        Login to Dashboard
      </Button>
      <p style={{ color: "#666" }}>
        Demo only. Real authentication is not implemented.
      </p>
    </div>
  );
}

// ================= LAYOUT =================

function Layout({ children }) {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div style={styles.app}>
      <aside style={styles.sidebar}>
        <h3>EMS</h3>
        <p>Employee System</p>

        <nav style={{ display: "grid", gap: "14px" }}>
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/employees">Employees</NavLink>
          <NavLink to="/employees/add">Add Employee</NavLink>
          <NavLink to="/reports">Reports</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </nav>

        <div style={{ marginTop: "30px" }}>
          <Button
            color="#dc2626"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </div>
      </aside>

      <main style={styles.main}>{children}</main>
    </div>
  );
}

// ================= DASHBOARD =================

function Dashboard() {
  const { employees, loading, error, initialized } =
    useContext(EmployeeContext);

  if (loading || (!initialized && !error)) {
    return <p>Loading dashboard...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>API Error: {error}</p>;
  }

  const active = employees.filter((e) => e.status === "Active").length;

  const departments = new Set(
    employees.map((e) => e.department)
  ).size;

  return (
    <>
      <PageTitle title="Dashboard" />
      <div style={styles.cards}>
        <div style={styles.card}>
          <h3>Total Employees</h3>
          <h1>{employees.length}</h1>
        </div>
        <div style={styles.card}>
          <h3>Active Employees</h3>
          <h1>{active}</h1>
        </div>
        <div style={styles.card}>
          <h3>Departments</h3>
          <h1>{departments}</h1>
        </div>
      </div>

      <h3>Recent Employees</h3>
      <EmployeeTable
        employees={employees.slice(0, 5)}
        onDelete={() => alert("Delete from Employee List")}
      />
    </>
  );
}

// ================= EMPLOYEE LIST =================

function EmployeeList() {
  const { employees, dispatch, loading, error, initialized } =
    useContext(EmployeeContext);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");

  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  if (loading || (!initialized && !error)) {
    return <p>Loading employees...</p>;
  }

  if (error) {
    return (
      <div>
        <p style={{ color: "red" }}>API Error: {error}</p>
        <p>Check your internet connection and refresh.</p>
      </div>
    );
  }

  const filtered = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment =
      department === "All" || emp.department === department;

    return matchesSearch && matchesDepartment;
  });

  function deleteEmployee(id) {
    if (window.confirm("Delete this employee?")) {
      dispatch({ type: "DELETE_EMPLOYEE", payload: id });
    }
  }

  return (
    <>
      <PageTitle title="Employee List">
        <Link to="/employees/add">
          <Button>+ Add Employee</Button>
        </Link>
      </PageTitle>

      <div style={styles.toolbar}>
        <input
          ref={searchRef}
          placeholder="Search name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          style={styles.input}
        >
          <option value="All">All Departments</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Sales">Sales</option>
        </select>
      </div>

      <p>Showing {filtered.length} employees</p>

      <EmployeeTable
        employees={filtered}
        onDelete={deleteEmployee}
      />
    </>
  );
}

// ================= EMPLOYEE FORM =================

function EmployeeForm({ editMode = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees, dispatch } = useContext(EmployeeContext);

  const existing = employees.find((emp) => emp.id === Number(id));

  const [name, setName] = useState(existing?.name || "");
  const [email, setEmail] = useState(existing?.email || "");
  const [department, setDepartment] = useState(
    existing?.department || "IT"
  );
  const [salary, setSalary] = useState(
    existing?.salary ?? 30000
  );
  const [status, setStatus] = useState(
    existing?.status || "Active"
  );
  const [error, setError] = useState("");

  // Synchronize form if employee data loads or route changes
  useEffect(() => {
    if (editMode && existing) {
      setName(existing.name);
      setEmail(existing.email);
      setDepartment(existing.department);
      setSalary(existing.salary);
      setStatus(existing.status);
    }
  }, [editMode, existing]);

  if (editMode && !existing) {
    return <p>Employee not found.</p>;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (name.trim().length < 2) {
      setError("Name must contain at least 2 characters.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    if (Number(salary) <= 0 || salary === "") {
      setError("Salary must be greater than zero.");
      return;
    }

    const duplicate = employees.some(
      (emp) =>
        emp.email.toLowerCase() === email.trim().toLowerCase() &&
        emp.id !== existing?.id
    );

    if (duplicate) {
      setError("Email already exists.");
      return;
    }

    const employee = {
      id: existing?.id ?? Date.now(),
      name: name.trim(),
      email: email.trim(),
      department,
      salary: Number(salary),
      status,
      role: existing?.role || "Employee",
      phone: existing?.phone || "Not provided",
      city: existing?.city || "Not provided",
    };

    if (editMode) {
      dispatch({ type: "UPDATE_EMPLOYEE", payload: employee });
    } else {
      dispatch({ type: "ADD_EMPLOYEE", payload: employee });
    }

    navigate("/employees");
  }

  return (
    <>
      <PageTitle title={editMode ? "Edit Employee" : "Add Employee"} />

      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Employee Name</label>
        <input
          style={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Email</label>
        <input
          type="email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Department</label>
        <select
          style={styles.input}
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option>IT</option>
          <option>HR</option>
          <option>Finance</option>
          <option>Sales</option>
        </select>

        <label>Salary</label>
        <input
          type="number"
          min="1"
          style={styles.input}
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
        />

        <label>Status</label>
        <select
          style={styles.input}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <Button type="submit">
          {editMode ? "Update Employee" : "Save Employee"}
        </Button>

        <Button color="#64748b" onClick={() => navigate("/employees")}>
          Cancel
        </Button>
      </form>
    </>
  );
}

// ================= EMPLOYEE DETAILS =================

function EmployeeDetails() {
  const { id } = useParams();
  const { employees } = useContext(EmployeeContext);

  const employee = employees.find((e) => e.id === Number(id));

  if (!employee) {
    return <p>Employee not found.</p>;
  }

  return (
    <>
      <PageTitle title="Employee Details" />

      <div style={styles.card}>
        <p><b>ID:</b> {employee.id}</p>
        <p><b>Name:</b> {employee.name}</p>
        <p><b>Email:</b> {employee.email}</p>
        <p><b>Department:</b> {employee.department}</p>
        <p><b>Role:</b> {employee.role}</p>
        <p><b>Phone:</b> {employee.phone}</p>
        <p><b>City:</b> {employee.city}</p>
        <p><b>Salary:</b> ₹{employee.salary}</p>
        <p><b>Status:</b> {employee.status}</p>

        <Link to={/employees/${employee.id}/edit}>
          <Button>Edit Employee</Button>
        </Link>
      </div>
    </>
  );
}

// ================= REPORTS =================

function Reports() {
  const { employees } = useContext(EmployeeContext);

  const totalSalary = employees.reduce(
    (total, emp) => total + Number(emp.salary),
    0
  );

  const departments = ["IT", "HR", "Finance", "Sales"];

  return (
    <>
      <PageTitle title="Employee Reports" />

      <div style={styles.card}>
        <h3>Total Employees: {employees.length}</h3>
        <h3>Total Salary: ₹{totalSalary.toLocaleString("en-IN")}</h3>
        <h3>
          Average Salary: ₹
          {employees.length
            ? Math.round(totalSalary / employees.length).toLocaleString("en-IN")
            : 0}
        </h3>
      </div>

      <h3>Department Report</h3>
      {departments.map((dept) => (
        <div key={dept} style={styles.card}>
          {dept}: {employees.filter((e) => e.department === dept).length}
          {" employees"}
        </div>
      ))}
    </>
  );
}

// ================= PROFILE =================

function Profile() {
  const { employees } = useContext(EmployeeContext);

  return (
    <>
      <PageTitle title="Profile" />
      <div style={styles.card}>
        <h3>Admin User</h3>
        <p>Email: admin@example.com</p>
        <p>Role: Administrator (Demo)</p>
        <p>Employee records: {employees.length}</p>
      </div>
    </>
  );
}

// ================= 404 =================

function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <Link to="/">Go to Dashboard</Link>
    </div>
  );
}

// ================= MAIN APP =================

function AppContent() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout><Dashboard /></Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/employees"
        element={
          <ProtectedRoute>
            <Layout><EmployeeList /></Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/employees/add"
        element={
          <ProtectedRoute>
            <Layout><EmployeeForm /></Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/employees/:id"
        element={
          <ProtectedRoute>
            <Layout><EmployeeDetails /></Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/employees/:id/edit"
        element={
          <ProtectedRoute>
            <Layout><EmployeeForm editMode /></Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Layout><Reports /></Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Layout><Profile /></Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={loggedIn ? <NotFound /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <EmployeeProvider>
          <AppContent />
        </EmployeeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

// ================= INLINE STYLES =================

const styles = {
  app: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    background: "#f1f5f9",
    color: "#1e293b",
  },
  sidebar: {
    width: "210px",
    flexShrink: 0,
    background: "#0f172a",
    color: "white",
    padding: "20px",
    boxSizing: "border-box",
  },
  main: {
    flex: 1,
    minWidth: 0,
    padding: "24px",
    boxSizing: "border-box",
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "20px",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
    marginBottom: "30px",
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "15px",
    boxShadow: "0 2px 6px #00000010",
    overflowWrap: "anywhere",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "white",
    textAlign: "left",
  },
  toolbar: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "15px",
  },
  input: {
    padding: "11px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    margin: "5px 0",
    boxSizing: "border-box",
    maxWidth: "100%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "500px",
  },
  login: {
    textAlign: "center",
    padding: "50px 15px",
    fontFamily: "Arial, sans-serif",
  },
};
}