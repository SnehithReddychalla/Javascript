import { useEffect, useState } from "react";

function App() {
    const [users, setUsers] = useState([]);

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
                console.log(error.message);
            }
        }

        fetchUsers();
    }, []);

    return (
        <div>
            <h1>User List</h1>

            {users.map((user) => (
                <p key={user.id}>
                    {user.name} - {user.email}
                </p>
            ))}
        </div>
    );
}

export default App;