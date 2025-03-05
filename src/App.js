import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import DashboardPage from './pages/DashboardPage';
import Footer from './components/Foooter/Footer'
import OrdersPage from "./pages/OrdersPage";
import FleetPage from './pages/FleetPage';
import ReportPage from './pages/ReportPage';
import DocumentPage from './pages/DocumentPage';
import ShipmentsPage from './pages/ShipmentsPage';


const Layout = ({ children }) => (
  <div className="flex min-h-screen justify-center align-middle">
    <Sidebar />
    <div className="flex-1">
      <Header />
      <main className="h-screen mt-20 flex justify-center ">{children}</main>
      <Footer />
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
        <Route path="/reportchart" element={<ReportPage />} />
        <Route path="/documentuploader" element={<DocumentPage />} />
        <Route path="/shipments" element={<ShipmentsPage />} />
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