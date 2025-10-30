import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { BookmarkProvider } from "@/contexts/BookmarkContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Developer Cheat Sheets | Quick Reference for Modern Web Development",
    template: "%s | Developer Cheat Sheets",
  },
  description:
    "Comprehensive cheat sheets for Python, Django, TypeScript, Next.js, FastAPI, and OpenAI with copy-paste ready code examples. Bookmark your favorites, filter by difficulty, and boost your development speed.",
  keywords: [
    "developer cheat sheets",
    "python cheat sheet",
    "django cheat sheet",
    "typescript cheat sheet",
    "nextjs cheat sheet",
    "fastapi cheat sheet",
    "openai api cheat sheet",
    "code examples",
    "programming reference",
    "web development",
  ],
  authors: [{ name: "Omer Akben", url: "https://omerakben.com" }],
  creator: "Omer Akben",
  publisher: "Omer Akben",
  metadataBase: new URL("https://developer-cheat-sheets.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://developer-cheat-sheets.vercel.app",
    title: "Developer Cheat Sheets | Quick Reference for Modern Web Development",
    description:
      "Comprehensive cheat sheets with copy-paste ready code examples for Python, Django, TypeScript, Next.js, and more.",
    siteName: "Developer Cheat Sheets",
  },
  twitter: {
    card: "summary_large_image",
    title: "Developer Cheat Sheets",
    description:
      "Copy-paste ready code examples for modern web development",
    creator: "@omerakben",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <BookmarkProvider>
            <Navigation />
            <main>{children}</main>
            <Footer />
          </BookmarkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
