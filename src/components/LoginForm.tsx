import { useState } from "react";
import { setToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {

  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "reqres-free-v1"
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        if(password != 'cityslicka') {
          setError("Invalid password. Please try again.");
          return;
        }
        setToken(data.token); // store auth token in localStorage
        navigate("/dashboard"); // go to dashboard
      } else {
        setError(data.error || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div>
    <h1 className="text-xl font-bold text-center mt-10">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col space-y-4 items-center justify-center mt-10">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="p-2 border-gray-100 border rounded-xl mb-4 w-full max-w-xs mx-auto "
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="p-2 border-gray-100 border rounded-xl mb-4 w-full max-w-xs mx-auto "
      />
      <button type="submit">Login</button>
      {error && <p className="error">{error}</p>}
    </form>
    </div>
  );
};