import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { LogisticsProvider } from "./context/LogisticsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LogisticsProvider>
      <App />
    </LogisticsProvider>
  </React.StrictMode>
);
