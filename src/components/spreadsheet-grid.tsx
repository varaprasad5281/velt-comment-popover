"use client";

import { useState } from "react";
import {
  VeltComments,
  VeltCommentTool,
  VeltCommentBubble,
  VeltSidebarButton,
  VeltCommentsSidebar,
} from "@veltdev/react";

import { players } from "./constants";

export default function SpreadsheetGrid() {
  const columns = ["Player Name", "Age", "Place", "IPL Team", "T20 Avg", "Test Avg", "ODI Avg"];
  const rows = players;
  const name:string="Prasad"

  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [activeCommentCell, setActiveCommentCell] = useState<string | null>(null);

  const handleCellClick = (cellId: string) => {
    setSelectedCell(cellId);
  };

  const handleCommentClick = (cellId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveCommentCell(activeCommentCell === cellId ? null : cellId);
  };

  return (
    <div className="overflow-hidden p-4 w-full">
      <div className="absolute top-6 right-4">
        <VeltSidebarButton />
        <VeltCommentsSidebar />
      </div>
      <VeltComments popoverMode={true} popoverTriangleComponent={true} shortUserName={false}/>
      <div className="overflow-hidden rounded-lg border border-gray-700 bg-gray-800 shadow-xl w-full">
        <div className="w-full overflow-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column}
                    className="border border-gray-700 bg-gray-800 p-3 text-center font-medium text-gray-200"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((player, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(player).map((value, colIndex) => {
                    const cellId = `${rowIndex}-${colIndex}`;
                    const isSelected = selectedCell === cellId;
                    const isCommentActive = activeCommentCell === cellId;

                    return (
                      <td
                        key={cellId}
                        onClick={() => handleCellClick(cellId)}
                        className={`border border-gray-700 bg-gray-900 p-3 text-gray-300 transition-colors group text-center relative ${
                          isSelected ? "bg-gray-700" : ""
                        }`}
                        id={cellId}
                      >
                        <div className="flex items-center justify-center h-full">
                          <span>{value}</span>
                        </div>

                        <div
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity"
                          onClick={(e) => handleCommentClick(cellId, e)}
                        >
                          <VeltCommentTool className="min-w-2xl z-10" targetElementId={cellId}/>
                        </div>

                        {isCommentActive && (
                          <div className="absolute top-0 right-0 z-10">
                            <VeltCommentBubble targetElementId={cellId} />
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
