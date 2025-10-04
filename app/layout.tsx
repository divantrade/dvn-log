import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DVN LOG - Global Logistics Solutions",
  description: "Safe, fast delivery to every corner of the world. Ocean, air, road and rail transport services with real-time tracking.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <main className="pt-16 md:pt-24">{children}</main>
      </body>
    </html>
  );
}
