import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/layout/Providers";

export const metadata: Metadata = {
  title: "Ideon — Web2 Ideas Deserve a Web3 Future",
  description: "Ideon — AI-powered platform that transforms any Web2 startup idea into a complete Web3 blueprint. Get token model, DAO structure, smart contracts, whitepaper and market analysis in 30 seconds.",
  keywords: ["Ideon", "Web3", "blockchain", "startup", "AI", "DAO", "tokenomics", "DeFi", "blueprint", "Web2 to Web3"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
