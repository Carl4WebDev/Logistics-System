import { useState, useEffect } from "react";
import { Menu, X, Home, Truck, BarChart2, Settings, ShipIcon, ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);

  // Detect screen size change
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center fixed w-full top-0 z-50">
      {/* Left Side: Logo */}
      <div className="text-2xl font-bold">LogiTrack</div>

      {/* Right Side: Mobile Menu Button (Only on Small Screens) */}
      {isMobile && (
        <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 focus:outline-none">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}


      {/* Sidebar (Only Visible in Mobile Mode) */}
      {isMobile && menuOpen && (
        <div className="absolute top-16 left-0 w-64 bg-gray-900 h-screen p-4 text-white">
          <nav className="mt-4">
            <ul className="space-y-4">
              <li>
                <NavLink to="/" className="flex items-center hover:bg-gray-800 p-2 rounded-md">
                  <Home className="w-5 h-5 mr-2" /> Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/orders" className="flex items-center hover:bg-gray-800 p-2 rounded-md">
                  <ShoppingCart className="w-5 h-5 mr-2" /> Orders
                </NavLink>
              </li>
              <li>
                <NavLink to="/fleetlist" className="flex items-center hover:bg-gray-800 p-2 rounded-md">
                  <Truck className="w-5 h-5 mr-2" /> Fleet Management
                </NavLink>
              </li>
              <li>
                <NavLink to="/shipments" className="flex items-center hover:bg-gray-800 p-2 rounded-md">
                  <ShipIcon className="w-5 h-5 mr-2" /> Shipments
                </NavLink>
              </li>
              <li>
                <NavLink to="/reportchart" className="flex items-center hover:bg-gray-800 p-2 rounded-md">
                  <BarChart2 className="w-5 h-5 mr-2" /> Reports & Analytics
                </NavLink>
              </li>
              <li>
                <NavLink to="/settings" className="flex items-center hover:bg-gray-800 p-2 rounded-md">
                  <Settings className="w-5 h-5 mr-2" /> Settings
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </nav>
  );
}
