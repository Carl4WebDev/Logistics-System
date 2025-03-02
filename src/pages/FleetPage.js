import React from "react";
import FleetList from "../components/FleetList/FleetList";

const FleetPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Fleet Management</h1>
      <FleetList />
    </div>
  );
};

export default FleetPage;
