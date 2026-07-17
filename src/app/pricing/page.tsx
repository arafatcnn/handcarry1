import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-700 to-teal-600 text-white py-14 text-center">
        <Badge className="mb-4 bg-white/20 text-white border-white/30">Transparent Pricing</Badge>
        <h1 className="text-3xl font-bold mb-3">Simple, Fair Platform Fees</h1>
        <p className="text-blue-100 max-w-xl mx-auto">Free to join. We only earn when you complete a successful delivery. No hidden charges.</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { title: "Sender", icon: "📦", fee: "0%", desc: "Free to post shipment requests", details: ["Free account", "Free listing", "Pay only the agreed carrying fee to traveler", "Escrow service included", "Platform dispute support included"], cta: "Post a Shipment", href: "/send-item" },
            { title: "Traveler / Carrier", icon: "✈️", fee: "10–12%", desc: "Small platform fee on successful delivery", details: ["Free to post trips", "Free KYC verification", "10% fee on standard deliveries (<$500)", "12% fee on high-value deliveries (>$500)", "Escrow + payout included", "Priority matching for verified users"], cta: "Post a Trip", href: "/trips/new", featured: true },
            { title: "Sponsor / Cargo Owner", icon: "💼", fee: "8%", desc: "On successful sponsorship completion", details: ["Free to post sponsor offers", "8% platform fee on ticket amount funded", "Escrow milestone service included", "KYC verification of travelers", "Admin oversight of delivery milestones"], cta: "Post Sponsorship", href: "/sponsorship/new" },
          ].map((plan) => (
            <Card key={plan.title} className={plan.featured ? "border-blue-500 shadow-lg ring-2 ring-blue-500" : ""}>
              <CardContent className="p-6">
                {plan.featured && <div className="text-center mb-4"><Badge>Most Popular</Badge></div>}
                <div className="text-3xl mb-2">{plan.icon}</div>
                <h3 className="text-xl font-bold text-gray-900">{plan.title}</h3>
                <div className="mt-3 mb-4">
                  <span className="text-4xl font-bold text-blue-600">{plan.fee}</span>
                  <span className="text-gray-500 ml-2">platform fee</span>
                </div>
                <p className="text-sm text-gray-500 mb-5">{plan.desc}</p>
                <ul className="space-y-2 mb-6">
                  {plan.details.map((d) => (
                    <li key={d} className="text-sm text-gray-600 flex gap-2"><span className="text-green-500 flex-shrink-0">✓</span>{d}</li>
                  ))}
                </ul>
                <Link href={plan.href}>
                  <Button className="w-full" variant={plan.featured ? "primary" : "outline"}>{plan.cta} →</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Fee examples */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-5">Fee Calculation Examples</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  {["Scenario","Agreed Fee","Platform Fee","Traveler Gets"].map((h) => (
                    <th key={h} className="py-3 px-4 text-left text-gray-500 font-semibold text-xs">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Light item (documents)", "$20", "$2 (10%)", "$18"],
                  ["Phone carry (Dhaka-London)", "$45", "$4.50 (10%)", "$40.50"],
                  ["Clothing bundle 5kg", "$60", "$6 (10%)", "$54"],
                  ["High-value electronics", "$120", "$14.40 (12%)", "$105.60"],
                  ["Sponsorship: $900 ticket", "$900 ticket", "$72 (8%)", "Full ticket funded"],
                ].map(([s,f,p,g]) => (
                  <tr key={s} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-gray-900">{s}</td>
                    <td className="py-3 px-4 text-gray-600">{f}</td>
                    <td className="py-3 px-4 text-red-600">{p}</td>
                    <td className="py-3 px-4 font-bold text-green-700">{g}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="space-y-4">
          {[
            { q: "When is the platform fee charged?", a: "The fee is deducted from escrow upon successful delivery confirmation. You never pay more than the agreed amount upfront." },
            { q: "What if a delivery fails or is disputed?", a: "If a dispute is found in favor of the sender, the full amount is refunded from escrow. Platform fee is not charged on failed/refunded transactions." },
            { q: "Are there any signup or listing fees?", a: "No. Creating an account, completing KYC, and posting trip or shipment listings are completely free." },
            { q: "What currencies are supported?", a: "Payments are processed in USD, GBP, EUR, AED, CAD, AUD and more. Payouts can be in local currency depending on your bank." },
          ].map((faq) => (
            <div key={faq.q} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="font-bold text-gray-900 mb-2">Q: {faq.q}</div>
              <div className="text-sm text-gray-600">{faq.a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
