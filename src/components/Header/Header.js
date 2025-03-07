import { useState, useEffect } from "react";


import NavItem from "../Sidebar/NavItem";

import { Menu, X, Home, Truck, BarChart2, ChevronDown, ChevronRight, User2 } from "lucide-react";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logisticsOpen, setLogisticsOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  // Detect screen size change
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="bg-gray-900 text-white p-6 flex justify-between items-center fixed w-full top-0 z-50">
      {/* Left Side: Logo */}
      <div className="text-2xl font-bold">LogiTrack</div>

      {/* Mobile Menu Button */}
      {isMobile && (
        <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 focus:outline-none">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Sidebar (Only Visible in Mobile Mode) */}
      {isMobile && menuOpen && (
        <div className="absolute top-16 left-0 w-64 bg-gray-900 h-screen p-4 text-white">
          <nav className="mt-4">
            <ul className="space-y-2">
              <NavItem to="/" icon={<Home />} text="Dashboard" isOpen={true} />

              {/* Logistic Management Dropdown */}
              <li>
                <div
                  className="flex items-center justify-between hover:bg-gray-800 cursor-pointer p-2 rounded-md"
                  onClick={() => setLogisticsOpen(!logisticsOpen)}
                >
                  <div className="flex items-center">
                    <Truck className="w-5 h-5 ml-3" />
                    <span className="ml-2">Logistic Management</span>
                  </div>
                  {logisticsOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </div>

                {logisticsOpen && (
                  <ul className="ml-8 space-y-1">
                    <li><NavItem to="/fleetlist" text="Fleet Management" isOpen={true} /></li>
                    <li><NavItem to="/shipments" text="Shipments" isOpen={true}/></li>
                  </ul>
                )}
              </li>

              {/* User Management Dropdown */}
              <li>
                <div
                  className="flex items-center justify-between hover:bg-gray-800 cursor-pointer p-2 rounded-md"
                  onClick={() => setUserOpen(!userOpen)}
                >
                  <div className="flex items-center">
                    <User2 className="w-5 h-5 ml-3" />
                    <span className="ml-2">User Management</span>
                  </div>
                  {userOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </div>

                {userOpen && (
                  <ul className="ml-8 space-y-1">
                    <li><NavItem to="/employee" text="Employee"isOpen={true} /></li>
                    <li><NavItem to="/driver" text="Driver" isOpen={true} /></li>
                  </ul>
                )}
              </li>

              <NavItem to="/reportchart" icon={<BarChart2 />} text="Reports & Analytics" isOpen={true} />
            </ul>
          </nav>
        </div>
      )}
    </nav>
  );
}
