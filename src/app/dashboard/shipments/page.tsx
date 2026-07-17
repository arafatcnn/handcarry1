import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DEMO_SHIPMENTS } from "@/lib/data";

export default function MyShipmentsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Shipments</h1>
        <Link href="/send-item"><Button>+ Post Shipment</Button></Link>
      </div>
      {DEMO_SHIPMENTS.map((s) => (
        <Card key={s.id}>
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-gray-900">{s.title}</span>
                  {s.highRisk && <Badge variant="danger">⚠️ High Value</Badge>}
                </div>
                <div className="text-sm text-gray-500">{s.from.city} → {s.to.city} · {s.weight}kg · ${s.declaredValue} declared</div>
                <div className="flex gap-2 mt-2">
                  <Badge>{s.category}</Badge>
                  <span className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">Offer: ${s.offerPrice}</span>
                  {s.invoiceUploaded && <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">✓ Invoice</span>}
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">View Matches</Button>
                <Button size="sm" variant="ghost">Edit</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
