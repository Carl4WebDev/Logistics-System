import React, { useState } from "react";
import ReportChart from "../components/ReportChart/ReportChart";
import { useSummaryContext } from "../contexts/SummaryProvider";

const DashboardPage = () => {
  const { tableData, setTableData } = useSummaryContext();
  return (
    <div className="row">
      <div className="col-12 flex bg-gray-100">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-lg font-semibold">Total Orders</h3>
              <p className="text-3xl font-bold">120</p>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-lg font-semibold">Active Deliveries</h3>
              <p className="text-3xl font-bold">45</p>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-lg font-semibold">Fleet Availability</h3>
              <p className="text-3xl font-bold">80%</p>
            </div>
          </div>
        </main>
      </div>
      <div className="col-2">
        <ReportChart />
      </div>
      <div className="col-2">
        {tableData.map((item) => (
          <h1>{item.name}</h1>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
