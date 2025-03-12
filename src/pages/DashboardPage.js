import React, { useState } from "react";
import ReportChart from "../components/ReportChart/ReportChart";
import { useSummaryContext } from "../contexts/SummaryProvider";

const DashboardPage = () => {
  const { tableData, setTableData } = useSummaryContext();
  return (
    <div className="flex flex-col min-w-full align-middle text-white">
      <div className="w-full">
        <main className="flex-1 overflow-x-hidden overflow-y-auto ">
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-white">
            <div className=" rounded-2xl shadow-white p-6 ">
              <h3 className="text-lg font-semibold">Total Orders</h3>
              <p className="text-3xl font-bold">120</p>
            </div>

            <div className=" rounded-2xl shadow p-6">
              <h3 className="text-lg font-semibold">Active Deliveries</h3>
              <p className="text-3xl font-bold">45</p>
            </div>

            <div className=" rounded-2xl shadow p-6">
              <h3 className="text-lg font-semibold">Fleet Availability</h3>
              <p className="text-3xl font-bold">80%</p>
            </div>
          </div>
        </main>
      </div>

      <ReportChart />
    </div>
  );
};

export default DashboardPage;
