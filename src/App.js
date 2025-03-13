import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import DashboardPage from "./pages/DashboardPage";
// import Footer from './components/Foooter/Footer'
import ReportPage from "./pages/ReportPage";
import ShipmentsPage from "./pages/ShipmentsPage";
import SummaryPage from "./pages/SummaryPage";
import { SummaryProvider } from "./contexts/SummaryProvider"; // Correct import
import { ShipmentsProvider } from "./contexts/ShipmentsProvider"; // Correct import
import { CustomersProvider } from "./contexts/CustomersProvider"; // Correct import
import CustomersPage from "./pages/CustomersPage";
import VehiclePage from "./pages/VehiclePage";
import EmployeePage from "./pages/EmployeePage";
import DriverPage from "./pages/DriverPage";

const Layout = ({ children }) => (
  <div className="w-full h-screen">
    <Header />
    <div className="grid grid-cols-12">
      <div className="hidden md:block md:col-span-2">
        <Sidebar />
      </div>
      <div className="col-span-12 md:col-span-10">
        <main className="h-full mt-24 flex justify-start m-2">{children}</main>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/shipments" element={<ShipmentsPage />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/vehicle" element={<VehiclePage />} />
        <Route path="/employee" element={<EmployeePage />} />
        <Route path="/driver" element={<DriverPage />} />
      </Routes>
    </Layout>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <CustomersProvider>
        <ShipmentsProvider>
          <SummaryProvider>
            <App />
          </SummaryProvider>
        </ShipmentsProvider>
      </CustomersProvider>
    </Router>
  );
}
