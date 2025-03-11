import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

const ExcelViewer = () => {
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fileUrl = params.get("file");

    if (fileUrl) {
      fetch(fileUrl)
        .then((res) => res.blob())
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

  // Handle cell edits
  const handleCellChange = (rowIndex, key, value) => {
    const updatedData = [...tableData];
    updatedData[rowIndex][key] = value;
    setTableData(updatedData);
  };

  // Download edited Excel file
  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const blobUrl = URL.createObjectURL(blob);

    // Trigger download
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "Updated_Excel_File.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Excel File Content</h2>

      {tableData.length > 0 ? (
        <table className="border-collapse border border-gray-300 w-full">
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
                {Object.entries(row).map(([key, value], cellIndex) => (
                  <td key={cellIndex} className="px-4 py-2">
                    <input
                      type="text"
                      value={value}
                      onChange={(e) =>
                        handleCellChange(rowIndex, key, e.target.value)
                      }
                      className="border p-1 w-full"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available.</p>
      )}

      {/* Buttons */}
      <div className="flex space-x-4 mt-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleDownload}
        >
          Download Updated File
        </button>
      </div>
    </div>
  );
};

export default ExcelViewer;
