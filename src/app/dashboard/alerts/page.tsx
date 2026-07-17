"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Select } from "@/components/ui/input";

const ALERTS = [
  { id: "a1", type: "trip", from: "London", to: "Dhaka", dateFrom: "2026-07-01", dateTo: "2026-07-31", category: "Electronics", isActive: true, triggered: 3 },
  { id: "a2", type: "shipment", from: "Dubai", to: "Toronto", dateFrom: null, dateTo: null, category: "Clothing", isActive: true, triggered: 1 },
];

export default function AlertsPage() {
  const [showNew, setShowNew] = useState(false);
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Saved Route Alerts 🔔</h1>
        <Button onClick={() => setShowNew(!showNew)}>+ New Alert</Button>
      </div>
      <p className="text-gray-500 text-sm">Get notified when a trip or shipment matching your criteria is posted.</p>

      {showNew && (
        <Card>
          <CardContent className="p-5 space-y-4">
            <h3 className="font-bold text-gray-900">Create New Alert</h3>
            <Select label="Alert Type" options={[{value:"trip",label:"Trip Listings"},{value:"shipment",label:"Shipment Requests"},{value:"sponsorship",label:"Sponsorship Posts"}]} placeholder="Select type" />
            <div className="grid grid-cols-2 gap-4">
              <Input label="From City/Country" placeholder="e.g. London" />
              <Input label="To City/Country" placeholder="e.g. Dhaka" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input type="date" label="Date From" />
              <Input type="date" label="Date To" />
            </div>
            <Select label="Item Category" options={[{value:"electronics",label:"Electronics"},{value:"clothing",label:"Clothing"},{value:"documents",label:"Documents"},{value:"food",label:"Food (dry)"}]} placeholder="Any category" />
            <div className="flex gap-3">
              <Button onClick={() => setShowNew(false)}>Save Alert</Button>
              <Button variant="ghost" onClick={() => setShowNew(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {ALERTS.map((a) => (
          <Card key={a.id}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="text-2xl">{a.type === "trip" ? "✈️" : "📦"}</div>
              <div className="flex-1">
                <div className="font-semibold text-sm text-gray-900">{a.from} → {a.to}</div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {a.type === "trip" ? "Trip" : "Shipment"} · {a.category} · {a.dateFrom ? `${a.dateFrom} to ${a.dateTo}` : "Any date"}
                </div>
                <div className="text-xs text-blue-600 mt-1">🔔 Triggered {a.triggered} time(s)</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={a.isActive ? "success" : "secondary"}>{a.isActive ? "Active" : "Paused"}</Badge>
                <button className="text-xs text-red-500 hover:underline">Delete</button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
