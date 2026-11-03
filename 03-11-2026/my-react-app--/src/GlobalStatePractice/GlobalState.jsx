import {createContext,useContext,useState} from "react";
const UserContext =createContext();
function Navbar(){
    const user =useContext(UserContext);
    return <h2>welcome, {user} </h2>;
}
function Dashboard(){
    return(
        <div>
            <Navbar/>
            <h3>This is Dashboard</h3>
        </div>
    );
}
export default function GlobalState(){
    const [username, setUsername]=
    useState("Snehith");
    return(
        <UserContext.Provider
        value={username}>
            <Dashboard/>
            <button onClick={()=>

             setUsername("Rahul")}>
                change User
             </button>
        </UserContext.Provider>
    );
}