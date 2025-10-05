export default function Hero() {
  const bg =
    "https://images.unsplash.com/photo-1532989029401-c80f1de0edc9?q=80&w=1600&auto=format&fit=crop";

  return (
    <section
      className="relative"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      aria-label="DVN Logistics hero"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/50" />

      <div className="relative mx-auto max-w-7xl px-4 pt-24 pb-24 text-white">
        <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs tracking-wide">
          Global logistics • 50+ countries
        </span>

        <h1 className="mt-3 text-3xl md:text-5xl font-extrabold leading-tight">
          We Bring the World Closer
        </h1>

        <p className="mt-4 max-w-2xl text-gray-100">
          Ocean, air, road and rail — reliable routes, clear pricing, and real-time visibility.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/contact"
            className="rounded-md bg-white text-black px-5 py-2 text-sm font-semibold shadow-sm hover:shadow"
          >
            Get Quote
          </a>
          <a
            href="/services"
            className="rounded-md border border-white/70 px-5 py-2 text-sm font-medium hover:bg-white/10"
          >
            Explore Services
          </a>
          <a
            href="/track"
            className="rounded-md border border-white/70 px-5 py-2 text-sm font-medium hover:bg-white/10"
          >
            Track Shipment
          </a>
        </div>
      </div>
    </section>
  );
}
