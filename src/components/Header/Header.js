import { useState, useEffect } from "react";

import NavItem from "../Sidebar/NavItem";

import logiTrack from "../../assets/images/logiTrack-bg.jpg";

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
  UserCheck,
} from "lucide-react";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(true);
  const [logisticsOpen, setLogisticsOpen] = useState(false);

  // Detect screen size change
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="bg-gray-950  text-white p-6 flex justify-between items-center fixed w-full top-0 z-50">
      {/* Left Side: Logo */}
      <div className="font-bold flex ml-2 items-center justify-center">
        <img
          src={logiTrack}
          width={"50px"}
          height={"50px"}
          className="rounded-full"
        />
        <h1 className="ml-2 text-2xl">LogiTrack</h1>
      </div>

      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 focus:outline-none"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Sidebar (Only Visible in Mobile Mode) */}
      {isMobile && menuOpen && (
        <div className="absolute top-24  left-0 w-64 bg-gray-900 h-screen p-4 text-white">
          <nav className="mt-4">
            <h1 className="text-2xl">Categories</h1>
            <hr></hr>
            <ul className="space-y-2">
              <NavItem to="/" icon={<Home />} text="Dashboard" isOpen={true} />

              {/* Logistic Management Dropdown */}
              <li>
                <div
                  className={`flex items-center justify-between hover:bg-gray-800 p-2 rounded-md`}
                  onClick={() => setLogisticsOpen(!logisticsOpen)}
                >
                  <div className="flex items-center">
                    <Warehouse className="w-5 h-5 ml-3" />
                    {isOpen && (
                      <span className="ml-2">Logistic Management</span>
                    )}
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
                      to="/shipments"
                      icon={<Package className="w-4 h-4" />}
                      text="Shipments"
                      isOpen={isOpen}
                    />
                    <NavItem
                      to="/customers"
                      icon={<UserCheck className="w-4 h-4" />}
                      text="Customers"
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
      )}
    </nav>
  );
}
