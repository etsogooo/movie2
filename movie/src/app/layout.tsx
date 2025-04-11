"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GenreProvider, Provider } from "@/components/Context";
import { Header } from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <GenreProvider>
            <Header />
            {children}
          </GenreProvider>
        </Provider>
        {/* layoutiin children iig burj bj bugdend n ajillaj bga */}
      </body>
    </html>
  );
}
