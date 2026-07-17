"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

const ALL_BOOKINGS = [
  { id: "B-1042", type: "send", route: "London → Dhaka", item: "Samsung Galaxy S24 (1 unit)", traveler: "Arif Rahman", status: "Pickup Scheduled", date: "2026-07-15", fee: 45, escrow: "Held", rating: null },
  { id: "B-1039", type: "carry", route: "Dubai → Toronto", item: "Leather Wallets x3", sender: "Carlos M.", status: "In Transit", date: "2026-07-22", fee: 30, escrow: "Held", rating: null },
  { id: "B-1031", type: "send", route: "Paris → Dhaka", item: "Cosmetics (Sealed, Invoice)", traveler: "Sophie Martin", status: "Delivered", date: "2026-06-28", fee: 40, escrow: "Released", rating: 5 },
  { id: "B-1028", type: "carry", route: "Dhaka → London", item: "Clothing Bundle", sender: "Tanvir H.", status: "Completed", date: "2026-06-10", fee: 55, escrow: "Released", rating: 4 },
  { id: "B-1020", type: "send", route: "Istanbul → NYC", item: "Ceramics Gift (Fragile)", traveler: "Elif Y.", status: "Cancelled", date: "2026-05-20", fee: 0, escrow: "Refunded", rating: null },
];

const STATUS_COLORS: Record<string, any> = {
  "Pickup Scheduled": "warning",
  "In Transit": "default",
  "Delivered": "success",
  "Completed": "success",
  "Disputed": "danger",
  "Cancelled": "secondary",
  "Escrow Pending": "warning",
  "Requested": "secondary",
};

const BOOKING_WORKFLOW = [
  "Requested", "Accepted", "Escrow Pending", "Pickup Scheduled",
  "Picked Up", "In Transit", "Arrived", "Delivered", "Completed"
];

export default function BookingsPage() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = ALL_BOOKINGS.filter((b) => {
    if (filter === "active") return ["Pickup Scheduled","In Transit","Arrived","Requested","Accepted","Escrow Pending"].includes(b.status);
    if (filter === "completed") return ["Delivered","Completed"].includes(b.status);
    if (filter === "cancelled") return b.status === "Cancelled";
    return true;
  });

  const detail = selected ? ALL_BOOKINGS.find((b) => b.id === selected) : null;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
        <div className="text-sm text-gray-500">{ALL_BOOKINGS.length} total bookings</div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {[["all","All"],["active","Active"],["completed","Completed"],["cancelled","Cancelled"]].map(([f,l]) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-sm font-medium flex-shrink-0 transition-colors ${filter === f ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-300 hover:border-gray-400"}`}>{l}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="lg:col-span-2 space-y-3">
          {filtered.map((b) => (
            <Card key={b.id} className={`cursor-pointer hover:shadow-md transition-shadow ${selected === b.id ? "ring-2 ring-blue-500" : ""}`} onClick={() => setSelected(b.id)}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl flex-shrink-0">
                    {b.type === "send" ? "📦" : "✈️"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-bold text-sm text-gray-900">{b.item}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{b.route} · {formatDate(b.date)}</div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {b.type === "send" ? `Traveler: ${b.traveler}` : `Sender: ${b.sender}`}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <Badge variant={STATUS_COLORS[b.status] || "secondary"}>{b.status}</Badge>
                        <div className="text-xs text-gray-900 font-bold mt-1">${b.fee}</div>
                        <div className="text-xs text-gray-400">{b.escrow}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">{b.id}</Badge>
                      {b.rating && <span className="text-xs text-amber-500">{"★".repeat(b.rating)}</span>}
                      {!b.rating && b.status === "Delivered" && (
                        <button className="text-xs text-blue-600 hover:underline">Leave Review →</button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
              <div className="text-4xl mb-3">📋</div>
              <div className="font-semibold text-gray-900 mb-1">No bookings found</div>
              <div className="text-sm text-gray-500">Start by finding a traveler or posting a trip.</div>
            </div>
          )}
        </div>

        {/* Detail panel */}
        <div>
          {detail ? (
            <Card className="sticky top-24">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900">Booking {detail.id}</span>
                  <Badge variant={STATUS_COLORS[detail.status] || "secondary"}>{detail.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-5 space-y-4">
                {/* Progress */}
                <div>
                  <div className="text-xs font-semibold text-gray-700 mb-2">Progress</div>
                  <div className="space-y-1">
                    {BOOKING_WORKFLOW.map((s) => {
                      const currentIdx = BOOKING_WORKFLOW.indexOf(detail.status);
                      const stepIdx = BOOKING_WORKFLOW.indexOf(s);
                      const done = stepIdx < currentIdx;
                      const current = stepIdx === currentIdx;
                      return (
                        <div key={s} className={`flex items-center gap-2 text-xs ${done ? "text-green-600" : current ? "text-blue-600 font-bold" : "text-gray-400"}`}>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${done ? "bg-green-500 border-green-500" : current ? "border-blue-500" : "border-gray-300"}`}>
                            {done && <span className="text-white text-xs">✓</span>}
                          </div>
                          {s}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm">
                  {[
                    ["Item", detail.item],
                    ["Route", detail.route],
                    ["Date", formatDate(detail.date)],
                    ["Fee", `$${detail.fee}`],
                    ["Escrow", detail.escrow],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span className="text-gray-500">{k}</span>
                      <span className="font-medium text-gray-900">{v}</span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  {detail.status === "Pickup Scheduled" && (
                    <>
                      <Button size="sm" className="w-full" variant="success">✓ Confirm Item Inspected</Button>
                      <Button size="sm" className="w-full" variant="outline">💬 Message Traveler</Button>
                    </>
                  )}
                  {detail.status === "In Transit" && (
                    <Button size="sm" className="w-full" variant="outline">📍 Track Status</Button>
                  )}
                  {detail.status === "Delivered" && !detail.rating && (
                    <Button size="sm" className="w-full">⭐ Leave Review</Button>
                  )}
                  {["Requested","Accepted"].includes(detail.status) && (
                    <Button size="sm" className="w-full" variant="danger">Cancel Booking</Button>
                  )}
                </div>

                {/* Safety notice */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
                  💡 Remember: Confirm item inspection before pickup. All items must be open and visible.
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center sticky top-24">
              <div className="text-4xl mb-3">📋</div>
              <div className="text-sm text-gray-500">Select a booking to see details and actions</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
