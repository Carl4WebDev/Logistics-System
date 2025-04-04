import React, { useState, useContext } from "react";
import { useShipmentsContext } from "../contexts/ShipmentsProvider";
import { useNavigate } from "react-router-dom";
import ReusableTable from "../components/ReusableTable/ReusableTable";

import * as XLSX from "xlsx";

const ShipmentsPage = () => {
  const { shipmentsData, setShipmentsData } = useShipmentsContext();

  const navigate = useNavigate();
  // function to view excel
  const onView = (file) => {
    if (!file) return;

    // Convert base64 or URL to a Blob before navigation
    fetch(file)
      .then((res) => res.blob())
      .then((blob) => {
        navigate("/view-excel", { state: { file: blob } });
      })
      .catch((err) => console.error("Error loading file:", err));
  };

  // State for modal visibility and form inputs
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newShipments, setNewShipments] = useState({
    name: "",
    description: "",
    createdBy: "",
    status: "incomplete",
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setErrors((prev) => ({ ...prev, file: "Please select a file." }));
      return;
    }

    const validFileTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    if (!validFileTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        file: "Invalid file type. Please upload an Excel file (.xlsx or .xls).",
      }));
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setErrors((prev) => ({
        ...prev,
        file: "File size exceeds 5MB. Please upload a smaller file.",
      }));
      return;
    }

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (event) => {
      const fileBlob = new Blob([event.target.result], { type: file.type });

      setNewShipments((prev) => ({
        ...prev,
        file: {
          name: file.name,
          data: fileBlob,
        },
      }));

      setErrors((prev) => ({ ...prev, file: "" })); // Clear error on valid file
    };
  };

  // Function to handle new data from the form inside ReusableTable
  const [errors, setErrors] = useState({
    name: "",
    createdBy: "",
    file: "",
  });

  const handleCreateNew = () => {
    const { name, createdBy, file } = newShipments;
    const newErrors = {
      name: !name ? "Name is required." : "",
      createdBy: !createdBy ? "Creator name is required." : "",
      file: !file ? "Please upload an Excel file." : "",
    };

    // Check for any errors
    if (newErrors.name || newErrors.createdBy || newErrors.file) {
      setErrors(newErrors);
      return;
    }

    const newEntry = {
      id: shipmentsData.length + 1,
      ...newShipments,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      updatedBy: createdBy,
    };

    setShipmentsData((prevData) => [...prevData, newEntry]);
    setIsModalOpen(false);

    // Reset form and clear errors
    setNewShipments({
      name: "",
      description: "",
      createdBy: "",
      status: "incomplete",
      file: null,
    });

    setErrors({ name: "", createdBy: "", file: "" }); // Clear errors
  };

  // Handle Edit Function
  const handleEdit = (updatedItem) => {
    setShipmentsData((prevData) =>
      prevData.map((item) =>
        item.id === updatedItem.id
          ? { ...item, ...updatedItem, file: updatedItem.file || item.file } // Preserve file if not changed
          : item
      )
    );
  };

  // Function to handle delete
  const handleDelete = (id) => {
    setShipmentsData((prevData) => prevData.filter((item) => item.id !== id));
  };

  //function to downlaod excel of the row
  const handleDownload = (file) => {
    const url = URL.createObjectURL(file.data);

    const link = document.createElement("a");
    link.href = url;
    link.download = file.name || "Updated_Excel_File.xlsx";
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url); // Clean up the blob URL
  };

  return (
    <div className="p-5">
      {/* Title and Create Button */}
      <div className="flex justify-between items-center mb-4 ">
        <h2 className="text-3xl text-white font-bold">Shipments</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setIsModalOpen(true)}
        >
          + New Shipments
        </button>
      </div>

      <ReusableTable
        data={shipmentsData}
        onView={onView}
        handleDownload={handleDownload}
        onEdit={handleEdit}
        onDelete={handleDelete}
        setTableData={setShipmentsData}
      />

      {/* Modal for Adding New Summary */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-3/5 max-h-[80vh] p-6 rounded-lg overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">New Shipments</h2>
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={() => setIsModalOpen(false)}
              >
                ✖
              </button>
            </div>

            {/* Form (Two Columns) */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newShipments.name}
                  onChange={(e) =>
                    setNewShipments({ ...newShipments, name: e.target.value })
                  }
                  className="border p-2 w-full rounded"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-2">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">Created By</label>
                <input
                  type="text"
                  name="createdBy"
                  value={newShipments.createdBy}
                  onChange={(e) =>
                    setNewShipments({
                      ...newShipments,
                      createdBy: e.target.value,
                    })
                  }
                  className="border p-2 w-full rounded"
                />
                {errors.createdBy && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.createdBy}
                  </p>
                )}
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  value={newShipments.description}
                  onChange={(e) =>
                    setNewShipments({
                      ...newShipments,
                      description: e.target.value,
                    })
                  }
                  className="border p-2 w-full rounded h-24"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Status</label>
                <select
                  name="status"
                  value={newShipments.status}
                  onChange={(e) =>
                    setNewShipments({ ...newShipments, status: e.target.value })
                  }
                  className="border p-2 w-full rounded"
                >
                  <option value="Completed">Completed</option>
                  <option value="incomplete">Incomplete</option>
                </select>
              </div>
            </div>

            {/* Upload Excel File */}
            <div className="mt-4">
              <label className="block text-sm font-medium">
                Upload Excel File
              </label>
              <input
                required
                type="file"
                accept=".xlsx, .xls"
                className="border p-2 w-full rounded"
                onChange={handleFileChange}
              />
              {errors.file && (
                <p className="text-red-500 text-sm mt-2">{errors.file}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-700"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleCreateNew}
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

export default ShipmentsPage;
