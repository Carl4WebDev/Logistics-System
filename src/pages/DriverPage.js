import React, { useState } from "react";

const DriverPage = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: "Alex Turner",
      licenseNumber: "D12345",
      vehicleAssigned: "Truck 01",
      status: "Active",
    },
    {
      id: 2,
      name: "Chris Martin",
      licenseNumber: "D67890",
      vehicleAssigned: "Van 12",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Eddie Vedder",
      licenseNumber: "D54321",
      vehicleAssigned: "Truck 03",
      status: "Active",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDriver, setNewDriver] = useState({
    name: "",
    licenseNumber: "",
    vehicleAssigned: "",
    status: "Active",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 5;

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleEdit = (driver) => {
    setSelectedDriver(driver);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === selectedDriver.id ? selectedDriver : item
      )
    );
    setIsModalOpen(false);
  };

  const handleAddDriver = () => {
    const newId = data.length + 1;
    setData([...data, { id: newId, ...newDriver }]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="p-4 w-full">
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search driver..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-2 rounded w-1/3 mr-4"
        />

        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => setIsAddModalOpen(true)}
        >
          Add New Driver
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center pointer-events-none">
          <div className="bg-white p-6 rounded w-96 pointer-events-auto">
            <h2 className="text-lg font-bold mb-4">Edit Driver</h2>
            <input
              type="text"
              placeholder="Name"
              value={selectedDriver?.name || ""}
              onChange={(e) =>
                setSelectedDriver({ ...selectedDriver, name: e.target.value })
              }
              className="border border-gray-300 p-2 w-full mb-2"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded ml-2"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        {/* Table for Larger Screens */}
        <table className="hidden md:table table-auto w-full border-collapse border border-gray-300 text-white">
          <thead>
            <tr>
              {[
                "Name",
                "License Number",
                "Vehicle Assigned",
                "Status",
                "Edit",
                "Delete",
              ].map((header) => (
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
            {currentData.map((row, index) => (
              <tr key={index} className="border border-gray-300">
                <td className="p-2">{row.name}</td>
                <td>{row.licenseNumber}</td>
                <td>{row.vehicleAssigned}</td>
                <td className="text-center">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      row.status === "Active" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                    onClick={() => handleEdit(row)}
                  >
                    Edit
                  </button>
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                    onClick={() => handleDelete(row.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center pointer-events-none z-50">
            <div className="bg-white p-6 rounded w-96 pointer-events-auto">
              <h2 className="text-lg font-bold mb-4">Edit Driver</h2>
              <input
                type="text"
                placeholder="Name"
                value={selectedDriver?.name || ""}
                onChange={(e) =>
                  setSelectedDriver({ ...selectedDriver, name: e.target.value })
                }
                className="border border-gray-300 p-2 w-full mb-2"
              />
              <input
                type="text"
                placeholder="License Number"
                value={selectedDriver?.licenseNumber || ""}
                onChange={(e) =>
                  setSelectedDriver({
                    ...selectedDriver,
                    licenseNumber: e.target.value,
                  })
                }
                className="border border-gray-300 p-2 w-full mb-2"
              />
              <input
                type="text"
                placeholder="Vehicle Assigned"
                value={selectedDriver?.vehicleAssigned || ""}
                onChange={(e) =>
                  setSelectedDriver({
                    ...selectedDriver,
                    vehicleAssigned: e.target.value,
                  })
                }
                className="border border-gray-300 p-2 w-full mb-2"
              />
              <select
                value={selectedDriver?.status || ""}
                onChange={(e) =>
                  setSelectedDriver({
                    ...selectedDriver,
                    status: e.target.value,
                  })
                }
                className="border border-gray-300 p-2 w-full mb-2"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded ml-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center pointer-events-none z-50">
            <div className="bg-white p-6 rounded w-96 pointer-events-auto">
              <h2 className="text-lg font-bold mb-4">Add New Driver</h2>
              <input
                type="text"
                placeholder="Name"
                value={newDriver.name}
                onChange={(e) =>
                  setNewDriver({ ...newDriver, name: e.target.value })
                }
                className="border border-gray-300 p-2 w-full mb-2"
              />
              <input
                type="text"
                placeholder="License Number"
                value={newDriver.licenseNumber}
                onChange={(e) =>
                  setNewDriver({ ...newDriver, licenseNumber: e.target.value })
                }
                className="border border-gray-300 p-2 w-full mb-2"
              />
              <input
                type="text"
                placeholder="Vehicle Assigned"
                value={newDriver.vehicleAssigned}
                onChange={(e) =>
                  setNewDriver({
                    ...newDriver,
                    vehicleAssigned: e.target.value,
                  })
                }
                className="border border-gray-300 p-2 w-full mb-2"
              />
              <select
                value={newDriver.status}
                onChange={(e) =>
                  setNewDriver({ ...newDriver, status: e.target.value })
                }
                className="border border-gray-300 p-2 w-full mb-2"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleAddDriver}
              >
                Add
              </button>
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded ml-2"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Column Display for Small Screens */}
        <div className="md:hidden flex flex-col gap-4">
          {currentData.map((row, index) => (
            <div
              key={index}
              className="border border-gray-300 p-4 rounded bg-gray-800 text-white"
            >
              <p>
                <strong>Name:</strong> {row.name}
              </p>
              <p>
                <strong>License Number:</strong> {row.licenseNumber}
              </p>
              <p>
                <strong>Vehicle Assigned:</strong> {row.vehicleAssigned}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded text-white ${
                    row.status === "Active" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {row.status}
                </span>
              </p>
              <div className="flex gap-2 mt-2">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                  onClick={() => handleEdit(row)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  onClick={() => handleDelete(row.id)}
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
          className={`px-3 py-1 rounded bg-gray-500 text-white ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-white">
          Page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
        </span>
        <button
          className={`px-3 py-1 rounded bg-blue-500 text-white ${
            currentPage === Math.ceil(filteredData.length / itemsPerPage)
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(filteredData.length / itemsPerPage))
            )
          }
          disabled={
            currentPage === Math.ceil(filteredData.length / itemsPerPage)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DriverPage;
