import SpreadsheetGrid from "@/components/spreadsheet-grid"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-4">
      <h1 className="mb-6 text-2xl font-bold text-white">Interactive Spreadsheet with Comments</h1>
      <SpreadsheetGrid />
    </main>
  )
}

