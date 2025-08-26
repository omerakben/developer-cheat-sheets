import Navigation from "@/components/Navigation";
import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";

// const inter = Inter({
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Python & Django Cheat Sheets",
  description:
    "Comprehensive cheat sheets for Python, Django, TypeScript, and Next.js with copy-paste ready code examples",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
