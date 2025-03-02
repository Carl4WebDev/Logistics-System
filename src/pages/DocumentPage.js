import React from "react";
import DocumentUploader from "../components/DocumentUploader/DocumentUploader";

const DocumentsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Document Management</h1>
      <DocumentUploader />
    </div>
  );
};

export default DocumentsPage;
