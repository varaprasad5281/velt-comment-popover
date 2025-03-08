"use client";

import { Home, FileText, Settings, LogOut, Menu } from "lucide-react";
import { useEffect, memo } from "react";

const sidebarItems = [
  { id: "home", icon: <Home size={24} />, label: "Home" },
  { id: "sheets", icon: <FileText size={24} />, label: "Sheets" },
  { id: "settings", icon: <Settings size={24} />, label: "Settings" },
];

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 768); // Auto-collapse on mobile but keep icon size
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsCollapsed]);

  return (
    <aside
      className={`h-screen flex-shrink-0 ${
        isCollapsed ? "min-w-[64px]" : "w-64"
      } bg-gray-800 text-white flex flex-col transition-all duration-300`}
    >
      {/* Sidebar Header - Toggle Button */}
      <div className="p-4 text-xl font-bold text-center border-b border-gray-700 flex items-center justify-between">
        {!isCollapsed && <span>VeltComment</span>}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-white">
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1">
        <ul className="space-y-2 p-4">
          {sidebarItems.map(({ id, icon, label }) => (
            <SidebarItem key={id} icon={icon} label={label} isCollapsed={isCollapsed} />
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-700">
        <SidebarItem icon={<LogOut size={24} />} label="Logout" isCollapsed={isCollapsed} />
      </div>
    </aside>
  );
}

// Sidebar Item Component (Memoized)
const SidebarItem = memo(({ icon, label, isCollapsed }) => (
  <li className={`flex items-center p-3 cursor-pointer rounded-lg hover:bg-gray-700 transition-all ${isCollapsed ? "justify-center" : ""}`}>
    {icon}
    {!isCollapsed && <span className="ml-3">{label}</span>}
  </li>
));
