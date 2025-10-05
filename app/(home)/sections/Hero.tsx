export default function Hero() {
  // صورة خلفية ثابتة تشبه البطل الحالي (يمكنك لاحقًا تغيير URL لصورة تستضيفها عندك)
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
    >
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative mx-auto max-w-7xl px-4 pt-24 pb-20 text-white">
        <p className="text-sm opacity-90">Trusted global logistics partner</p>
        <h1 className="mt-2 text-3xl md:text-5xl font-bold leading-tight">
          We Bring the World Closer
        </h1>
        <p className="mt-4 max-w-2xl text-gray-100">
          Ocean, air, road and rail — reliable routes, clear pricing, and real-time visibility.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/contact"
            className="rounded-md bg-white text-black px-5 py-2 text-sm font-medium"
          >
            Get Quote
          </a>
          <a
            href="/services"
            className="rounded-md border border-white/70 px-5 py-2 text-sm font-medium"
          >
            Explore Services
          </a>
          <a
            href="/track"
            className="rounded-md border border-white/70 px-5 py-2 text-sm font-medium"
          >
            Track Shipment
          </a>
        </div>
      </div>
    </section>
  );
}
