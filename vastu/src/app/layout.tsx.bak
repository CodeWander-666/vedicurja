import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/global/LanguageSelector";
import { AdminProvider } from "@/contexts/AdminContext";
import { fontSerif, fontSans, fontMono } from "@/styles/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "VedicUrja | Ancient Wisdom, Modern Precision",
  description: "Global Vastu Consultancy rooted in Uttar Pradesh tradition",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontSerif.variable} ${fontSans.variable} ${fontMono.variable}`} suppressHydrationWarning>
      <body className="bg-bg-primary text-text-primary antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            <AdminProvider>
              <LanguageSelector />
              {children}
            </AdminProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
