import React, { useState } from "react";

const ShipmentsPage = () => {
  // Sample shipment data
  const [shipments, setShipments] = useState([
    { id: 1, recipient: "Alice Johnson", tracking: "TRK12345", status: "Pending" },
    { id: 2, recipient: "Bob Smith", tracking: "TRK67890", status: "Shipped" },
  ]);

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({ recipient: "", tracking: "", status: "" });

  // Open modal for editing a specific shipment
  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData({
      recipient: shipments[index].recipient,
      tracking: shipments[index].tracking,
      status: shipments[index].status,
    });
    setIsModalOpen(true);
  };

  // Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save updated shipment details
  const handleSave = () => {
    const updatedShipments = [...shipments];
    updatedShipments[editingIndex] = {
      ...updatedShipments[editingIndex],
      recipient: formData.recipient,
      tracking: formData.tracking,
      status: formData.status,
    };
    setShipments(updatedShipments);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Shipments Management</h2>

      {/* Shipments Table */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left">Recipient</th>
            <th className="p-3 text-left">Tracking Number</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment, index) => (
            <tr key={shipment.id} className="border-b">
              <td className="p-3">{shipment.recipient}</td>
              <td className="p-3">{shipment.tracking}</td>
              <td className="p-3">{shipment.status}</td>
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

      {/* Modal for Editing Shipment Details */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Shipment</h2>
            <label className="block mb-2">Recipient Name:</label>
            <input
              type="text"
              name="recipient"
              value={formData.recipient}
              onChange={handleChange}
              className="border p-2 w-full mb-3"
            />
            <label className="block mb-2">Tracking Number:</label>
            <input
              type="text"
              name="tracking"
              value={formData.tracking}
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
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
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

export default ShipmentsPage;
