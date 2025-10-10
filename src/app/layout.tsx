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
  title: "MyShop | Boutique en ligne Next.js",
  description: "Découvrez MyShop, une boutique en ligne moderne créée avec Next.js. Achetez vos produits favoris facilement et rapidement.",
  keywords: ["e-commerce", "Next.js", "boutique en ligne", "achats", "produits"],
  openGraph: {
    title: "MyShop | Boutique en ligne Next.js",
    description: "Explorez une boutique en ligne rapide et élégante développée avec Next.js.",
    url: "https://myshop.example.com",
    siteName: "MyShop",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Aperçu de MyShop",
      },
    ],
    locale: "fr_FR",
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
