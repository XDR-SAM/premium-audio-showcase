import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const space = Space_Grotesk({ variable: "--font-display", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "SONIQUE — Premium Audio",
  description: "Hear the extraordinary. Premium audio equipment crafted for perfection.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${space.variable}`}>{children}</body>
    </html>
  );
}