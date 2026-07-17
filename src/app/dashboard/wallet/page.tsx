import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const TRANSACTIONS = [
  { id: "T-2001", type: "escrow_held", label: "Escrow Held — B-1042", amount: -45, currency: "USD", date: "2026-06-24", status: "held", note: "Samsung Galaxy S24 carry fee" },
  { id: "T-2000", type: "payout", label: "Payout — B-1031", amount: 36, currency: "USD", date: "2026-06-28", status: "completed", note: "After 10% platform fee on $40" },
  { id: "T-1998", type: "payout", label: "Payout — B-1028", amount: 49.5, currency: "USD", date: "2026-06-10", status: "completed", note: "After 10% platform fee on $55" },
  { id: "T-1995", type: "refund", label: "Refund — B-1020", amount: 40, currency: "USD", date: "2026-05-21", status: "completed", note: "Booking cancelled before pickup" },
  { id: "T-1990", type: "platform_fee", label: "Platform Fee — B-1031", amount: -4, currency: "USD", date: "2026-06-28", status: "completed", note: "10% of $40" },
];

export default function WalletPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Wallet & Payments</h1>

      {/* Balance cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0">
          <CardContent className="p-5">
            <div className="text-xs text-blue-200 mb-1">Available Balance</div>
            <div className="text-3xl font-bold">$85.50</div>
            <div className="text-xs text-blue-200 mt-1">USD · Ready to withdraw</div>
            <Button size="sm" className="mt-4 bg-white text-blue-700 hover:bg-blue-50 border-0 font-bold">Withdraw →</Button>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-500 to-orange-500 text-white border-0">
          <CardContent className="p-5">
            <div className="text-xs text-amber-100 mb-1">In Escrow (Held)</div>
            <div className="text-3xl font-bold">$45.00</div>
            <div className="text-xs text-amber-100 mt-1">Released on delivery confirmation</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-600 to-teal-600 text-white border-0">
          <CardContent className="p-5">
            <div className="text-xs text-green-100 mb-1">Total Earned (All Time)</div>
            <div className="text-3xl font-bold">$220.50</div>
            <div className="text-xs text-green-100 mt-1">After platform fees</div>
          </CardContent>
        </Card>
      </div>

      {/* Escrow Architecture Info */}
      <Card>
        <CardHeader>
          <h2 className="font-bold text-gray-900">🔐 How CarryBridge Escrow Works</h2>
        </CardHeader>
        <CardContent className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: "💳", step: "1", title: "Sender Pays", desc: "Agreed fee deposited into escrow" },
              { icon: "🛡️", step: "2", title: "Funds Held", desc: "Secure until delivery confirmed" },
              { icon: "✅", step: "3", title: "OTP Delivery", desc: "Recipient confirms via OTP or QR" },
              { icon: "💰", step: "4", title: "Traveler Paid", desc: "Funds released minus platform fee" },
            ].map((s) => (
              <div key={s.step} className="bg-gray-50 rounded-xl p-4">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-xs font-bold text-gray-700 mb-0.5">{s.title}</div>
                <div className="text-xs text-gray-500">{s.desc}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs text-gray-500 text-center">Powered by Stripe · Platform fee: 10–15% deducted before payout</div>
        </CardContent>
      </Card>

      {/* Payment methods */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-gray-900">Payment Methods</h2>
            <Button size="sm" variant="outline">+ Add Method</Button>
          </div>
        </CardHeader>
        <CardContent className="p-5">
          <div className="space-y-3">
            {[
              { type: "Visa", last4: "4242", expiry: "09/27", default: true },
              { type: "PayPal", last4: "jordan@example.com", expiry: null, default: false },
            ].map((pm) => (
              <div key={pm.last4} className="flex items-center gap-3 border border-gray-200 rounded-lg p-3">
                <div className="w-10 h-7 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">{pm.type[0]}</div>
                <div className="flex-1">
                  <div className="font-medium text-sm text-gray-900">{pm.type} •••• {pm.last4}</div>
                  {pm.expiry && <div className="text-xs text-gray-500">Expires {pm.expiry}</div>}
                </div>
                {pm.default && <Badge variant="success" className="text-xs">Default</Badge>}
                <button className="text-xs text-gray-400 hover:text-red-500">Remove</button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transaction history */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-gray-900">Transaction History</h2>
            <Button size="sm" variant="ghost">Export CSV</Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {["Date","Description","Amount","Status"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TRANSACTIONS.map((tx) => (
                <tr key={tx.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-5 py-3 text-xs text-gray-500">{tx.date}</td>
                  <td className="px-5 py-3">
                    <div className="text-sm text-gray-900">{tx.label}</div>
                    <div className="text-xs text-gray-400">{tx.note}</div>
                  </td>
                  <td className={`px-5 py-3 text-sm font-bold ${tx.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                    {tx.amount > 0 ? "+" : ""}{tx.amount} {tx.currency}
                  </td>
                  <td className="px-5 py-3">
                    <Badge variant={tx.status === "completed" ? "success" : tx.status === "held" ? "warning" : "secondary"}>
                      {tx.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
