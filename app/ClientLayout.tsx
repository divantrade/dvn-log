"use client";

import Header from "@/components/Header";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="pt-24 md:pt-32">{children}</main>
    </>
  );
}
