import { useState, useEffect } from "react";
import { Menu, X, Home, Truck, BarChart2, Settings, ShipIcon, ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Detect screen size change
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Hide sidebar on mobile
  if (isMobile) return null;

  return (
    <div className="flex mt-16">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-64" : "w-16"
        } bg-gray-900 h-auto text-white transition-all duration-300 ease-in-out fixed p-2`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1 className={`text-2xl font-bold ${!isOpen && "hidden"}`}>Logistics</h1>
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 focus:outline-none">
            {isOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-4">
          <ul className="space-y-4">
            <NavItem to="/" icon={<Home />} text="Dashboard" isOpen={isOpen} />
            <NavItem to="/orders" icon={<ShoppingCart />} text="Orders" isOpen={isOpen} />
            <NavItem to="/fleetlist" icon={<Truck />} text="Fleet Management" isOpen={isOpen} />
            <NavItem to="/shipments" icon={<ShipIcon />} text="Shipments" isOpen={isOpen} />
            <NavItem to="/reportchart" icon={<BarChart2 />} text="Reports & Analytics" isOpen={isOpen} />
            <li className="flex items-center hover:bg-gray-800 cursor-pointer">
              <Settings className="w-5 h-5 ml-5" />
              {isOpen && <span className="ml-2">Settings</span>}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

// Navigation Item Component
const NavItem = ({ to, icon, text, isOpen }) => (
  <li>
    <NavLink to={to} className="flex items-center hover:bg-gray-800 cursor-pointer">
      <span className="w-5 h-5 ml-5">{icon}</span>
      {isOpen && <span className="ml-2">{text}</span>}
    </NavLink>
  </li>
);
