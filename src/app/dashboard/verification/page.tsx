import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function VerificationPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Verification Center 🔐</h1>

      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-5 flex items-center gap-4">
          <div className="text-4xl">✅</div>
          <div>
            <div className="font-bold text-green-900">Full KYC Verified</div>
            <div className="text-sm text-green-700">Your identity is fully verified. You have access to all CarryBridge features.</div>
          </div>
          <Badge variant="success" className="ml-auto">KYC Full</Badge>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: "📧", label: "Email Verified", status: "approved", date: "March 2025" },
          { icon: "📱", label: "Phone Verified (+44 7xxx)", status: "approved", date: "March 2025" },
          { icon: "🪪", label: "Passport (UK)", status: "approved", date: "March 2025", expires: "Dec 2032" },
          { icon: "🤳", label: "Selfie Match", status: "approved", date: "March 2025" },
          { icon: "🏠", label: "Address Proof", status: "not_submitted", date: null },
          { icon: "🔍", label: "Background Check", status: "not_submitted", date: null },
        ].map((v) => (
          <Card key={v.label} className={v.status === "approved" ? "border-green-200" : "border-gray-200"}>
            <CardContent className="p-4 flex items-center gap-4">
              <span className="text-2xl">{v.icon}</span>
              <div className="flex-1">
                <div className="font-semibold text-sm text-gray-900">{v.label}</div>
                {v.date && <div className="text-xs text-gray-500">Verified {v.date}{v.expires ? ` · Expires ${v.expires}` : ""}</div>}
              </div>
              {v.status === "approved" ? (
                <Badge variant="success">✓ Approved</Badge>
              ) : (
                <Button size="sm" variant="outline" className="text-xs">Submit →</Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><h2 className="font-bold text-gray-900">How KYC Protects You</h2></CardHeader>
        <CardContent className="p-5">
          <div className="space-y-3 text-sm text-gray-600">
            {[
              "KYC ensures every person you transact with is who they claim to be",
              "Reduces fraud, scams, and fake listings significantly",
              "Required for escrow payments and sponsorship workflows",
              "Your documents are encrypted and never shared with other users",
              "One-time verification — valid for 2 years then renewal required",
            ].map((p) => <p key={p} className="flex gap-2"><span className="text-blue-500">→</span>{p}</p>)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
