import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PROHIBITED_ITEMS } from "@/lib/data";

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-700 to-red-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge className="mb-3 bg-white/20 text-white border-white/30">🛡️ Safety Center</Badge>
          <h1 className="text-3xl font-bold mb-2">Trust & Safety at CarryBridge</h1>
          <p className="text-red-100 max-w-2xl">Our platform is built on a foundation of legal compliance, identity verification, and mutual trust. Here's exactly how we keep every transaction safe.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* KYC section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">🔐 Identity Verification (KYC)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { level: "Basic", icon: "📧", desc: "Email + phone verified. Can browse and message.", items: ["Email OTP verified","Phone SMS verified","Profile complete"] },
              { level: "Standard", icon: "🪪", desc: "Government ID submitted and under review.", items: ["Basic complete","Government ID uploaded","Selfie verification","Address proof (optional)"] },
              { level: "Full KYC", icon: "🔐", desc: "Fully verified. Can send, carry, and sponsor.", items: ["Standard complete","ID approved by admin","Full trust badge","Eligible for escrow","Sponsorship eligible"] },
            ].map((tier) => (
              <div key={tier.level} className="border border-gray-200 rounded-xl p-5">
                <div className="text-3xl mb-2">{tier.icon}</div>
                <div className="font-bold text-gray-900 mb-1">{tier.level} Verification</div>
                <p className="text-xs text-gray-500 mb-3">{tier.desc}</p>
                <ul className="space-y-1">
                  {tier.items.map((i) => <li key={i} className="text-xs text-gray-600 flex gap-1"><span className="text-green-600">✓</span>{i}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-5 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
            💡 CarryBridge does not store raw identity documents. All documents are processed securely and hashed per GDPR guidelines. Verification is a one-time process per account.
          </div>
        </div>

        {/* 10 safety commandments */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-5">📋 The 10 CarryBridge Safety Commandments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { num: "1", rule: "Never carry a sealed, unknown package", detail: "Open and inspect every item. If you cannot see the contents, do not carry it. This is non-negotiable." },
              { num: "2", rule: "Always request invoice for high-value items", detail: "Phones, electronics, jewelry, and items over $200 must have invoice/receipt." },
              { num: "3", rule: "Photograph items from all angles before pickup", detail: "This protects you legally and ensures accountability on both sides." },
              { num: "4", rule: "Never share your OTP with the sender", detail: "The delivery OTP is for the recipient. It confirms delivery. Do not give it to anyone else." },
              { num: "5", rule: "Check country rules before accepting cargo", detail: "Know what's allowed in both origin and destination. CarryBridge has a Country Rules guide." },
              { num: "6", rule: "Report any pressure to carry undeclared items", detail: "If a sender pressures you to not declare an item, report immediately. Your account is protected." },
              { num: "7", rule: "Only communicate and pay through CarryBridge", detail: "Off-platform deals are unprotected. Escrow, disputes, and reviews only work in-platform." },
              { num: "8", rule: "Declare everything at customs honestly", detail: "CarryBridge cannot protect you from customs decisions. Declare accurately. We do not encourage evasion." },
              { num: "9", rule: "Never accept cash or personal payment before delivery", detail: "All payment goes through escrow. Do not accept early payment to avoid disputes." },
              { num: "10", rule: "Trust your instincts — decline if something feels wrong", detail: "You can decline any booking at any time before pickup. Your safety comes first." },
            ].map((c) => (
              <div key={c.num} className="flex gap-3 bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-sm flex-shrink-0">{c.num}</div>
                <div>
                  <div className="font-bold text-gray-900 text-sm mb-1">{c.rule}</div>
                  <div className="text-xs text-gray-500">{c.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prohibited Items */}
        <div className="bg-white rounded-2xl border border-red-200 p-8 mb-8">
          <h2 className="text-xl font-bold text-red-900 mb-2">🚫 Absolutely Prohibited Items</h2>
          <p className="text-sm text-gray-500 mb-6">The following categories are strictly prohibited on CarryBridge. Violation results in permanent ban and possible legal reporting.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PROHIBITED_ITEMS.map((item) => (
              <div key={item.category} className={`rounded-xl p-4 border flex gap-3 ${item.severity === "absolute" ? "bg-red-50 border-red-200" : "bg-amber-50 border-amber-200"}`}>
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <div className={`font-bold text-sm mb-1 ${item.severity === "absolute" ? "text-red-900" : "text-amber-900"}`}>
                    {item.category}
                    <Badge variant={item.severity === "absolute" ? "danger" : "warning"} className="ml-2 text-xs">
                      {item.severity === "absolute" ? "Absolute Prohibition" : "Conditional Risk"}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-600">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Report & Dispute */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-orange-200">
            <CardContent className="p-6">
              <div className="text-3xl mb-3">🚨</div>
              <h3 className="font-bold text-gray-900 mb-2">Report Suspicious Activity</h3>
              <p className="text-sm text-gray-500 mb-4">If you suspect fraud, illegal items, or unsafe behavior, report immediately. Your identity is protected.</p>
              <Link href="/dashboard/disputes">
                <Button variant="danger" size="sm">File a Report →</Button>
              </Link>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-6">
              <div className="text-3xl mb-3">⚖️</div>
              <h3 className="font-bold text-gray-900 mb-2">Dispute Center</h3>
              <p className="text-sm text-gray-500 mb-4">For payment disputes, non-delivery, item damage, or customs issues — our team reviews within 48 hours.</p>
              <Link href="/dashboard/disputes">
                <Button variant="outline" size="sm">Open Dispute →</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/country-rules"><Button size="lg" variant="outline">View Country Rules →</Button></Link>
        </div>
      </div>
    </div>
  );
}
