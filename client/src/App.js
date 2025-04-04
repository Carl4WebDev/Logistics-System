import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import AuthPage from "./pages/Authpage"; // Replace LoginPage and RegisterPage with AuthPage
import ProtectedRoute from "../src/components/ProctectedRoute/ProtectedRoute";
import { AuthProvider } from "../src/contexts/AuthContext";
import { CustomersProvider } from "../src/contexts/CustomersProvider";
import { SummaryProvider } from "../src/contexts/SummaryProvider";
import { ShipmentsProvider } from "../src/contexts/ShipmentsProvider";
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
        {/* Auth Page (Combined Login + Register) */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Default Route (Redirect to Auth Page) */}
        <Route path="/" element={<Navigate to="/auth" replace />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              element={<DashboardPage />}
              allowedRoles={["admin", "coordinator", "driver"]}
            />
          }
        />
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
              allowedRoles={["admin", "coordinator"]}
            />
          }
        />
        <Route
          path="/summary"
          element={
            <ProtectedRoute
              element={<SummaryPage />}
              allowedRoles={["admin", "coordinator"]}
            />
          }
        />
        <Route
          path="/customers"
          element={
            <ProtectedRoute
              element={<CustomersPage />}
              allowedRoles={["admin"]}
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
            <ProtectedRoute
              element={<DriverPage />}
              allowedRoles={["admin", "driver"]}
            />
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
