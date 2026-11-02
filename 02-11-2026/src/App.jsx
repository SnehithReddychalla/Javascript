import actions from "./actions.jsx";
import { useState, useEffect, useRef } from "react";

// 1. Custom Hook: API fetching
function useEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchEmployees() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }

        const data = await response.json();

        setEmployees(
          data.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            company: user.company.name
          }))
        );
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchEmployees();

    return () => controller.abort();
  }, []);

  return { employees, setEmployees, loading, error };
}

// 2. Reusable Employee Card
function EmployeeCard({ employee, onDelete }) {
  return (
    <div>
      <h3>{employee.name}</h3>
      <p>Email: {employee.email}</p>
      <p>Company: {employee.company}</p>

      <button onClick={() => onDelete(employee.id)}>
        Delete
      </button>
      <hr />
    </div>
  );
}

// 3. Reusable Search Component
function SearchBar({ search, setSearch, inputRef }) {
  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Search employee..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

// 4. Reusable Employee List
function EmployeeList({ employees, onDelete }) {
  if (employees.length === 0) {
    return <p>No employees found.</p>;
  }

  return (
    <div>
      {employees.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

// 5. Main App Component
export default function App() {
  const {
    employees,
    setEmployees,
    loading,
    error
  } = useEmployees();

  const [search, setSearch] = useState("");
  const [newName, setNewName] = useState("");

  // useRef: access input without re-rendering
  const inputRef = useRef(null);

  // Focus the search input
  function focusSearch() {
    inputRef.current?.focus();
  }

  // Add employee (local UI only)
  function addEmployee(e) {
    e.preventDefault();

    const name = newName.trim();
    if (!name) return;

    const employee = {
      id: Date.now(),
      name,
      email: "Not provided",
      company: "Local employee"
    };

    setEmployees((previous) => [
      employee,
      ...previous
    ]);

    setNewName("");
    focusSearch();
  }

  // Delete employee (local UI only)
  function deleteEmployee(id) {
    setEmployees((previous) =>
      previous.filter((employee) => employee.id !== id)
    );
  }

  // Search employees
  const filteredEmployees = employees.filter((employee) =>
    '${employee.name} ${employee.email} ${employee.company}'
      .toLowerCase()
      .includes(search.toLowerCase().trim())
  );

  if (loading) {
    return <h2>Loading employees...</h2>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Employee Management App</h1>

      <h2>Total employees: {employees.length}</h2>

      <SearchBar
        search={search}
        setSearch={setSearch}
        inputRef={inputRef}
      />

      <br /><br />

      <form onSubmit={addEmployee}>
        <input
          type="text"
          placeholder="Enter employee name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />

        <button type="submit">Add Employee</button>
      </form>

      <br />

      <button onClick={focusSearch}>
        Focus Search (useRef)
      </button>

      <h2>Employee List</h2>

      <EmployeeList
        employees={filteredEmployees}
        onDelete={deleteEmployee}
      />
    </div>
  );
}