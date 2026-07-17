import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const REVIEWS = [
  { from: "Arif Rahman", role: "Traveler", rating: 5, text: "Excellent sender. Item perfectly packed, invoice included, clear declaration. No issues at UK customs. Highly recommend.", date: "June 2026", booking: "B-1031" },
  { from: "Sophie Martin", role: "Traveler", rating: 5, text: "Very professional. Package was exactly as described, photos accurate, declared correctly. Jordan is a trusted sender.", date: "May 2026", booking: "B-1028" },
  { from: "Fatima Al-Mansouri", role: "Traveler", rating: 4, text: "Good sender, slight delay in photo upload but resolved quickly. Overall smooth process.", date: "April 2026", booking: "B-1019" },
];

export default function ReviewsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Reviews ⭐</h1>

      <div className="grid grid-cols-3 gap-4 text-center">
        {[
          { label: "Average Rating", value: "4.8", sub: "Out of 5.0" },
          { label: "Total Reviews", value: "12", sub: "All verified" },
          { label: "5-Star Reviews", value: "10", sub: "83% excellence" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
              <div className="text-xs text-blue-600 font-medium">{s.sub}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2 border-b border-gray-200 pb-0">
        {["All Reviews", "As Sender", "As Traveler"].map((tab, i) => (
          <button key={tab} className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${i === 0 ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500"}`}>{tab}</button>
        ))}
      </div>

      <div className="space-y-4">
        {REVIEWS.map((r) => (
          <Card key={r.booking}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span className="font-bold text-gray-900">{r.from}</span>
                  <span className="text-xs text-gray-500 ml-2">· {r.role} · {r.date} · {r.booking}</span>
                </div>
                <div className="text-amber-400 flex-shrink-0">{"★".repeat(r.rating)}{"☆".repeat(5-r.rating)}</div>
              </div>
              <p className="text-sm text-gray-600 mb-3">{r.text}</p>
              <button className="text-xs text-blue-600 hover:underline">Reply to this review</button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-5">
          <div className="font-bold text-blue-900 mb-2">⭐ Pending Review</div>
          <p className="text-sm text-blue-800">You have a completed booking (B-1042) waiting for your review. Leave a review to help the community and improve your trust score.</p>
          <Button size="sm" className="mt-3">Leave Review for Arif Rahman →</Button>
        </CardContent>
      </Card>
    </div>
  );
}
