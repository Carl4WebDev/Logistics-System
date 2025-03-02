
import React from "react";

const fleetData = [
  { id: 1, name: "Truck A", status: "Active", driver: "John Doe" },
  { id: 2, name: "Van B", status: "Idle", driver: "Jane Smith" },
  { id: 3, name: "Bike C", status: "Maintenance", driver: "Carlos Rivera" },
];

const FleetList = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Fleet Management</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Vehicle</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Driver</th>
          </tr>
        </thead>
        <tbody>
          {fleetData.map((vehicle) => (
            <tr key={vehicle.id} className="text-center">
              <td className="border p-2">{vehicle.name}</td>
              <td className={`border p-2 ${
                vehicle.status === "Active"
                  ? "text-green-500"
                  : vehicle.status === "Idle"
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}>
                {vehicle.status}
              </td>
              <td className="border p-2">{vehicle.driver}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FleetList;
