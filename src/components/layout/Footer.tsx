import Link from "next/link";

const FOOTER_LINKS = {
  Platform: [
    { href: "/find-traveler", label: "Find Traveler" },
    { href: "/send-item", label: "Send Item" },
    { href: "/sponsored-ticket", label: "Sponsorship" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/pricing", label: "Pricing" },
  ],
  "Trust & Safety": [
    { href: "/safety", label: "Safety Center" },
    { href: "/prohibited-items", label: "Prohibited Items" },
    { href: "/country-rules", label: "Country Rules" },
    { href: "/help", label: "Help Center" },
  ],
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
  ],
  Legal: [
    { href: "/terms", label: "Terms of Service" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/prohibited-items", label: "Prohibited Items Policy" },
    { href: "/compliance", label: "Compliance" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-400 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <span className="text-white font-bold text-lg">CarryBridge</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              The world's trusted peer-to-peer hand-carry logistics marketplace. Legal-first. Trust-first. Global.
            </p>
            <div className="flex gap-3 mt-4">
              {["twitter","linkedin","facebook","instagram"].map((s) => (
                <a key={s} href="#" className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors">
                  <span className="text-xs text-gray-400">{s[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white font-semibold text-sm mb-3">{section}</h4>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="border-t border-gray-800 pt-6 mt-6">
          <div className="bg-amber-900/30 border border-amber-800/50 rounded-lg p-3 mb-6 text-xs text-amber-300 leading-relaxed">
            ⚠️ <strong>Important Disclaimer:</strong> CarryBridge is a marketplace platform connecting travelers and senders. All customs declarations, duties, and legal compliance are the sole responsibility of the involved parties. Country rules displayed are advisory only — always verify with official government sources and airlines. CarryBridge does not facilitate or encourage customs evasion.
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <p>© 2026 CarryBridge Technologies Ltd. All rights reserved.</p>
            <div className="flex gap-4">
              <span>🔒 SSL Secured</span>
              <span>🛡️ GDPR Ready</span>
              <span>🌍 180+ Countries</span>
              <span>✈️ IATA Aware</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
