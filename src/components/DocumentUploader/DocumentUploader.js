import React, { useState } from "react";

const DocumentUploader = () => {
  const [files, setFiles] = useState([]);

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setFiles([...files, ...uploadedFiles]);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Upload Documents</h2>
      
      <input
        type="file"
        multiple
        onChange={handleFileUpload}
        className="mb-4 p-2 border rounded"
      />

      {files.length > 0 && (
        <ul className="mt-4">
          {files.map((file, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2">
              <span>{file.name}</span>
              <button
                onClick={() => handleRemoveFile(index)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DocumentUploader;
