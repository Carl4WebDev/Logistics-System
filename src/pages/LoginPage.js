import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleLogin = () => {
    const mockUsers = [
      { username: "admin", password: "admin123", role: "admin" },
      { username: "customer", password: "customer123", role: "customer" },
    ];

    const matchedUser = mockUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (!matchedUser) {
      alert("Invalid username or password.");
      return;
    }

    if (matchedUser.role !== role) {
      alert("Selected role does not match the account role.");
      return;
    }

    login(matchedUser.role);

    if (matchedUser.role === "admin") {
      navigate("/report"); // Admin route
    } else if (matchedUser.role === "customer") {
      navigate("/customers"); // Customer route
    }
  };

  return (
    <div className="fixed inset-0 top-16 flex justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Login
        </h2>

        {/* Username Input */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-300 p-3 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-3 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Role Selection */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border border-gray-300 p-3 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="customer">Customer</option>
        </select>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-3 rounded-md w-full hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
