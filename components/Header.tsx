"use client";

export default function Header() {
  return (
    <div style={{
      position: "sticky",
      top: 0,
      zIndex: 1000,
      background: "#111",
      color: "#fff",
      padding: "12px",
      borderBottom: "3px solid #e11"
    }}>
      HEADER TEST — inline styles (no Tailwind)
    </div>
  );
}
