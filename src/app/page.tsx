'use client'
import SpreadsheetGrid from "@/components/spreadsheet-grid";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Header";
import { useState } from "react";

export default function Home() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <main className="flex h-screen bg-gray-900">
      {/* Sidebar (Width Adjusts Dynamically) */}
      <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />

      {/* Main Content (Flex-Grow to Avoid Overlap) */}
      <div className={`flex flex-col flex-1 p-4 overflow-hidden transition-all duration-300`}>
        {/* Navbar */}
        <Navbar />

        {/* Title */}
        <h1 className="text-2xl font-bold text-white mt-4 text-center">
          Interactive Spreadsheet with Comments
        </h1>

        {/* Spreadsheet Component */}
        <div className="flex-1 flex items-center justify-center overflow-auto">
          <SpreadsheetGrid />
        </div>
      </div>
    </main>
  );
}
