import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "F1 Pulse | Formula 1 Companion",
  description: "The modern way to follow Formula 1. Results, standings, and calendars.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.png",
    apple: "/icon-192.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "F1 Pulse",
  },
};

export const viewport: Viewport = {
  themeColor: "#E10600",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.variable} font-sans antialiased text-white bg-background`}>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-grow pb-24 md:pb-0">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
