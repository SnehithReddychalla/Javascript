import { useState } from "react";

function App() {
  // Store student information
  const [students, setStudents] = useState([
    { id: 1, name: "Rahul", course: "React" },
    { id: 2, name: "Priya", course: "Java" }
  ]);

  // Store input values
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  // Store the ID of the student being edited
  const [editId, setEditId] = useState(null);

  // CREATE: Add a new student
  function addStudent(event) {
    event.preventDefault();

    if (!name.trim() || !course.trim()) {
      alert("Please enter both name and course");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: name,
      course: course
    };

    setStudents([...students, newStudent]);

    setName("");
    setCourse("");
  }

  // UPDATE: Update student information
  function updateStudent(event) {
    event.preventDefault();

    if (!name.trim() || !course.trim()) {
      alert("Please enter both name and course");
      return;
    }

    const updatedStudents = students.map((student) =>
      student.id === editId
        ? { ...student, name: name, course: course }
        : student
    );

    setStudents(updatedStudents);

    setName("");
    setCourse("");
    setEditId(null);
  }

  // Prepare a student for editing
  function editStudent(student) {
    setName(student.name);
    setCourse(student.course);
    setEditId(student.id);
  }

  // DELETE: Remove a student
  function deleteStudent(id) {
    const remainingStudents = students.filter(
      (student) => student.id !== id
    );

    setStudents(remainingStudents);
  }

  return (
    <div>
      <h1>Student Management System</h1>

      {/* CREATE and UPDATE form */}
      <form onSubmit={editId === null ? addStudent : updateStudent}>
        <input
          type="text"
          placeholder="Enter student name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <input
          type="text"
          placeholder="Enter course"
          value={course}
          onChange={(event) => setCourse(event.target.value)}
        />

        <button type="submit">
          {editId === null ? "Add Student" : "Update Student"}
        </button>

        {editId !== null && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setName("");
              setCourse("");
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <hr />

      {/* READ: Display students */}
      <h2>Student List</h2>

      {students.length === 0 ? (
        <p>No students available.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Course</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.course}</td>

                <td>
                  <button
                    type="button"
                    onClick={() => editStudent(student)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteStudent(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;