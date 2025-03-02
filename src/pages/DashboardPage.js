import React from "react";

const DashboardPage = () => {
  return (
    <div className="flex bg-gray-100" >
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
  );
};

export default DashboardPage;