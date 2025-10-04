import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DVN LOG - Global Logistics Solutions",
  description: "Safe, fast delivery to every corner of the world.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
          <div className="max-w-7xl mx-auto p-4 flex justify-between">
            <div className="font-semibold">DVN</div>
            <nav className="flex gap-4">
              <a href="/track">Track</a>
              <a href="/services">Services</a>
              <a href="/contact">Contact</a>
            </nav>
          </div>
        </header>
        <main className="pt-16 md:pt-24">{children}</main>
      </body>
    </html>
  );
}
