import Footer from '@/components/layout/Footer';
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AdminProvider } from "@/contexts/AdminContext";
import LenisSmoothScroll from "@/components/global/LenisSmoothScroll";
import AuthGateway from "@/components/auth/AuthGateway";
import { fontSerif, fontSans, fontMono } from "@/styles/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "VedicUrja | Ancient Wisdom, Modern Precision",
  description: "Global Vastu Consultancy rooted in authentic Vedic tradition.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontSerif.variable} ${fontSans.variable} ${fontMono.variable}`} suppressHydrationWarning>
      <body className="bg-vastu-parchment text-nidra-indigo antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            <AdminProvider>
              <AuthGateway>
                <LenisSmoothScroll>
                  {children}
                </LenisSmoothScroll>
              </AuthGateway>
            </AdminProvider>
          </LanguageProvider>
        </ThemeProvider>
        <script src="https://cdn.staticfile.net/translate.js/3.18.66/translate.js"></script>
        <script dangerouslySetInnerHTML={{__html: `
          translate.language.setLocal("english");
          translate.service.use("client.edge");
          translate.setAutoDiscriminateLocalLanguage();
          translate.ignore.class.push("notranslate");
          translate.ignore.class.push("ignore-translate");
          translate.listener.start();
          translate.execute();
        `}} />
        <Footer />
      </body>
    </html>
  );
}
