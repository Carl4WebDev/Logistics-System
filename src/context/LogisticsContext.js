import React, { createContext, useState } from "react";

// Create Context
const LogisticsContext = createContext();

// Provider Component
export const LogisticsProvider = ({ children }) => {
  const [shipments, setShipments] = useState([]);

  // Add a new shipment
  const addShipment = (newShipment) => {
    setShipments([...shipments, newShipment]);
  };

  return (
    <LogisticsContext.Provider value={{ shipments, addShipment }}>
      {children}
    </LogisticsContext.Provider>
  );
};

export default LogisticsContext;
