import type { Metadata } from "next";
import { Providers } from "@/components/global/Providers";
import { fontSerif, fontSans, fontMono } from "@/styles/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vastu Consultant | Ancient Wisdom, Modern Precision",
  description: "Global Vastu Consultancy rooted in Uttar Pradesh tradition",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontSerif.variable} ${fontSans.variable} ${fontMono.variable}`} suppressHydrationWarning>
      <body className="bg-[#F9F6F0] text-[#1A2A3A] antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
