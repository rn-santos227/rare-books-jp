import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { LanguageProvider } from "@/context/LanguageContext";
import { MetadataUpdater } from "@/components/layouts/MetadataUpdater";
import { SupportedLanguage, translations } from "@/constants/translations";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

async function getInitialLanguage(): Promise<SupportedLanguage> {
  const languageCookie = (await cookies()).get("preferredLanguage")?.value;
  return languageCookie === "ja" ? "ja" : "en";
}

export async function generateMetadata(): Promise<Metadata> {
  const initialLanguage = await getInitialLanguage();
  const defaultTranslations = translations[initialLanguage].common;

  return {
    title: defaultTranslations.metaTitle,
    description: defaultTranslations.metaDescription,
    alternates: {
      languages: {
        en: "/",
        ja: "/?lang=ja",
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 const initialLanguage = await getInitialLanguage();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LanguageProvider defaultLanguage={initialLanguage}>
          <MetadataUpdater />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
