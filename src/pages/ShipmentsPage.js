import React, { useState } from "react";

const ShipmentsPage = () => {
  // Sample shipment data
  const [shipments, setShipments] = useState([
    { id: 1, recipient: "John Doe", tracking: "TRK12345", status: "Pending", dtrs: "DTRS001", dispatchDate: "2025-03-01", manifest: "Manifest A", ticketRoute: "Route 1", driverName: "John Doe" },
    { id: 2, recipient: "Jane Smith", tracking: "TRK67890", status: "Shipped", dtrs: "DTRS002", dispatchDate: "2025-03-02", manifest: "Manifest B", ticketRoute: "Route 2", driverName: "Jane Doe" },
  ]);

  // State for modal and form
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({ recipient: "", tracking: "", status: "Pending", dtrs: "", dispatchDate: "", manifest: "", ticketRoute: "", driverName: "" });

  // Open modal for editing or creating a shipment
  const handleOpenModal = (index = null) => {
    if (index !== null) {
      setIsEditing(true);
      setEditingIndex(index);
      setFormData(shipments[index]);
    } else {
      setIsEditing(false);
      setFormData({ recipient: "", tracking: "", status: "Pending", dtrs: "", dispatchDate: "", manifest: "", ticketRoute: "", driverName: "" });
    }
    setIsModalOpen(true);
  };

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Save new or edited shipment
  const handleSave = () => {
    if (isEditing) {
      const updatedShipments = [...shipments];
      updatedShipments[editingIndex] = formData;
      setShipments(updatedShipments);
    } else {
      setShipments([...shipments, { ...formData, id: shipments.length + 1 }]);
    }
    setIsModalOpen(false);
  };

  // Filter shipments based on search term
  const filteredShipments = shipments.filter((shipment) =>
    shipment.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.tracking.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Shipments Management</h2>
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => handleOpenModal()}>
          + Create New Shipment
        </button>
      </div>

      {/* Search Bar (Full Width) */}
      <input
        type="text"
        placeholder="Search shipments..."
        className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* Desktop Table View */}
      <div className="overflow-x-auto hidden md:block">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Recipient</th>
              <th className="p-3 text-left">Tracking Number</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">DTRS</th>
              <th className="p-3 text-left">Dispatch Date</th>
              <th className="p-3 text-left">Shipment Manifest</th>
              <th className="p-3 text-left">Ticket Route</th>
              <th className="p-3 text-left">Driver Name</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredShipments.map((shipment, index) => (
              <tr key={shipment.id} className="border-b">
                <td className="p-3">{shipment.recipient}</td>
                <td className="p-3">{shipment.tracking}</td>
                <td className="p-3">{shipment.status}</td>
                <td className="p-3">{shipment.dtrs}</td>
                <td className="p-3">{shipment.dispatchDate}</td>
                <td className="p-3">{shipment.manifest}</td>
                <td className="p-3">{shipment.ticketRoute}</td>
                <td className="p-3">{shipment.driverName}</td>
                <td className="p-3">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2" onClick={() => handleOpenModal(index)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View - Column Format */}
      <div className="md:hidden">
        {filteredShipments.map((shipment, index) => (
          <div key={shipment.id} className="border p-4 mb-4 bg-white rounded-lg shadow">
            <p><strong>Recipient:</strong> {shipment.recipient}</p>
            <p><strong>Tracking Number:</strong> {shipment.tracking}</p>
            <p><strong>Status:</strong> {shipment.status}</p>
            <p><strong>DTRS:</strong> {shipment.dtrs}</p>
            <p><strong>Dispatch Date:</strong> {shipment.dispatchDate}</p>
            <p><strong>Shipment Manifest:</strong> {shipment.manifest}</p>
            <p><strong>Ticket Route:</strong> {shipment.ticketRoute}</p>
            <p><strong>Driver Name:</strong> {shipment.driverName}</p>
            <button className="bg-blue-500 text-white px-3 py-1 rounded mt-2" onClick={() => handleOpenModal(index)}>
              Edit
            </button>
          </div>
        ))}
      </div>

      {/* Modal for Creating or Editing Shipment */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-5">
          <div className="bg-white p-5 rounded-lg shadow-lg w-full md:w-[80%] lg:w-[60%] max-w-2xl max-h-[80vh] overflow-y-auto">
            
            {/* Modal Title */}
            <h2 className="text-lg font-semibold mb-3 sticky top-0 bg-white py-3 z-10">
              {isEditing ? "Edit Shipment" : "Create New Shipment"}
            </h2>

            {/* Grid Layout for Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {["recipient", "tracking", "dtrs", "dispatchDate", "manifest", "ticketRoute", "driverName"].map((field) => (
                <div key={field}>
                  <label className="block text-sm mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1')}:</label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="border p-2 h-10 w-full text-sm"
                  />
                </div>
              ))}

              {/* Status Field - Full Width */}
              <div className="md:col-span-2">
                <label className="block text-sm mb-1">Status:</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="border p-2 h-10 w-full text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>

            {/* Sticky Footer Buttons */}
            <div className="sticky bottom-0 bg-white py-3 mt-3 flex justify-end border-t">
              <button className="bg-green-500 text-white px-4 py-2 rounded text-sm mr-2" onClick={handleSave}>
                Save
              </button>
              <button className="bg-gray-400 text-white px-4 py-2 rounded text-sm" onClick={() => setIsModalOpen(false)}>
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
