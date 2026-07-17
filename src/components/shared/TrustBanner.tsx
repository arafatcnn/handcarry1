export default function TrustBanner() {
  const items = [
    { icon: "🔐", label: "KYC Verified Users", desc: "Identity verified before any transaction" },
    { icon: "🛡️", label: "Escrow Protection", desc: "Funds held safely until delivery confirmed" },
    { icon: "📸", label: "Mandatory Inspection", desc: "Travelers inspect all items before carrying" },
    { icon: "🌍", label: "180+ Countries", desc: "Country-specific customs guidance built-in" },
    { icon: "⭐", label: "Trust Scores", desc: "Ratings, reviews & completion rates displayed" },
    { icon: "🚨", label: "Fraud Reporting", desc: "24/7 dispute center and compliance team" },
  ];
  return (
    <div className="bg-gradient-to-r from-blue-50 to-teal-50 border-y border-blue-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {items.map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-xs font-bold text-gray-800">{item.label}</div>
              <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
