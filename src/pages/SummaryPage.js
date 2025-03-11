import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReusableTable from "../components/ReusableTable/ReusableTable";
import ExcelFileUploader from "./ExcelFileUploader";
import * as XLSX from "xlsx";

// Function to create an Excel Blob from JSON data
const createExcelBlob = (data) => {
  // Convert JSON data into an Excel sheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Create a new Excel workbook
  const workbook = XLSX.utils.book_new();

  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Convert workbook to a binary array buffer
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx", // File format
    type: "array", // Output as an array buffer
  });

  // Create a Blob from the array buffer and set the correct MIME type for Excel files
  return new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
};

const SummaryPage = () => {
  // State to manage table data
  const [tableData, setTableData] = useState([
    {
      id: 1,
      name: "Summary Item 1",
      description: "Description of item 1",
      createdAt: "2025-03-07",
      createdBy: "Carl",
      updatedAt: "2025-03-07",
      updatedBy: "Admin",
      status: "Active",
      file: {
        name: "Sample-Data-1.xlsx",
        data: createExcelBlob([
          { Column1: "Value1", Column2: "Value2" },
          { Column1: "Value3", Column2: "Value4" },
        ]), // Create an actual Excel file inside Blob
      },
    },
    {
      id: 2,
      name: "Summary Item 2",
      description: "Description of item 2",
      createdAt: "2025-03-06",
      createdBy: "Ivan",
      updatedAt: "2025-03-07",
      updatedBy: "User",
      status: "Inactive",
      file: {
        name: "sample-data-1.xlsx",
        data: createExcelBlob([
          { Item: "Product A", Quantity: 10 },
          { Item: "Product B", Quantity: 5 },
        ]), // Create another Excel Blob
      },
    },
  ]);

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
  const [newSummary, setNewSummary] = useState({
    name: "",
    description: "",
    createdBy: "",
    status: "Active",
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file); // Read file as an ArrayBuffer
      reader.onload = (event) => {
        const fileBlob = new Blob([event.target.result], { type: file.type });

        setNewSummary((prev) => ({
          ...prev,
          file: {
            name: file.name,
            data: fileBlob,
          },
        }));
      };
    }
  };

  // Function to handle new data from the form inside ReusableTable
  const handleCreateNew = () => {
    if (!newSummary.name || !newSummary.createdBy) {
      alert("Please fill in all required fields.");
      return;
    }

    const newEntry = {
      id: tableData.length + 1,
      ...newSummary,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      updatedBy: newSummary.createdBy,
    };

    setTableData((prevData) => [...prevData, newEntry]);
    setIsModalOpen(false);
    setNewSummary({
      name: "",
      description: "",
      createdBy: "",
      status: "Active",
      file: null,
    });
  };

  // Handle Edit Function
  const handleEdit = (updatedItem) => {
    setTableData((prevData) =>
      prevData.map((item) =>
        item.id === updatedItem.id
          ? { ...item, ...updatedItem, file: updatedItem.file || item.file } // Preserve file if not changed
          : item
      )
    );
  };

  // Function to handle delete
  const handleDelete = (id) => {
    setTableData((prevData) => prevData.filter((item) => item.id !== id));
  };

  //function to downlaod excel of the row
  const handleDownload = (file) => {
    if (!file) {
      alert("No file available.");
      return;
    }

    const url = URL.createObjectURL(file.data);
    const link = document.createElement("a");
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-5">
      {/* Title and Create Button */}
      <div className="flex justify-around items-center mb-4">
        <h2 className="text-xl font-bold">Summary</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          + New Summary
        </button>
      </div>

      <ReusableTable
        data={tableData}
        onView={onView}
        handleDownload={handleDownload}
        onEdit={handleEdit}
        onDelete={handleDelete}
        setTableData={setTableData}
      />

      {/* Modal for Adding New Summary */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-3/5 max-h-[80vh] p-6 rounded-lg overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">New Summary</h2>
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
                  value={newSummary.name}
                  onChange={(e) =>
                    setNewSummary({ ...newSummary, name: e.target.value })
                  }
                  className="border p-2 w-full rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Created By</label>
                <input
                  type="text"
                  name="createdBy"
                  value={newSummary.createdBy}
                  onChange={(e) =>
                    setNewSummary({ ...newSummary, createdBy: e.target.value })
                  }
                  className="border p-2 w-full rounded"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  value={newSummary.description}
                  onChange={(e) =>
                    setNewSummary({
                      ...newSummary,
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
                  value={newSummary.status}
                  onChange={(e) =>
                    setNewSummary({ ...newSummary, status: e.target.value })
                  }
                  className="border p-2 w-full rounded"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Upload Excel File */}
            <div className="mt-4">
              <label className="block text-sm font-medium">
                Upload Excel File
              </label>
              <input
                type="file"
                accept=".xlsx, .xls"
                className="border p-2 w-full rounded"
                onChange={handleFileChange}
              />
            </div>

            {/* Buttons */}
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleCreateNew}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <ExcelFileUploader />
    </div>
  );
};

export default SummaryPage;
