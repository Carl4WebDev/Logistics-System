import React, { createContext, useContext, useState } from "react";
import * as XLSX from "xlsx";

// Create the context
const ShipmentsContext = createContext();

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
export const ShipmentsProvider = ({ children, initialData = [] }) => {
  // State to manage table data
  const [shipmentsData, setShipmentsData] = useState([
    {
      id: 1,
      name: "Shipments Item 1",
      description: "Description of item 1",
      createdAt: "2025-03-07",
      createdBy: "Jane",
      updatedAt: "2025-03-07",
      updatedBy: "Admin",
      status: "Active",
      file: {
        name: "shipments-sample-1.xlsx",
        data: createExcelBlob([
          { Column1: "Value1", Column2: "Value2" },
          { Column1: "Value3", Column2: "Value4" },
        ]), // Create an actual Excel file inside Blob
      },
    },
    {
      id: 2,
      name: "Shipments Item 2",
      description: "Description of item 2",
      createdAt: "2025-03-06",
      createdBy: "Doe",
      updatedAt: "2025-03-07",
      updatedBy: "User",
      status: "Inactive",
      file: {
        name: "shipments-sample-2.xlsx",
        data: createExcelBlob([
          { Item: "Product A", Quantity: 10 },
          { Item: "Product B", Quantity: 5 },
        ]), // Create another Excel Blob
      },
    },
  ]);

  return (
    <ShipmentsContext.Provider value={{ shipmentsData, setShipmentsData }}>
      {children}
    </ShipmentsContext.Provider>
  );
};

// Custom hook for consuming context
export const useShipmentsContext = () => useContext(ShipmentsContext);
