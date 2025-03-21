import React, { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Mock user data (replace with your actual backend logic)
  const [mockUsers, setMockUsers] = useState([
    { email: "admin@example.com", password: "admin123", role: "admin" },
    {
      email: "coordinator@example.com",
      password: "coordinator123",
      role: "coordinator",
    },
    { email: "driver@example.com", password: "driver123", role: "driver" },
  ]);

  const [user, setUser] = useState(null); // Current logged-in user

  // Login function
  const login = (email, password) => {
    const matchedUser = mockUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      setUser(matchedUser); // Set the logged-in user
    } else {
      throw new Error("Invalid email or password.");
    }
  };

  // Register function
  const register = (newUser) => {
    // Check if the email is already registered
    const userExists = mockUsers.some((user) => user.email === newUser.email);
    if (userExists) {
      throw new Error("An account with this email already exists.");
    }

    // Add the new user to the mockUsers array
    setMockUsers((prevUsers) => [...prevUsers, newUser]);
  };

  // Logout function
  const logout = () => {
    setUser(null); // Clear the logged-in user
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        mockUsers,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
