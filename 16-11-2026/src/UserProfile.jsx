import React, { useContext } from "react";
import { UserContext } from "./UserContext";

function UserProfile() {

  // Access shared data
  const { user, setUser } = useContext(UserContext);

  return (
    <div style={{
      border: "2px solid blue",
      padding: "20px",
      margin: "20px"
    }}>

      <h2>User Profile</h2>

      <p>Name: {user.name}</p>

      <p>Role: {user.role}</p>

      <p>Department: {user.department}</p>

      <button onClick={() => setUser({
        ...user,
        department: "React Development"
      })}>
        Update Department
      </button>

    </div>
  );
}

export default UserProfile;