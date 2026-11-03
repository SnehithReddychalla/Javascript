import { createContext } from "react";

const UserContext = createContext();

function GrandChild() {
  return (
    <UserContext.Consumer>
      {(username) => (
        <h2>Welcome, {username}</h2>
      )}
    </UserContext.Consumer>
  );
}

function Child() {
  return <GrandChild />;
}

function Parent() {
  return <Child />;
}

function ContextExample() {
  return (
    <UserContext.Provider value="Snehith">
      <Parent />
    </UserContext.Provider>
  );
}

export default ContextExample;