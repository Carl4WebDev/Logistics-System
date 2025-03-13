import React, { useState, useContext } from "react";
import { useCustomersContext } from "../contexts/CustomersProvider";
import { useNavigate } from "react-router-dom";
import ReusableTable from "../components/ReusableTable/ReusableTable";

const CustomersPage = () => {
  const { customersData, setCustomersData } = useCustomersContext();

  const navigate = useNavigate();

  const onView = (file) => {
    if (!file) return;

    fetch(file)
      .then((res) => res.blob())
      .then((blob) => {
        navigate("/view-excel", { state: { file: blob } });
      })
      .catch((err) => console.error("Error loading file:", err));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    status: "Active",
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = (event) => {
        const fileBlob = new Blob([event.target.result], { type: file.type });
        setNewCustomer((prev) => ({
          ...prev,
          file: {
            name: file.name,
            data: fileBlob,
          },
        }));
      };
    }
  };

  const handleCreateNew = () => {
    if (!newCustomer.name || !newCustomer.createdBy) {
      alert("Please fill in all required fields.");
      return;
    }

    const newEntry = {
      id: customersData.length + 1,
      name: newCustomer.name,
      description: newCustomer.description,
      createdBy: newCustomer.createdBy,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      updatedBy: newCustomer.createdBy,
      status: newCustomer.status,
      file: newCustomer.file || null,
    };

    setCustomersData((prevData) => [...prevData, newEntry]);
    setIsModalOpen(false);

    setNewCustomer({
      name: "",
      description: "",
      createdBy: "",
      status: "Active",
      file: null,
    });
  };

  const handleEdit = (updatedItem) => {
    setCustomersData((prevData) =>
      prevData.map((item) =>
        item.id === updatedItem.id
          ? { ...item, ...updatedItem, file: updatedItem.file || item.file }
          : item
      )
    );
  };

  const handleDelete = (id) => {
    setCustomersData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleDownload = (file) => {
    const url = URL.createObjectURL(file.data);

    const link = document.createElement("a");
    link.href = url;
    link.download = file.name || "Updated_Customer_File.xlsx";
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl text-white font-bold">Customers</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          + New Customer
        </button>
      </div>

      <ReusableTable
        data={customersData}
        onView={onView}
        handleDownload={handleDownload}
        onEdit={handleEdit}
        onDelete={handleDelete}
        setTableData={setCustomersData} // Corrected this line
      />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-3/5 max-h-[80vh] p-6 rounded-lg overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">New Customer</h2>
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={() => setIsModalOpen(false)}
              >
                ✖
              </button>
            </div>

            {/* Form Fields - Matching Table Data */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newCustomer.name}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, name: e.target.value })
                  }
                  className="border p-2 w-full rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Description</label>
                <input
                  type="text"
                  name="description"
                  value={newCustomer.description}
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
                      description: e.target.value,
                    })
                  }
                  className="border p-2 w-full rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Created By</label>
                <input
                  type="text"
                  name="createdBy"
                  value={newCustomer.createdBy}
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
                      createdBy: e.target.value,
                    })
                  }
                  className="border p-2 w-full rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Status</label>
                <select
                  name="status"
                  value={newCustomer.status}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, status: e.target.value })
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

export default CustomersPage;
