import React, { useState } from "react";

const Accounts = () => {
  // Sample user data
  const initialUsers = [
    { id: 1, fullName: "John Doe", email: "john@example.com", role: "driver" },
    {
      id: 2,
      fullName: "Jane Smith",
      email: "jane@example.com",
      role: "coordinator",
    },
    {
      id: 3,
      fullName: "Admin User",
      email: "admin@example.com",
      role: "admin",
    },
    { id: 4, fullName: "Mark Lee", email: "mark@example.com", role: "driver" },
    {
      id: 5,
      fullName: "Emily Davis",
      email: "emily@example.com",
      role: "coordinator",
    },
    {
      id: 6,
      fullName: "Chris Brown",
      email: "chris@example.com",
      role: "driver",
    },
  ];

  // State for users, search, and pagination
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // Adjust as needed

  // Handle role update
  const handleRoleChange = (id, newRole) => {
    setUsers(
      users.map((user) => (user.id === id ? { ...user, role: newRole } : user))
    );
  };

  // Handle account deletion
  const handleDeleteUser = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  // Filter users based on search query (name, email, or role)
  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase()) // Add role to search criteria
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="p-4 w-full">
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search by name, email, or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 p-2 rounded w-1/3 mr-4"
        />
      </div>

      <div className="overflow-x-auto">
        {/* Table for Larger Screens */}
        <table className="hidden md:table table-auto w-full border-collapse border border-gray-300 text-white">
          <thead>
            <tr>
              {["Full Name", "Email", "Role", "Actions"].map((header) => (
                <th
                  key={header}
                  className="border border-gray-300 bg-gray-800 px-4 py-2 min-w-[150px] text-center"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className="border border-gray-300">
                <td className="p-2">{user.fullName}</td>
                <td>{user.email}</td>
                <td className="text-center">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                  >
                    <option value="admin">Admin</option>
                    <option value="coordinator">Coordinator</option>
                    <option value="driver">Driver</option>
                  </select>
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Column Display for Small Screens */}
        <div className="md:hidden flex flex-col gap-4">
          {currentUsers.map((user) => (
            <div
              key={user.id}
              className="border border-gray-300 p-4 rounded bg-gray-800 text-white"
            >
              <p>
                <strong>Full Name:</strong> {user.fullName}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Role:</strong>{" "}
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 w-full"
                >
                  <option value="admin">Admin</option>
                  <option value="coordinator">Coordinator</option>
                  <option value="driver">Driver</option>
                </select>
              </p>
              <div className="flex gap-2 mt-2">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          className={`px-3 py-1 rounded bg-gray-500 hover:bg-gray-700 text-white ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-white">
          Page {currentPage} of {Math.ceil(filteredUsers.length / usersPerPage)}
        </span>
        <button
          className={`px-3 py-1 rounded bg-blue-500 hover:bg-blue-700 text-white ${
            currentPage === Math.ceil(filteredUsers.length / usersPerPage)
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(filteredUsers.length / usersPerPage))
            )
          }
          disabled={
            currentPage === Math.ceil(filteredUsers.length / usersPerPage)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Accounts;
