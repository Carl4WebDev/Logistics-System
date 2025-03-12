import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import { useSummaryContext } from "../contexts/SummaryProvider";

const ExcelViewer = () => {
  const [tableData, setTableData] = useState([]);
  const [fileName, setFileName] = useState("");
  const { tableData: summaryData, setTableData: setSummaryData } =
    useSummaryContext();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fileUrl = params.get("file");
    const fileNameFromParams = params.get("fileName");

    if (fileNameFromParams) {
      setFileName(fileNameFromParams);
    } else {
      const foundFile = summaryData.find((item) => item.id === 1)?.file;
      setFileName(foundFile ? foundFile.name : "Updated_Excel_File.xlsx");
    }

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
              const jsonData = XLSX.utils.sheet_to_json(sheet, {
                raw: false, // This tells XLSX to format dates properly
                dateNF: "yyyy-mm-dd", // Ensures date format is consistent
              });
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

  const handleCellChange = (rowIndex, key, value) => {
    const updatedData = [...tableData];
    updatedData[rowIndex][key] = value;
    setTableData(updatedData);
  };

  const createUpdatedExcelBlob = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    return new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
  };

  const handleSave = () => {
    const updatedFile = { name: fileName, data: createUpdatedExcelBlob() };
    const updatedSummaryData = summaryData.map((item) =>
      item.id === 1 ? { ...item, file: updatedFile } : item
    );

    setSummaryData(updatedSummaryData);
    navigate("/summary");
  };

  const handleDownload = () => {
    const blob = createUpdatedExcelBlob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName || "Updated_Excel_File.xlsx";
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-bold mb-4">Excel File Content</h2>

      {/* Editable File Name */}
      <div className="mb-4">
        <label className="block mb-2">File Name:</label>
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="border px-2 py-1 rounded w-full text-black"
        />
      </div>

      {/* Table with Scrollable Wrapper */}
      {tableData.length > 0 ? (
        <div className="overflow-x-auto hidden md:block">
          <table className="border-collapse border border-gray-300 w-full table-auto">
            <thead>
              <tr>
                {Object.keys(tableData[0]).map((col, index) => (
                  <th
                    key={index}
                    className="border border-gray-300 px-4 py-2 whitespace-normal"
                  >
                    {col.replace(/_/g, " ").trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex} className="border border-gray-300">
                  {Object.entries(row).map(([key, value], cellIndex) => (
                    <td key={cellIndex} className="px-4 py-2 whitespace-normal">
                      <input
                        type="text"
                        value={value}
                        onChange={(e) =>
                          handleCellChange(rowIndex, key, e.target.value)
                        }
                        className="border p-1 w-full text-black"
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

      {/* Column Layout for Mobile Screens */}
      <div className="block md:hidden space-y-4 mt-4">
        {tableData.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="border p-4 rounded-lg shadow-md bg-gray-800 text-white"
          >
            {Object.entries(row).map(([key, value]) => (
              <div key={key} className="mb-2">
                <strong>{key.replace(/_/g, " ").trim()}:</strong>
                <input
                  type="text"
                  value={value}
                  onChange={(e) =>
                    handleCellChange(rowIndex, key, e.target.value)
                  }
                  className="border p-1 w-full text-black"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row gap-2 mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto"
          onClick={handleSave}
        >
          Save & Return
        </button>

        <button
          className="bg-green-500 text-white px-4 py-2 rounded w-full md:w-auto"
          onClick={handleDownload}
        >
          Download File
        </button>
      </div>
    </div>
  );
};

export default ExcelViewer;
