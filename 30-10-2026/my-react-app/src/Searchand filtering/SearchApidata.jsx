import { useEffect, useState } from "react";

function App() {
    const [users, setUsers] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/users"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }

                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error(error.message);
            }
        }

        fetchUsers();
    }, []);

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div>
            <h1>Search Users</h1>

            <input
                type="text"
                placeholder="Enter user name"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
            />

            {filteredUsers.map((user) => (
                <p key={user.id}>{user.name}</p>
            ))}
        </div>
    );
}

export default App;