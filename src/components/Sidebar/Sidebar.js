import { useState } from "react";
import { Menu, X, Home, Truck, List, BarChart2, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex mt-16">
      {/* Sidebar */}
      <div
        className={`$ {
          isOpen ? "w-64" : "w-16"
        } bg-gray-900 h-auto text-white transition-all duration-300 ease-in-out fixed p-2`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1 className={`text-2xl font-bold ${!isOpen && "hidden"}`}>Logistics</h1>
          <button onClick={toggleSidebar} className="p-2 focus:outline-none">
            {isOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-4">
          <ul className="space-y-4">
            <li className="flex items-center  hover:bg-gray-800 cursor-pointer">
              <NavLink
                to="/"
                className={"flex items-center  hover:bg-gray-800 cursor-pointer"}
              >
                <Home className="w-5 h-5 ml-5" />
                {isOpen && <span className="ml-2">Dashboard</span>}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/orders"
                className={"flex items-center  hover:bg-gray-800 cursor-pointer"}
              >
                <List className="w-5 h-5 ml-5" />
                {isOpen && <span className="ml-2">Orders</span>}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/fleetlist"
                className={"flex items-center  hover:bg-gray-800 cursor-pointer"}
              >
                <Truck className="w-5 h-5 ml-5" />
                {isOpen && <span className="ml-2">Fleet Management</span>}
              </NavLink>
            </li>
            <li>

              <NavLink
                to="/reportchart"
                className={"flex items-center  hover:bg-gray-800 cursor-pointer"}
              >
              <BarChart2 className="w-5 h-5 ml-5" />
              {isOpen && <span className="ml-2">Reports & Analytics</span>}
              </NavLink>
            </li>
            <li className="flex items-center  hover:bg-gray-800 cursor-pointer">
              <Settings className="w-5 h-5 ml-5" />
              {isOpen && <span className="ml-2">Settings</span>}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
