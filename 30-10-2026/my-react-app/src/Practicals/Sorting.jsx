import { useEffect, useState } from "react";

function App() {
    const [users, setUsers] = useState([]);
    const [selectedCity, setSelectedCity] = useState("All");

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

    const filteredUsers = users.filter((user) => {
        if (selectedCity === "All") {
            return true;
        }

        return user.address.city === selectedCity;
    });

    return (
        <div>
            <h1>Filter Users by City</h1>

            <select
                value={selectedCity}
                onChange={(event) => setSelectedCity(event.target.value)}
            >
                <option value="All">All Cities</option>
                <option value="Gwenborough">Gwenborough</option>
                <option value="Wisokyburgh">Wisokyburgh</option>
                <option value="McKenziehaven">McKenziehaven</option>
            </select>

            {filteredUsers.map((user) => (
                <p key={user.id}>
                    {user.name} - {user.address.city}
                </p>
            ))}
        </div>
    );
}

export default App;