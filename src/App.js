import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import DashboardPage from "./pages/DashboardPage";
// import Footer from './components/Foooter/Footer'
import ReportPage from "./pages/ReportPage";
import ShipmentsPage from "./pages/ShipmentsPage";
import SummaryPage from "./pages/SummaryPage";
import ExcelViewer from "./pages/ExcelViewer";
import { SummaryProvider } from "./contexts/SummaryProvider"; // Correct import

const Layout = ({ children }) => (
  <div className="flex min-h-screen justify-center align-middle">
    <Sidebar />
    <div className="row flex-1">
      <div className="row">
        <Header />
      </div>
      <div className="row">
        <main className="h-auto mt-20 flex justify-center">{children}</main>
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
        <Route path="/shipment" element={<ShipmentsPage />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/view-excel" element={<ExcelViewer />} />
      </Routes>
    </Layout>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <SummaryProvider>
        <App />
      </SummaryProvider>
    </Router>
  );
}
