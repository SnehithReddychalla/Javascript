import { useEffect, useState } from "react";

function App() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/users"
                );

                if (!response.ok) {
                    throw new Error("Unable to load users");
                }

                const data = await response.json();

                setUsers(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);

    if (loading) {
        return <h2>Loading users...</h2>;
    }

    if (error) {
        return <h2>Error: {error}</h2>;
    }

    if (users.length === 0) {
        return <h2>No users found.</h2>;
    }

    return (
        <div>
            <h1>User List</h1>

            {users.map((user) => (
                <p key={user.id}>{user.name}</p>
            ))}
        </div>
    );
}

export default App;