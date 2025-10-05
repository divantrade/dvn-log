export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 space-y-6">
      <h1 className="text-2xl font-semibold">Terms of Service</h1>
      <p className="text-gray-600">These terms govern the use of DVN logistics services and this website.</p>
      <h2 className="text-lg font-medium mt-6">Use of services</h2>
      <p className="text-sm text-gray-700">
        Quotes are estimates based on provided info. Actual costs may vary due to route changes, fuel, and customs.
      </p>
      <h2 className="text-lg font-medium mt-6">Liability</h2>
      <p className="text-sm text-gray-700">
        DVN follows standard international freight liability rules unless a separate contract states otherwise.
      </p>
      <h2 className="text-lg font-medium mt-6">Contact</h2>
      <p className="text-sm text-gray-700">
        Questions? <a className="underline" href="mailto:hello@dvnlog.com">hello@dvnlog.com</a>
      </p>
    </div>
  );
}
