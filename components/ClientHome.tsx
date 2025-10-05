"use client";

export default function ClientHome({ data }: { data: any }) {
  return (
    <section style={{ padding: 24 }}>
      <h1 className="text-2xl font-semibold">DVN LOG — Home</h1>
      <p className="mt-2">البيانات التالية قادمة من Sanity (تم جلبها على السيرفر):</p>
      <pre className="mt-4 p-4 bg-gray-100 rounded" style={{whiteSpace:"pre-wrap"}}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </section>
  );
}
