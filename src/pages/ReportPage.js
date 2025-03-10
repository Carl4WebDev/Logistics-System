import React from "react";
import ReusableTable from "../components/ReusableTable/ReusableTable";

const ReportPage = () => {
  // Sample data
  const tableData = [
    {
      id: 1,
      name: "report Item 1",
      description: "Description of item 1",
      createdAt: "2025-03-07",
      createdBy: "Carl",
      updatedAt: "2025-03-07",
      updatedBy: "Admin",
      status: "Active",
      fileUrl: "/path/to/file1.pdf",
    },
    {
      id: 2,
      name: "report Item 2",
      description: "Description of item 2",
      createdAt: "2025-03-06",
      createdBy: "Ivan",
      updatedAt: "2025-03-07",
      updatedBy: "User",
      status: "Inactive",
      fileUrl: "/path/to/file2.pdf",
    },
  ];

  // Handlers
  const handleView = (id) => console.log(`Viewing item with ID: ${id}`);
  const handleDownload = (fileUrl) =>
    console.log(`Downloading file from: ${fileUrl}`);
  const handleEdit = (id) => console.log(`Editing item with ID: ${id}`);
  const handleDelete = (id) => console.log(`Deleting item with ID: ${id}`);
  const handleCreateNew = () => console.log("Creating new report...");
  const handleEditPage = () => console.log("Editing shipment page...");

  return (
    <div className="p-5">
      <ReusableTable
        title="Report"
        buttonText="Create New Report"
        onCreate={handleCreateNew}
        onEditPage={handleEditPage}
        data={tableData}
        onView={handleView}
        onDownload={handleDownload}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ReportPage;
