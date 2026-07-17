"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, Textarea } from "@/components/ui/input";

export default function DisputesPage() {
  const [showNew, setShowNew] = useState(false);
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dispute Center ⚖️</h1>
        <Button variant="danger" onClick={() => setShowNew(!showNew)}>+ Open Dispute</Button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm text-blue-900">
        <strong>How Disputes Work:</strong> File a dispute for any booking issue. Our compliance team reviews all evidence within 48 hours. Escrow is frozen during dispute review. Resolution may include full/partial refund, platform penalty, or account suspension of the offending party.
      </div>

      {showNew && (
        <Card className="border-red-200">
          <CardContent className="p-5 space-y-4">
            <h3 className="font-bold text-red-900">Open a New Dispute</h3>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
              ⚠️ Only file disputes for genuine issues. False/malicious disputes will result in account warning or suspension.
            </div>
            <Select label="Booking ID *" options={[{value:"B-1042",label:"B-1042 — Samsung Galaxy (In Progress)"},{value:"B-1039",label:"B-1039 — Leather Wallets (In Transit)"}]} placeholder="Select booking" />
            <Select label="Dispute Type *" options={[{value:"non_delivery",label:"Item not delivered"},{value:"fraud",label:"Fraud / Misrepresentation"},{value:"damage",label:"Item damaged"},{value:"payment",label:"Payment dispute"},{value:"customs",label:"Customs / Declaration issue"},{value:"prohibited",label:"Prohibited or illegal item attempted"},{value:"other",label:"Other"}]} placeholder="Select dispute type" />
            <Textarea label="Describe the issue *" placeholder="Provide all relevant details. Include dates, amounts, and what happened. Be specific." rows={5} />
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-5 text-center text-sm text-gray-500">
              📎 Upload Evidence (screenshots, photos, messages) — JPG/PNG/PDF up to 10MB each
              <Button variant="outline" size="sm" className="mt-2 block mx-auto">Choose Files</Button>
            </div>
            <div className="flex gap-3">
              <Button variant="danger">Submit Dispute</Button>
              <Button variant="ghost" onClick={() => setShowNew(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {[{ id: "D-499", booking: "B-1020", type: "Non-delivery", status: "resolved", resolution: "Full refund processed", date: "May 2026" }].map((d) => (
          <Card key={d.id}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-2">
                <div className="font-bold text-gray-900">{d.id} — {d.type}</div>
                <Badge variant={d.status === "resolved" ? "success" : "warning"}>{d.status}</Badge>
              </div>
              <div className="text-sm text-gray-500 mb-2">Booking {d.booking} · {d.date}</div>
              {d.resolution && <div className="text-sm text-green-700 bg-green-50 rounded-lg p-2">✓ Resolution: {d.resolution}</div>}
            </CardContent>
          </Card>
        ))}
        <div className="text-center py-8 text-gray-400 text-sm">No open disputes. This is a good sign! 🎉</div>
      </div>
    </div>
  );
}
