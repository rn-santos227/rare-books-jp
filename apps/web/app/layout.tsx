import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { LanguageProvider } from "@/context/LanguageContext";
import { MetadataUpdater } from "@/components/layouts/MetadataUpdater";
import { translations } from "@/constants/translations";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const defaultTranslations = translations.en.common;
export const metadata: Metadata = {
  title: defaultTranslations.metaTitle,
  description: defaultTranslations.metaDescription,
  alternates: {
    languages: {
      en: "/",
      ja: "/?lang=ja",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LanguageProvider>
          <MetadataUpdater />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
