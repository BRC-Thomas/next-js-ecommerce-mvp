import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyShop | Next.js Online Store",
  description: "Discover MyShop, a modern online store built with Next.js. Shop your favorite products easily and quickly.",
  keywords: ["e-commerce", "Next.js", "online store", "shopping", "products"],
  openGraph: {
    title: "MyShop | Next.js Online Store",
    description: "Explore a fast and stylish online store developed with Next.js.",
    url: "https://myshop.example.com",
    siteName: "MyShop",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "MyShop Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background min-h-screen font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
