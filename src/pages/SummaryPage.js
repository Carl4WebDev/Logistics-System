import React, { useState, useContext } from "react";
import { useSummaryContext } from "../contexts/SummaryProvider";
import { useNavigate } from "react-router-dom";
import ReusableTable from "../components/ReusableTable/ReusableTable";

const SummaryPage = () => {
  const { tableData, setTableData } = useSummaryContext();

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
        <h2 className="text-3xl text-white font-bold">Summary</h2>
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
    </div>
  );
};

export default SummaryPage;
