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
  const [modalSearchTerm, setModalSearchTerm] = useState(""); // For the modal

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // ExcelViewer
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);
  const [excelTableData, setExcelTableData] = useState([]);
  const [excelFileName, setExcelFileName] = useState("");
  const [selectedExcelId, setSelectedExcelId] = useState(null);

  const handleViewFile = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        setExcelTableData(jsonData);
        setExcelFileName(file.name || "Updated_Excel_File.xlsx");
        setIsExcelModalOpen(true);
      } catch (error) {
        console.error("Error parsing Excel file:", error);
      }
    };
    reader.readAsArrayBuffer(file.data);
  };
  const handleSaveExcelData = () => {
    const worksheet = XLSX.utils.json_to_sheet(excelTableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const updatedFile = {
      name: excelFileName || "Updated_Excel_File.xlsx", // Updated name
      data: new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
    };

    setTableData((prevData) =>
      prevData.map((item) =>
        item.id === selectedExcelId ? { ...item, file: updatedFile } : item
      )
    );

    setIsExcelModalOpen(false); // Close modal after saving
    setSelectedExcelId(null); // Reset selected ID
  };

  const handleExcelCellChange = (rowIndex, key, value) => {
    const updatedData = [...excelTableData];
    updatedData[rowIndex][key] = value;
    setExcelTableData(updatedData);
  };

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
      <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-4 mb-2">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <label className="flex items-center justify-center text-white w-full md:w-auto">
          Start Date:
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded w-full md:w-auto"
        />

        <label className="flex items-center justify-center text-white w-full md:w-auto">
          End Date:
        </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded w-full md:w-auto"
        />
      </div>

      {/* Table for Larger Screens */}
      <div className="overflow-x-auto hidden md:block">
        <table className="table-auto w-full border-collapse border border-gray-300 text-white">
          {/* Table Head */}
          <thead>
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

          {/* Table Body */}
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
                  <td className="">
                    <td className="">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                        onClick={() => {
                          const reader = new FileReader();

                          reader.onload = (event) => {
                            try {
                              const workbook = XLSX.read(event.target.result, {
                                type: "array",
                              });
                              const sheetName = workbook.SheetNames[0];
                              const sheet = workbook.Sheets[sheetName];
                              const jsonData = XLSX.utils.sheet_to_json(sheet);

                              setSelectedExcelId(row.id); // Track selected file's ID
                              setExcelTableData(jsonData); // Set data for editing
                              setExcelFileName(row.file.name); // Set file name for editing
                              setIsExcelModalOpen(true);
                            } catch (error) {
                              console.error("Error parsing Excel file:", error);
                            }
                          };

                          reader.readAsArrayBuffer(row.file.data); // Properly read the data as an ArrayBuffer
                        }}
                      >
                        View File
                      </button>
                    </td>
                  </td>
                  <td className="">
                    <button
                      className="bg-gray-500 text-white px-3 py-1 rounded text-sm"
                      onClick={() => handleDownload(row.file)}
                    >
                      {row.file.name}
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                      onClick={() => {
                        setEditData(row);
                        setIsEditModalOpen(true);
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

      {/* Excel Viewer Modal */}
      {isExcelModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] h-[90%] max-w-screen-lg max-h-[90vh] overflow-y-auto">
            {/* Editable File Name */}
            <div className="mb-4">
              <label className="block mb-2 font-bold text-lg">File Name:</label>
              <input
                type="text"
                value={excelFileName}
                onChange={(e) => setExcelFileName(e.target.value)}
                className="border px-2 py-1 rounded w-full"
              />
            </div>

            {/* Search Bar for Excel Data */}
            {excelTableData.length > 0 && (
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search..."
                  value={modalSearchTerm}
                  onChange={(e) => setModalSearchTerm(e.target.value)}
                  className="border px-2 py-1 rounded w-full"
                />
              </div>
            )}

            {/* Editable Excel Data Table */}
            {excelTableData.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300 text-black">
                  <thead>
                    <tr>
                      {Object.keys(excelTableData[0]).map((header, index) => (
                        <th
                          key={index}
                          className="border border-gray-300 px-4 py-2 text-left min-w-[200px] whitespace-nowrap"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {excelTableData
                      .filter((row) =>
                        Object.values(row)
                          .join(" ")
                          .toLowerCase()
                          .includes(modalSearchTerm.toLowerCase())
                      )
                      .map((row, rowIndex) => (
                        <tr key={rowIndex} className="border border-gray-300">
                          {Object.entries(row).map(([key, cell], cellIndex) => (
                            <td
                              key={cellIndex}
                              className="px-4 py-2 min-w-[200px] whitespace-nowrap"
                            >
                              <input
                                type="text"
                                value={cell}
                                onChange={(e) =>
                                  handleExcelCellChange(
                                    rowIndex,
                                    key,
                                    e.target.value
                                  )
                                }
                                className="border p-1 w-full"
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No data available.</p>
            )}

            {/* Buttons */}
            <div className="flex justify-end mt-4 gap-2">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleSaveExcelData}
              >
                Save Changes
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => setIsExcelModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Column Layout for Mobile Screens */}
      <div className="block md:hidden space-y-4">
        {filteredData.length > 0 ? (
          filteredData.map((row, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg shadow-md bg-gray-800 text-white"
            >
              <p>
                <strong>Name:</strong> {row.name}
              </p>
              <p>
                <strong>Description:</strong> {row.description}
              </p>
              <p>
                <strong>Created At:</strong> {row.createdAt}
              </p>
              <p>
                <strong>Created By:</strong> {row.createdBy}
              </p>
              <p>
                <strong>Updated At:</strong> {row.updatedAt}
              </p>
              <p>
                <strong>Updated By:</strong> {row.updatedBy}
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
              <div className="flex flex-col md:flex-row gap-2 mt-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  onClick={() => {
                    const reader = new FileReader();

                    reader.onload = (event) => {
                      try {
                        const workbook = XLSX.read(event.target.result, {
                          type: "array",
                        });
                        const sheetName = workbook.SheetNames[0];
                        const sheet = workbook.Sheets[sheetName];
                        const jsonData = XLSX.utils.sheet_to_json(sheet);

                        setSelectedExcelId(row.id); // Track selected file's ID
                        setExcelTableData(jsonData); // Set data for editing
                        setExcelFileName(row.file.name); // Set file name for editing
                        setIsExcelModalOpen(true);
                      } catch (error) {
                        console.error("Error parsing Excel file:", error);
                      }
                    };

                    reader.readAsArrayBuffer(row.file.data); // Properly read the data as an ArrayBuffer
                  }}
                >
                  View File
                </button>
                <button
                  className="bg-gray-500 text-white px-3 py-1 rounded text-sm"
                  onClick={() => handleDownload(row.file)}
                >
                  {row.file.name}
                </button>
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                  onClick={() => {
                    setEditData(row);
                    setIsEditModalOpen(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  onClick={() => onDelete(row.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No matching data found</p>
        )}
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
