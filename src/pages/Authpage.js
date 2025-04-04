import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import logiTrack from "../../src/assets/images/logiTrack-bg.jpg";

const AuthPage = () => {
  const { login, register, mockUsers } = useAuth(); // Get functions and mockUsers from AuthContext
  const navigate = useNavigate();

  // State for input fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("driver"); // Default role
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(""); // For displaying error messages

  // State to toggle between login and register modes
  const [isLoginMode, setIsLoginMode] = useState(true);

  // Handle login
  const handleLogin = () => {
    try {
      login(email, password); // Use the login function from AuthContext

      // Redirect based on the user's role
      switch (mockUsers.find((user) => user.email === email)?.role) {
        case "admin":
          navigate("/dashboard");
          break;
        case "coordinator":
          navigate("/dashboard");
          break;
        case "driver":
          navigate("/dashboard");
          break;
        default:
          navigate("/auth");
      }
    } catch (err) {
      setError(err.message); // Display error message
    }
  };

  // Handle registration
  const handleRegister = () => {
    // Basic validations
    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Create new user object
    const newUser = {
      fullName, // Include fullName
      email,
      phoneNumber,
      role,
      password, // Note: In a real app, never store plain-text passwords!
    };

    try {
      register(newUser); // Use the register function from AuthContext
      console.log("Registered:", newUser);

      setError(""); // Clear any previous errors
      setIsLoginMode(true); // Switch to login mode after registration
    } catch (err) {
      setError(err.message); // Display error message
    }
  };

  // Toggle between login and register modes
  const toggleMode = () => {
    setIsLoginMode((prev) => !prev);
    setError(""); // Clear errors when switching modes
  };

  return (
    <div className="fixed w-full h-full z-50 inset-0 flex justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
      <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center items-center">
          <img
            src={logiTrack}
            width={"60px"}
            height={"60px"}
            className="rounded-full"
            alt="LogiTrack Logo"
          />
          <h2 className="text-2xl font-bold text-center text-blue-600">
            {isLoginMode ? "Login" : "Create Your Account"}
          </h2>
        </div>

        {/* Display error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-md">
            {error}
          </div>
        )}

        {/* Login Form */}
        {isLoginMode && (
          <>
            {/* Email Input */}
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          </>
        )}

        {/* Registration Form */}
        {!isLoginMode && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name Input */}
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="border border-gray-300 p-3 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email Input */}
            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 p-3 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Phone Number Input */}
            <div>
              <input
                type="text"
                placeholder="Phone Number (Optional)"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="border border-gray-300 p-3 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password Input */}
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 p-3 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Confirm Password Input */}
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border border-gray-300 p-3 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Role Selection */}
            <div className="col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Select Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border border-gray-300 p-3 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="coordinator">Coordinator</option>
                <option value="driver">Driver</option>
              </select>
            </div>
          </div>
        )}

        {/* Login/Register Button */}
        <button
          onClick={isLoginMode ? handleLogin : handleRegister}
          className="bg-blue-500 text-white px-4 py-3 rounded-md w-full hover:bg-blue-600 transition duration-200"
        >
          {isLoginMode ? "Login" : "Create Account"}
        </button>

        {/* Toggle between Login and Register */}
        <p className="mt-4 text-center text-gray-600">
          {isLoginMode
            ? "Don't have an account? "
            : "Already have an account? "}
          <button
            onClick={toggleMode}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            {isLoginMode ? "Register here" : "Log in here"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
