import React from "react";
import { useShipmentsContext } from "../contexts/ShipmentsProvider";
import { useSummaryContext } from "../contexts/SummaryProvider";
import { useCustomersContext } from "../contexts/CustomersProvider";
import ReusableTable from "../components/ReusableTable/ReusableTable";

const ReportPage = () => {
  const { shipmentsData } = useShipmentsContext();
  const { tableData: summaryData } = useSummaryContext();
  const { customersData } = useCustomersContext();

  // Combine all data into one array for the table
  const combinedData = [
    ...shipmentsData.map((item) => ({ ...item, type: "Shipment" })),
    ...summaryData.map((item) => ({ ...item, type: "Summary" })),
    ...customersData.map((item) => ({ ...item, type: "Customer" })),
  ];

  return (
    <div className="p-5">
      <h2 className="text-3xl text-white font-bold mb-4">Reports</h2>

      <ReusableTable
        data={combinedData}
        onView={() => {}}
        handleDownload={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
        setTableData={() => {}} // Optional if no editing is required here
      />
    </div>
  );
};

export default ReportPage;
