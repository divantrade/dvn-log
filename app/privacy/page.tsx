export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 space-y-6">
      <h1 className="text-2xl font-semibold">Privacy Policy</h1>
      <p className="text-gray-600">
        We respect your privacy. This page describes how DVN handles information and contacts.
      </p>
      <h2 className="text-lg font-medium mt-6">What we collect</h2>
      <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
        <li>Basic contact details you submit (name, email, phone).</li>
        <li>Shipment details needed to provide quotes and services.</li>
        <li>Website analytics to improve performance and UX.</li>
      </ul>
      <h2 className="text-lg font-medium mt-6">How we use it</h2>
      <p className="text-sm text-gray-700">
        To reply to requests, prepare quotations, and operate our logistics services. We do not sell personal data.
      </p>
      <h2 className="text-lg font-medium mt-6">Contact</h2>
      <p className="text-sm text-gray-700">
        For privacy questions, contact <a className="underline" href="mailto:hello@dvnlog.com">hello@dvnlog.com</a>.
      </p>
    </div>
  );
}
