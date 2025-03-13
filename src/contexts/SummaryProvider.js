import React, { createContext, useContext, useState } from "react";
import * as XLSX from "xlsx";

// Create the context
const SummaryContext = createContext();

// Function to create an Excel Blob
const createExcelBlob = (data) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  return new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
};

// Provider component
export const SummaryProvider = ({ children, initialData = [] }) => {
  // State to manage table data
  const [tableData, setTableData] = useState([
    {
      id: 1,
      name: "Summary Item 1",
      description: "Description of item 1",
      createdAt: "2025-03-07",
      createdBy: "Jone",
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
      createdBy: "Doe",
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
    {
      id: 3,
      name: "Summary Item 3",
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
    {
      id: 4,
      name: "Summary Item 4",
      description: "Description of item 2",
      createdAt: "2025-03-06",
      createdBy: "Earl",
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
    {
      id: 5,
      name: "Summary Item 5",
      description: "Description of item 2",
      createdAt: "2025-03-06",
      createdBy: "James",
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
    {
      id: 6,
      name: "Summary Item 6",
      description: "Description of item 2",
      createdAt: "2025-03-06",
      createdBy: "George",
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

  return (
    <SummaryContext.Provider value={{ tableData, setTableData }}>
      {children}
    </SummaryContext.Provider>
  );
};

// Custom hook for consuming context
export const useSummaryContext = () => useContext(SummaryContext);
