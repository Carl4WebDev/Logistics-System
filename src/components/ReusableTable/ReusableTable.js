import React, { useState } from "react";
import * as XLSX from "xlsx";

const ReusableTable = ({
  data,
  onView,
  handleDownload,
  onEdit,
  onDelete,
  setTableData,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Filter data based on search term and date range
  const filteredData = data.filter((row) => {
    const matchesSearch = Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const createdAt = row.createdAt ? new Date(row.createdAt) : null;
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const matchesDateRange =
      (!start || (createdAt && createdAt >= start)) &&
      (!end || (createdAt && createdAt <= end));

    return matchesSearch && matchesDateRange;
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleSaveEdit = (updatedItem) => {
    setTableData((prevData) =>
      prevData.map((item) =>
        item.id === updatedItem.id ? { ...item, ...updatedItem } : item
      )
    );
  };

  const handleEditInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const [excelData, setExcelData] = useState([]); // Store the parsed Excel data

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        console.log("Uploaded Excel Data:", jsonData);
        setExcelData(jsonData); // Store parsed data for display later
      };
      reader.readAsArrayBuffer(file);

      // Update editData with the new file
      setEditData((prev) => ({ ...prev, file }));

      // Reset input field
      e.target.value = null;
    }
  };

  return (
    <div className="p-4">
      {/* Search & Date Filters */}
      <div className="flex items-center space-x-4 mb-2">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 w-1/3 rounded"
        />
        <label className="flex items-center">Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded"
        />
        <label className="flex items-center">End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-96 border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              {[
                "Name",
                "Description",
                "Created At",
                "Created By",
                "Updated At",
                "Updated By",
                "Status",
                "View",
                "Download",
                "Edit",
                "Delete",
              ].map((header) => (
                <th
                  key={header}
                  className="border border-gray-300 px-4 py-2 text-left"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
                <tr key={index} className="border border-gray-300">
                  <td className="p-2 text-wrap">{row.name}</td>
                  <td className=" text-wrap">{row.description}</td>
                  <td className=" text-wrap">{row.createdAt}</td>
                  <td className=" text-wrap">{row.createdBy}</td>
                  <td className=" text-wrap">{row.updatedAt}</td>
                  <td className=" text-wrap">{row.updatedBy}</td>
                  <td className="">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        row.status === "Active" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                      onClick={() => {
                        // Convert Blob to a downloadable URL
                        const blobUrl = URL.createObjectURL(row.file.data);

                        // Open the Excel Viewer page with the file URL as a query parameter
                        window.open(
                          `/view-excel?file=${encodeURIComponent(blobUrl)}`,
                          "_blank"
                        );
                      }}
                    >
                      View File
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-gray-500 text-white px-3 py-1 rounded text-sm"
                      onClick={() => handleDownload(row.file)} // Calls handleDownload from parent
                    >
                      Download {row.file.name}
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                      onClick={() => {
                        setEditData(row); // Store selected row's data in state
                        setIsEditModalOpen(true); // Open the modal
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                      onClick={() => onDelete(row.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="11"
                  className="px-4 py-3 text-center text-gray-500"
                >
                  No matching data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-3/5">
            <h2 className="text-xl font-bold mb-4">Edit Item</h2>

            {/* Name */}
            <input
              type="text"
              name="name"
              value={editData?.name || ""}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
              className="border p-2 w-full rounded mb-2"
              placeholder="Name"
            />

            {/* Description */}
            <input
              type="text"
              name="description"
              value={editData?.description || ""}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
              className="border p-2 w-full rounded mb-2"
              placeholder="Description"
            />

            {/* Status */}
            <select
              name="status"
              value={editData?.status || ""}
              onChange={(e) =>
                setEditData({ ...editData, status: e.target.value })
              }
              className="border p-2 w-full rounded mb-2"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            {/* File Upload */}
            <input
              type="file"
              name="file"
              onChange={(e) => {
                const uploadedFile = e.target.files[0];
                if (uploadedFile) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    const newFileBlob = new Blob([event.target.result], {
                      type: uploadedFile.type,
                    });
                    setEditData({
                      ...editData,
                      file: { name: uploadedFile.name, data: newFileBlob },
                    });
                  };
                  reader.readAsArrayBuffer(uploadedFile);
                }
              }}
              className="border p-2 w-full rounded mb-2"
            />
            {editData?.file && (
              <p className="text-sm text-gray-500">{editData.file.name}</p>
            )}

            {/* Buttons */}
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  handleSaveEdit(editData);
                  setIsEditModalOpen(false);
                }}
              >
                Save Changes
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReusableTable;
