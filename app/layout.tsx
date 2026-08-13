import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "500", "600"],
  variable: "--font-display-custom",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body-custom",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thanushika Madhusith | Digital Creator, Developer & Photographer",
  description: "Personal portfolio of Thanushika Madhusith. A single-page, scroll-driven editorial experience showcasing technology, artificial intelligence, IoT, and cinematic photography.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#0A0908] text-[#F4F1EA] custom-cursor-active overflow-x-hidden" suppressHydrationWarning>
        {/* Cinematic Film Grain Overlay */}
        <div className="noise-overlay" />
        
        {/* Custom Interactive Cursor */}
        <CustomCursor />
        
        {children}
      </body>
    </html>
  );
}
