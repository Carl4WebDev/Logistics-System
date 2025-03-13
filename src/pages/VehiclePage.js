import React, { useState } from "react";

const VehiclePage = () => {
  const [vehicles, setVehicles] = useState([
    { id: "V001", type: "Truck", plateNumber: "ABC-123" },
    { id: "V002", type: "Van", plateNumber: "DEF-456" },
    { id: "V003", type: "Motorcycle", plateNumber: "GHI-789" },
    { id: "V004", type: "SUV", plateNumber: "JKL-012" },
    { id: "V005", type: "Sedan", plateNumber: "MNO-345" },
    { id: "V006", type: "Pickup", plateNumber: "XYZ-999" },
    { id: "V007", type: "Bus", plateNumber: "TRN-222" },
    { id: "V008", type: "Jeepney", plateNumber: "JPN-123" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const vehiclesPerPage = 5;

  // Filtered vehicles based on search
  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredVehicles.length / vehiclesPerPage);
  const startIndex = (currentPage - 1) * vehiclesPerPage;
  const endIndex = startIndex + vehiclesPerPage;
  const currentVehicles = filteredVehicles.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    id: "",
    type: "",
    plateNumber: "",
  });

  const handleAddVehicle = () => {
    if (!newVehicle.id || !newVehicle.type || !newVehicle.plateNumber) {
      alert("Please fill in all fields.");
      return;
    }

    setVehicles([...vehicles, newVehicle]);
    setIsModalOpen(false);
    setNewVehicle({ id: "", type: "", plateNumber: "" });
  };

  return (
    <div className="p-5 w-full">
      {/* Header and Controls */}
      <h2 className="text-3xl text-white font-bold">Vehicles</h2>
      <div className="flex flex-wrap justify-end items-center mb-4 w-full gap-2">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search vehicles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 w-full sm:w-1/3 border rounded bg-gray-800 text-white"
        />

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          + New Vehicle
        </button>
      </div>

      {/* Table for Desktop / Column Layout for Small Screens */}
      <div className="overflow-x-auto w-full">
        {/* Table Layout for Larger Screens */}
        <table className="w-full border-collapse sm:table hidden">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-3 text-left">Vehicle ID</th>
              <th className="p-3 text-left">Vehicle Type</th>
              <th className="p-3 text-left">Plate Number</th>
            </tr>
          </thead>
          <tbody>
            {currentVehicles.map((vehicle) => (
              <tr
                key={vehicle.id}
                className="border-b border-gray-700 text-white"
              >
                <td className="p-3">{vehicle.id}</td>
                <td className="p-3">{vehicle.type}</td>
                <td className="p-3">{vehicle.plateNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Column Layout for Small Screens */}
        <div className="flex flex-col gap-3 sm:hidden">
          {currentVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-gray-800 text-white rounded-lg p-4 border border-gray-700"
            >
              <p className="font-bold">Vehicle ID: {vehicle.id}</p>
              <p>Type: {vehicle.type}</p>
              <p>Plate Number: {vehicle.plateNumber}</p>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            className={`px-3 py-1 rounded bg-gray-500 text-white ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`px-3 py-1 rounded bg-blue-500 text-white ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal for Adding New Vehicle */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-3/5 max-h-[80vh] p-6 rounded-lg overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">New Vehicle</h2>
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={() => setIsModalOpen(false)}
              >
                ✖
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Vehicle ID</label>
                <input
                  type="text"
                  value={newVehicle.id}
                  onChange={(e) =>
                    setNewVehicle({ ...newVehicle, id: e.target.value })
                  }
                  className="border p-2 w-full rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Vehicle Type
                </label>
                <input
                  type="text"
                  value={newVehicle.type}
                  onChange={(e) =>
                    setNewVehicle({ ...newVehicle, type: e.target.value })
                  }
                  className="border p-2 w-full rounded"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium">
                  Plate Number
                </label>
                <input
                  type="text"
                  value={newVehicle.plateNumber}
                  onChange={(e) =>
                    setNewVehicle({
                      ...newVehicle,
                      plateNumber: e.target.value,
                    })
                  }
                  className="border p-2 w-full rounded"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleAddVehicle}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehiclePage;
