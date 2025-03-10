import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import DashboardPage from "./pages/DashboardPage";
// import Footer from './components/Foooter/Footer'
import OrdersPage from "./pages/OrdersPage";
import FleetPage from "./pages/FleetPage";
import ReportPage from "./pages/ReportPage";
import DocumentPage from "./pages/DocumentPage";
import ShipmentsPage from "./pages/ShipmentsPage";
import SummaryPage from "./pages/SummaryPage";

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
      {/* <div className='row'>
        <Footer />
      </div> */}
    </div>
  </div>
);

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/fleetlist" element={<FleetPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/documentuploader" element={<DocumentPage />} />
        <Route path="/shipment" element={<ShipmentsPage />} />
        <Route path="/summary" element={<SummaryPage />} />
      </Routes>
    </Layout>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
