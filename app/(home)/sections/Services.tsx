const items = [
  { href: "/services/sea",  title: "Ocean Freight",  desc: "Global maritime shipping solutions", icon: "ship" },
  { href: "/services/air",  title: "Air Cargo",      desc: "Fast express air freight services", icon: "plane" },
  { href: "/services/road", title: "Road Transport", desc: "Reliable ground transportation",     icon: "truck" },
  { href: "/services/rail", title: "Rail Freight",   desc: "Efficient railway cargo solutions",  icon: "rail" },
  { href: "/services/warehouse", title: "Warehousing", desc: "Secure storage & distribution",   icon: "box" },
  { href: "/services/multimodal", title: "Multimodal", desc: "Integrated transport solutions",  icon: "layers" },
  { href: "/services/project", title: "Project Cargo", desc: "Specialized heavy cargo handling", icon: "crane" },
  { href: "/services/customs", title: "Customs & Compliance", desc: "Clearance and trade docs", icon: "shield" },
];

function Icon({ name }: { name: string }) {
  // أيقونات SVG خفيفة (inline) بدون مكتبات
  if (name === "ship") return (<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden className="shrink-0"><path fill="currentColor" d="M3 19h18l-1 2H4zM3 15l9-4l9 4v2H3zM5 7h14v2H5z"/></svg>);
  if (name === "plane") return (<svg width="20" height="20" viewBox="0 0 24 24" className="shrink-0"><path fill="currentColor" d="m10.18 9.17l-6.7 6.7l1.41 1.41l6.7-6.7l7.07 7.07H21V16L13.93 8.93l1.41-1.41L12 5l-1.41 1.41l1.59 1.59Z"/></svg>);
  if (name === "truck") return (<svg width="20" height="20" viewBox="0 0 24 24" className="shrink-0"><path fill="currentColor" d="M20 8h-3V4H3v12h2a3 3 0 0 0 6 0h2a3 3 0 0 0 6 0h2v-5zM7 18a1 1 0 1 1 .001-2.001A1 1 0 0 1 7 18m10 0a1 1 0 1 1 .001-2.001A1 1 0 0 1 17 18m1-6V9h1.586L21 10.414V12z"/></svg>);
  if (name === "rail") return (<svg width="20" height="20" viewBox="0 0 24 24" className="shrink-0"><path fill="currentColor" d="M12 2c3.86 0 7 3.14 7 7v6a3 3 0 0 1-3 3l2 2v1h-2l-2-2H10l-2 2H6v-1l2-2a3 3 0 0 1-3-3V9c0-3.86 3.14-7 7-7"/></svg>);
  if (name === "box") return (<svg width="20" height="20" viewBox="0 0 24 24" className="shrink-0"><path fill="currentColor" d="M21 8l-9-5l-9 5v8l9 5l9-5zM6.5 7.5L12 10l5.5-2.5L12 5z"/></svg>);
  if (name === "layers") return (<svg width="20" height="20" viewBox="0 0 24 24" className="shrink-0"><path fill="currentColor" d="m12 2l10 6l-10 6L2 8zm0 8l10 6l-10 6L2 16z"/></svg>);
  if (name === "crane") return (<svg width="20" height="20" viewBox="0 0 24 24" className="shrink-0"><path fill="currentColor" d="M3 3h18v2H3zm2 2h2v10h3V8h2v7h3V9h2v6h3V7h2v12h-6v2H9v-2H3z"/></svg>);
  if (name === "shield") return (<svg width="20" height="20" viewBox="0 0 24 24" className="shrink-0"><path fill="currentColor" d="M12 2l8 4v6c0 5-3.4 9.7-8 10c-4.6-.3-8-5-8-10V6z"/></svg>);
  return null;
}

export default function Services() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h2 className="text-xl font-semibold">Special Services — For Your Company</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((it) => (
          <a
            key={it.title}
            href={it.href}
            className="group rounded-xl border p-5 transition hover:-translate-y-0.5 hover:shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md border bg-gray-50 text-gray-700">
                <Icon name={it.icon} />
              </div>
              <div className="font-medium">{it.title}</div>
            </div>
            <div className="text-sm text-gray-600 mt-2">{it.desc}</div>
            <div className="mt-3 text-xs text-gray-500 group-hover:text-gray-700">Learn more →</div>
          </a>
        ))}
      </div>
    </section>
  );
}
