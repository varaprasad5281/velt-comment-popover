"use client"

import { useState } from "react"
import {
  VeltComments,
  VeltCommentTool,
  VeltCommentBubble,
  VeltSidebarButton,
  VeltCommentsSidebar
} from '@veltdev/react';

type CellData = {
  value: string
  selected: boolean
}

export default function SpreadsheetGrid() {
  const columns = ["A", "B", "C", "D", "E"]
  const rows = [1, 2, 3, 4]

  const initialData: Record<string, CellData> = {}

  // Initialize grid data
  columns.forEach((col) => {
    rows.forEach((row) => {
      const cellId = `${col}${row}`
      initialData[cellId] = {
        value: cellId,
        selected: false,
      }
    })
  })

  const [gridData, setGridData] = useState(initialData)
  const [selectedCell, setSelectedCell] = useState<string | null>(null)
  const [activeCommentCell, setActiveCommentCell] = useState<string | null>(null)

  const handleCellClick = (cellId: string) => {
    const newData = { ...gridData }
    Object.keys(newData).forEach((key) => {
      newData[key].selected = false
    })
    newData[cellId].selected = true
    setGridData(newData)
    setSelectedCell(cellId)
  }

  const handleCommentClick = (cellId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent cell selection when clicking comment tool
    setActiveCommentCell(activeCommentCell === cellId ? null : cellId);
  }

  return (
    <div className="flex flex-col gap-4">
        <div className="absolute top-10 right-4">
  <VeltSidebarButton />
  <VeltCommentsSidebar /> {/* Add VeltCommentsSidebar to the root of your app provider */}

</div>

      {/* Render comment popovers with triangle component */}
      <VeltComments popoverMode={true} popoverTriangleComponent={true} />

      <div className="overflow-hidden rounded-lg border border-gray-700 bg-gray-800 shadow-xl">
        <div className="w-full max-w-3xl overflow-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="w-12 border border-gray-700 bg-gray-800 p-3 text-center font-medium text-gray-200"></th>
                {columns.map((column) => (
                  <th 
                    key={column} 
                    className="min-w-24 border border-gray-700 bg-gray-800 p-3 text-center font-medium text-gray-200"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row}>
                  <td className="border border-gray-700 bg-gray-800 p-3 text-center font-medium text-gray-200">
                    {row}
                  </td>
                  {columns.map((column) => {
                    const cellId = `${column}${row}`
                    const isSelected = gridData[cellId].selected
                    const isCommentActive = activeCommentCell === cellId
                    
                    return (
                      <td
                        key={cellId}
                        onClick={() => handleCellClick(cellId)}
                        className={`relative border border-gray-700 bg-gray-900 p-3 text-gray-300 transition-colors group ${
                          isSelected ? "bg-gray-700" : ""
                        }`}
                        id={cellId}
                      >
                        <div className="flex items-center justify-between">
                          <span>{gridData[cellId].value}</span>
                          
                          {/* Comment tool that appears on hover */}
                          <div 
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity"
                            onClick={(e) => handleCommentClick(cellId, e)}
                          >
                            <VeltCommentTool
                              className="min-w-2xl z-10"
                              targetElementId={cellId}
                              // size="small"
                            />
                          </div>
                        </div>
                        
                        {/* Show comment bubble when active */}
                        {isCommentActive && (
                          <div className="absolute top-0 right-0 z-10">
                            <VeltCommentBubble
                              targetElementId={cellId}
                            />
                          </div>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
