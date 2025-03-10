import { useState } from "react";

export default function ExcelFileUploader() {
  const [files, setFiles] = useState([]);

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFiles([
        ...files,
        { id: Date.now(), file, url: URL.createObjectURL(file) },
      ]);
    }
  };

  // Handle file edit (replace existing file)
  const handleFileEdit = (id, event) => {
    const file = event.target.files[0];
    if (file) {
      setFiles(
        files.map((f) =>
          f.id === id ? { ...f, file, url: URL.createObjectURL(file) } : f
        )
      );
    }
  };

  return (
    <div className="p-4">
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <ul className="mt-4">
        {files.map((f) => (
          <li
            key={f.id}
            className="flex items-center gap-4 mt-2 border p-2 rounded"
          >
            <span>{f.file.name}</span>
            <a
              href={f.url}
              download={f.file.name}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Download
            </a>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={(e) => handleFileEdit(f.id, e)}
              className="hidden"
              id={`edit-${f.id}`}
            />
            <label
              htmlFor={`edit-${f.id}`}
              className="bg-green-500 text-white px-2 py-1 rounded cursor-pointer"
            >
              Edit
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
