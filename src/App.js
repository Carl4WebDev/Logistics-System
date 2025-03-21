import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import ReportPage from "./pages/ReportPage";
import ShipmentsPage from "./pages/ShipmentsPage";
import SummaryPage from "./pages/SummaryPage";
import CustomersPage from "./pages/CustomersPage";
import VehiclePage from "./pages/VehiclePage";
import EmployeePage from "./pages/EmployeePage";
import DriverPage from "./pages/DriverPage";
import LoginPage from "./pages/LoginPage"; // New Login Page
import ProtectedRoute from "./components/ProctectedRoute/ProtectedRoute";
import { AuthProvider } from "../src/contexts/AuthContext";

import { CustomersProvider } from "./contexts/CustomersProvider";
import { SummaryProvider } from "./contexts/SummaryProvider";
import { ShipmentsProvider } from "./contexts/ShipmentsProvider";
import Accounts from "./pages/Accounts";
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
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Protected Routes */}
        <Route
          path="/report"
          element={
            <ProtectedRoute element={<ReportPage />} allowedRoles={["admin"]} />
          }
        />
        <Route
          path="/shipments"
          element={
            <ProtectedRoute
              element={<ShipmentsPage />}
              allowedRoles={["admin"]}
            />
          }
        />
        <Route
          path="/summary"
          element={
            <ProtectedRoute
              element={<SummaryPage />}
              allowedRoles={["admin"]}
            />
          }
        />
        <Route
          path="/customers"
          element={
            <ProtectedRoute
              element={<CustomersPage />}
              allowedRoles={["admin", "customer"]}
            />
          }
        />
        <Route
          path="/vehicle"
          element={
            <ProtectedRoute
              element={<VehiclePage />}
              allowedRoles={["admin"]}
            />
          }
        />
        <Route
          path="/employee"
          element={
            <ProtectedRoute
              element={<EmployeePage />}
              allowedRoles={["admin"]}
            />
          }
        />
        <Route
          path="/driver"
          element={
            <ProtectedRoute element={<DriverPage />} allowedRoles={["admin"]} />
          }
        />
        <Route
          path="/accounts"
          element={
            <ProtectedRoute element={<Accounts />} allowedRoles={["admin"]} />
          }
        />
      </Routes>
    </Layout>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <AuthProvider>
        <CustomersProvider>
          <ShipmentsProvider>
            <SummaryProvider>
              <App />
            </SummaryProvider>
          </ShipmentsProvider>
        </CustomersProvider>
      </AuthProvider>
    </Router>
  );
}
