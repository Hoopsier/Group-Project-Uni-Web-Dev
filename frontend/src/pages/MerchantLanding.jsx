import { Link } from "react-router-dom";

export default function MerchantLanding() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold">YumDrop for Merchants</h1>
      <p className="text-gray-600 mt-2">
        Coming soon: restaurant registration flow.
      </p>

      <div className="mt-6">
        <Link className="underline" to="/">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
