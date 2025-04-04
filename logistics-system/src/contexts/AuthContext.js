import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Mock user data (replace with your actual backend logic)
  const [mockUsers, setMockUsers] = useState([
    {
      id: 1, // Add unique IDs for users
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
      fullName: "Admin User",
    },
    {
      id: 2,
      email: "coordinator@example.com",
      password: "coordinator123",
      role: "coordinator",
      fullName: "Coordinator User",
    },
    {
      id: 3,
      email: "driver@example.com",
      password: "driver123",
      role: "driver",
      fullName: "Driver User",
    },
  ]);

  // Current logged-in user (persisted in localStorage)
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Update localStorage whenever the user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

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
    const userWithId = { ...newUser, id: mockUsers.length + 1 }; // Assign a unique ID
    setMockUsers((prevUsers) => [...prevUsers, userWithId]);
    setUser(userWithId); // Set the newly registered user as the logged-in user
  };

  // Logout function
  const logout = () => {
    setUser(null); // Clear the logged-in user
  };

  // Function to update a user's role
  const updateUserRole = (id, newRole) => {
    setMockUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, role: newRole } : user
      )
    );
  };

  // Function to delete a user
  const deleteUser = (id) => {
    setMockUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        mockUsers,
        login,
        register,
        logout,
        updateUserRole,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
