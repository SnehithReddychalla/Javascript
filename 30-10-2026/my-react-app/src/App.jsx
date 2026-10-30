import { useState } from "react";

import {
    Routes,
    Route,
    Link,
    NavLink,
    useParams,
    useNavigate,
    Navigate,
    Outlet
} from "react-router-dom";

// Home Page
function Home() {
    return (
        <div>
            <h2>Home Page</h2>
            <p>Welcome to our React application!</p>
        </div>
    );
}

// About Page
function About() {
    return <h2>About Page</h2>;
}

// Users Page
function Users() {
    const userIds = [1, 2, 3];

    return (
        <div>
            <h2>Users List</h2>

            {userIds.map((id) => (
                <p key={id}>
                    <Link to={/users/${id}}>
                        View User {id}
                    </Link>
                </p>
            ))}
        </div>
    );
}

// Dynamic Route and useParams
function UserDetails() {
    const { id } = useParams();

    return (
        <div>
            <h2>User Details</h2>
            <p>User ID: {id}</p>
        </div>
    );
}

// Login Page and useNavigate
function Login({ setIsLoggedIn }) {
    const navigate = useNavigate();

    function handleLogin() {
        setIsLoggedIn(true);
        navigate("/dashboard");
    }

    return (
        <div>
            <h2>Login Page</h2>
            <button onClick={handleLogin}>
                Log In
            </button>
        </div>
    );
}

// Protected Route
function ProtectedRoute({ isLoggedIn, children }) {
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

// Nested Route Layout
function Dashboard() {
    return (
        <div>
            <h2>Dashboard</h2>

            <nav>
                <Link to="/dashboard">Dashboard Home</Link>
                {" | "}
                <Link to="/dashboard/profile">Profile</Link>
                {" | "}
                <Link to="/dashboard/settings">Settings</Link>
            </nav>

            <hr />

            <Outlet />
        </div>
    );
}

// Dashboard Home
function DashboardHome() {
    return <h3>Welcome to Dashboard Home!</h3>;
}

// Profile Page
function Profile() {
    return <h3>Profile Page</h3>;
}

// Settings Page
function Settings() {
    return <h3>Settings Page</h3>;
}

// 404 Page
function NotFound() {
    return (
        <div>
            <h2>404 - Page Not Found</h2>
            <Link to="/">Go to Home</Link>
        </div>
    );
}

// Main Application
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div>
            <h1>React Router Application</h1>

            {/* Navigation using NavLink */}
            <nav>
                <NavLink to="/" end>
                    Home
                </NavLink>
                {" | "}

                <NavLink to="/about">
                    About
                </NavLink>
                {" | "}

                <NavLink to="/users">
                    Users
                </NavLink>
                {" | "}

                <NavLink to="/login">
                    Login
                </NavLink>
                {" | "}

                <NavLink to="/dashboard">
                    Dashboard
                </NavLink>
            </nav>

            <hr />

            {/* Route Definitions */}
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/about" element={<About />} />

                <Route path="/users" element={<Users />} />

                {/* Dynamic Route */}
                <Route
                    path="/users/:id"
                    element={<UserDetails />}
                />

                {/* Login Route */}
                <Route
                    path="/login"
                    element={
                        <Login setIsLoggedIn={setIsLoggedIn} />
                    }
                />

                {/* Nested and Protected Routes */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute isLoggedIn={isLoggedIn}>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        index
                        element={<DashboardHome />}
                    />

                    <Route
                        path="profile"
                        element={<Profile />}
                    />

                    <Route
                        path="settings"
                        element={<Settings />}
                    />
                </Route>

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
            </Routes>

            <hr />

            <p>
                Login Status: {isLoggedIn ? "Logged In" : "Logged Out"}
            </p>

            {isLoggedIn && (
                <button onClick={() => setIsLoggedIn(false)}>
                    Log Out
                </button>
            )}
        </div>
    );
}

export default App;