const logos = [
  { name: "Acme",    url: "#"},
  { name: "Globex",  url: "#"},
  { name: "Umbrella",url: "#"},
  { name: "Initech", url: "#"},
  { name: "Wayne",   url: "#"},
  { name: "Stark",   url: "#"},
];

export default function Trusted() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 border-t">
      <div className="text-center">
        <p className="text-sm text-gray-600">Trusted by teams worldwide</p>
      </div>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center">
        {logos.map((l) => (
          <a
            key={l.name}
            href={l.url}
            aria-label={l.name}
            className="flex h-12 items-center justify-center rounded-md border bg-white"
          >
            <span className="text-gray-500 text-sm">{l.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
