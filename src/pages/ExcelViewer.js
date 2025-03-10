import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const ExcelViewer = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Get the file URL from query parameters
    const params = new URLSearchParams(window.location.search);
    const fileUrl = params.get("file");

    if (fileUrl) {
      fetch(fileUrl)
        .then((res) => res.blob()) // Convert to Blob
        .then((blob) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            try {
              const data = new Uint8Array(e.target.result);
              const workbook = XLSX.read(data, { type: "array" });
              const sheetName = workbook.SheetNames[0];
              const sheet = workbook.Sheets[sheetName];
              const jsonData = XLSX.utils.sheet_to_json(sheet);
              setTableData(jsonData);
            } catch (error) {
              console.error("Error parsing Excel file:", error);
            }
          };
          reader.readAsArrayBuffer(blob);
        })
        .catch((error) => console.error("Error fetching file:", error));
    }
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold">Excel File Content</h2>
      {tableData.length > 0 ? (
        <table className="border-collapse border border-gray-300 w-96">
          <thead>
            <tr className="bg-gray-200">
              {Object.keys(tableData[0]).map((col, index) => (
                <th key={index} className="border border-gray-300 px-4 py-2">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex} className="border border-gray-300">
                {Object.values(row).map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-2">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default ExcelViewer;
