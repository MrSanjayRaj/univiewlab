import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UniViewLab - Responsive & Browser Testing Platform",
  description: "Unified platform for responsive design, browser, security, and SEO testing.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
          minHeight: '100vh',
        }}
      >
        <Navbar />
        <main style={{
          maxWidth: 600,
          margin: '0 auto',
          padding: '2rem 1.5rem',
          background: 'rgba(255,255,255,0.97)',
          borderRadius: '1.25rem',
          boxShadow: '0 4px 32px 0 rgba(30,64,175,0.07)',
          minHeight: '60vh',
        }}>
          {children}
        </main>
      </body>
    </html>
  );
}
