import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Home,
  Truck,
  BarChart2,
  TruckIcon,
  Package,
  ClipboardList,
  ChevronDown,
  ChevronRight,
  User2Icon,
  Warehouse,
  Users2Icon,
  Folder,
  IdCard,
} from "lucide-react";

import NavItem from "./NavItem";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [logisticsOpen, setLogisticsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [userOpen, setUserOpen] = useState(false);

  // Detect screen size change
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Hide sidebar on mobile
  if (isMobile) return null;

  return (
    <div className="flex mt-16  ">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-64" : "w-16"
        } bg-gray-900 h-auto text-white transition-all duration-300 ease-in-out fixed p-2`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700 ">
          <h1 className={`text-2xl font-bold ${!isOpen && "hidden"}`}>
            Logistics
          </h1>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 focus:outline-none"
          >
            {isOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-4">
          <ul className="space-y-2">
            <NavItem to="/" icon={<Home />} text="Dashboard" isOpen={isOpen} />

            {/* Logistic Management Dropdown */}
            <li>
              <div
                className={`flex items-center justify-between hover:bg-gray-800 p-2 rounded-md`}
                onClick={() => setLogisticsOpen(!logisticsOpen)}
              >
                <div className="flex items-center">
                  <Warehouse className="w-5 h-5 ml-3" />
                  {isOpen && <span className="ml-2">Logistic Management</span>}
                </div>
                {isOpen &&
                  (logisticsOpen ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  ))}
              </div>

              {logisticsOpen && (
                <ul className="ml-2 space-y-1">
                  <NavItem
                    to="/summary"
                    icon={<Folder className="w-4 h-4" />}
                    text="Summary"
                    isOpen={isOpen}
                  />
                  <NavItem
                    to="/shipment"
                    icon={<Package className="w-4 h-4" />}
                    text="Shipments"
                    isOpen={isOpen}
                  />
                  <NavItem
                    to="/Vehicle"
                    icon={<TruckIcon className="w-4 h-4" />}
                    text="Vehicle"
                    isOpen={isOpen}
                  />
                  <NavItem
                    to="/Report"
                    icon={<ClipboardList className="w-4 h-4" />}
                    text="Report"
                    isOpen={isOpen}
                  />
                </ul>
              )}
            </li>

            {/* User Management Dropdown */}
            <li>
              <div
                className={`flex items-center justify-between hover:bg-gray-800 p-2 rounded-md`}
                onClick={() => setUserOpen(!userOpen)}
              >
                <div className="flex items-center">
                  <User2Icon className="w-5 h-5 ml-3" />
                  {isOpen && <span className="ml-2">User Management</span>}
                </div>
                {isOpen &&
                  (userOpen ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  ))}
              </div>

              {userOpen && (
                <ul className="space-y-1 ml-2">
                  <NavItem
                    to="/fleetlist"
                    icon={<Users2Icon className="w-4 h-4" />}
                    text="Employee"
                    isOpen={isOpen}
                  />
                  <NavItem
                    to="/shipment"
                    icon={<IdCard className="w-4 h-4" />}
                    text="Driver"
                    isOpen={isOpen}
                  />
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
