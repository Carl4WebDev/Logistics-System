import React, { useState } from "react";

const FleetList = () => {
  // Sample fleet data
  const [fleet, setFleet] = useState([
    { id: 1, vehicle: "Truck A", driver: "John Doe", status: "Available" },
    { id: 2, vehicle: "Van B", driver: "Jane Smith", status: "In Transit" },
  ]);

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({ driver: "", status: "" });

  // Open modal for editing a specific driver
  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData({ driver: fleet[index].driver, status: fleet[index].status });
    setIsModalOpen(true);
  };

  // Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save updated driver and status
  const handleSave = () => {
    const updatedFleet = [...fleet];
    updatedFleet[editingIndex] = {
      ...updatedFleet[editingIndex],
      driver: formData.driver,
      status: formData.status,
    };
    setFleet(updatedFleet);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Fleet Management</h2>

      {/* Fleet Table */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left">Vehicle</th>
            <th className="p-3 text-left">Driver</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {fleet.map((vehicle, index) => (
            <tr key={vehicle.id} className="border-b">
              <td className="p-3">{vehicle.vehicle}</td>
              <td className="p-3">{vehicle.driver || "No Driver Assigned"}</td>
              <td className="p-3">{vehicle.status}</td>
              <td className="p-3">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Editing Driver & Status */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Driver & Status</h2>
            <label className="block mb-2">Driver Name:</label>
            <input
              type="text"
              name="driver"
              value={formData.driver}
              onChange={handleChange}
              className="border p-2 w-full mb-3"
            />
            <label className="block mb-2">Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border p-2 w-full mb-4"
            >
              <option value="Available">Available</option>
              <option value="In Transit">In Transit</option>
              <option value="Under Maintenance">Under Maintenance</option>
            </select>
            <div className="flex justify-end">
              <button className="bg-green-500 text-white px-4 py-2 rounded mr-2" onClick={handleSave}>
                Save
              </button>
              <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FleetList;
