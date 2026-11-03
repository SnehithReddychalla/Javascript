
import React, { createContext, useContext } from "react";

// Create Context
const UserContext = createContext();

// Parent Component
function ShareData() {

  const user = {
    name: "Snehith",
    age: 22,
    course: "React JS"
  };

  return (
    <UserContext.Provider value={user}>
      <h1>Sharing Data Between Components</h1>

      <Student />
      <Teacher />
      <Details />

    </UserContext.Provider>
  );
}

// Student Component
function Student() {
  const data = useContext(UserContext);

  return (
    <div>
      <h2>Student Component</h2>
      <p>Name: {data.name}</p>
    </div>
  );
}

// Teacher Component
function Teacher() {
  const data = useContext(UserContext);

  return (
    <div>
      <h2>Teacher Component</h2>
      <p>Age: {data.age}</p>
    </div>
  );
}

// Details Component
function Details() {
  const data = useContext(UserContext);

  return (
    <div>
      <h2>Details Component</h2>
      <p>Course: {data.course}</p>
    </div>
  );
}

export default ShareData;