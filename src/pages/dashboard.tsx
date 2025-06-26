import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, logout, getToken } from "../utils/auth";

export default function Dashboard() {
    const navigate = useNavigate();
    const [token, setToken] = useState('');

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/"); // Redirect to login if not authenticated
        } else {
            const storedToken = getToken();
            if (storedToken) {
                setToken(storedToken); // Set the token to display
            } else {
                setToken('No token found.'); // Fallback if no token is stored
            }
        }
    }, []);

    return (
        <div className="flex-col space-y-6 items-center justify-center">
            <h1>Dashboard</h1>
            <div>
                <p>Welcome to your dashboard!</p>
                <p>If you are seeing this, you are who you say you are.</p>
            </div>
            <p className="text-sm text-gray-600 mb-4">
                Your JWT token: <span className="text-blue-600">{token || 'No token found.'}</span>
            </p>
            <button onClick={() => { logout(); navigate("/"); }} className="btn btn-primary">
                Logout
            </button>
        </div>
    );
}