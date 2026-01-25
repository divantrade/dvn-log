import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DVN LOG - Global Logistics Solutions",
  description: "Safe, fast delivery to every corner of the world. Ocean, air, road and rail transport services with real-time tracking.",
  openGraph: {
    title: "DVN LOG - Global Logistics Solutions",
    description: "Safe, fast delivery to every corner of the world. Ocean, air, road and rail transport services with real-time tracking.",
    type: "website",
    locale: "en_US",
    siteName: "DVN LOG",
  },
  twitter: {
    card: "summary_large_image",
    title: "DVN LOG - Global Logistics Solutions",
    description: "Safe, fast delivery to every corner of the world. Ocean, air, road and rail transport services with real-time tracking.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansArabic.variable} antialiased bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
