import React from "react"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Pacer Express - Campus Instant Delivery | USCA",
  description:
    "Campus-exclusive instant delivery for University of South Carolina Aiken. Order snacks, groceries, and essentials from Pacer Market - delivered in 10 minutes.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {/*
          Inject a small script to apply the saved theme class before React hydration.
          This prevents a server/client mismatch when next-themes updates the html class.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=localStorage.getItem('theme-mode');var theme=t||d||'light';document.documentElement.classList.remove('light','dark');document.documentElement.classList.add(theme);}catch(e){} })()`,
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableColorScheme={false} enableSystem={true} storageKey="theme">
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
