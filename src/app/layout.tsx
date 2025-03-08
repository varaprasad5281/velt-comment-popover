"use client";

import type { ReactNode } from "react";
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google";
import "./globals.css";
import { VeltProvider } from "@veltdev/react";
import YourAuthComponent from "@/components/YourAuthComponent";

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  const apiKey = process.env.NEXT_PUBLIC_VELT_API_KEY;
  const documentId = "spreadsheet-doc-123"; // ✅ Ensure this is unique for each document

  if (!apiKey) {
    console.error("❌ Velt API key is missing! Check .env.local");
  }

  return (
    <html lang="en" className={geist.className}>
      <body>
        <VeltProvider apiKey={apiKey || ""} documentId={documentId}>
          <YourAuthComponent /> {/* ✅ Handles user authentication */}
          {children}
        </VeltProvider>
      </body>
    </html>
  );
}
