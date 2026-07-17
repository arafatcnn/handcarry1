import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PROHIBITED_ITEMS } from "@/lib/data";

export default function ProhibitedItemsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-700 to-red-600 text-white py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge className="mb-3 bg-white/20 text-white border-white/30">🚫 Platform Policy</Badge>
          <h1 className="text-3xl font-bold mb-2">Prohibited Items Policy</h1>
          <p className="text-red-100 max-w-2xl">These items are absolutely prohibited on CarryBridge. Violation results in permanent account ban, escrow forfeiture, and reporting to relevant authorities.</p>
          <div className="mt-4 bg-white/10 border border-white/20 rounded-xl p-4 text-sm">
            Last updated: June 2026 · Applies globally to all CarryBridge users in all countries
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {PROHIBITED_ITEMS.map((item) => (
            <Card key={item.category} className={item.severity === "absolute" ? "border-red-200" : "border-amber-200"}>
              <CardContent className="p-5 flex gap-4">
                <span className="text-3xl flex-shrink-0">{item.icon}</span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 text-sm">{item.category}</h3>
                    <Badge variant={item.severity === "absolute" ? "danger" : "warning"}>
                      {item.severity === "absolute" ? "🚫 Absolute" : "⚠️ Conditional"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gray-800 rounded-2xl p-8 text-white mb-8">
          <h2 className="text-xl font-bold mb-4">CarryBridge Zero-Tolerance Policy</h2>
          <div className="space-y-3 text-sm text-gray-300">
            <p>CarryBridge operates a zero-tolerance policy for any attempt to use our platform to transport illegal, undeclared, or dangerous items. This includes:</p>
            <ul className="space-y-1.5 ml-4">
              <li>• Misrepresenting item categories or declared values</li>
              <li>• Asking travelers to carry sealed or uninspected packages</li>
              <li>• Attempting to bribe or pressure travelers to skip inspection</li>
              <li>• Using CarryBridge to evade customs duties or import regulations</li>
              <li>• Providing false information during KYC verification</li>
            </ul>
            <p className="mt-4">Consequences include: permanent platform ban, escrow forfeiture, reporting to national customs authorities, Interpol liaison where applicable, and civil/criminal liability.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card className="border-amber-200">
            <CardContent className="p-5">
              <div className="text-3xl mb-3">💊</div>
              <h3 className="font-bold text-gray-900 mb-2">Medications — Conditional Rules</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Personal use quantity allowed</li>
                <li>✓ Original labeled packaging required</li>
                <li>✓ Doctor prescription for controlled drugs</li>
                <li>✗ Commercial quantities prohibited</li>
                <li>✗ Unlabeled pills/tablets not allowed</li>
                <li>⚠️ UAE, Qatar, Saudi Arabia — verify before travel</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-amber-200">
            <CardContent className="p-5">
              <div className="text-3xl mb-3">📱</div>
              <h3 className="font-bold text-gray-900 mb-2">Electronics — Conditional Rules</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ 1–2 phones for personal use generally OK</li>
                <li>✓ Invoice required for all devices</li>
                <li>✓ IMEI declaration recommended</li>
                <li>✗ 5+ phones = commercial quantity in most countries</li>
                <li>✗ Bulk electronics without permits prohibited</li>
                <li>⚠️ Lithium batteries: IATA rules apply</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-amber-200">
            <CardContent className="p-5">
              <div className="text-3xl mb-3">🍎</div>
              <h3 className="font-bold text-gray-900 mb-2">Food — Conditional Rules</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Commercially packaged, sealed food OK in most countries</li>
                <li>✓ Declare all food items at customs</li>
                <li>✗ Fresh produce restricted (AU, NZ, USA)</li>
                <li>✗ Meat products without certificates in many countries</li>
                <li>✗ Unlabeled homemade food not recommended</li>
                <li>⚠️ Australia: strict biosecurity fines possible</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Link href="/country-rules"><Button size="lg" variant="outline">Check Country-Specific Rules →</Button></Link>
        </div>
      </div>
    </div>
  );
}
