import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DEMO_USER, DEMO_TRIPS, DEMO_SHIPMENTS, DEMO_MESSAGES } from "@/lib/data";
import { formatDate, getInitials } from "@/lib/utils";

const QUICK_ACTIONS = [
  { icon: "✈️", label: "Post a Trip", href: "/trips/new", color: "blue" },
  { icon: "📦", label: "Send an Item", href: "/send-item", color: "teal" },
  { icon: "🎫", label: "Seek Sponsorship", href: "/sponsored-ticket", color: "amber" },
  { icon: "🔍", label: "Find Traveler", href: "/find-traveler", color: "purple" },
];

const ACTIVE_BOOKINGS = [
  { id: "b1", type: "send", route: "London → Dhaka", item: "Samsung Galaxy S24", traveler: "Arif Rahman", status: "Pickup Scheduled", date: "2026-07-15", fee: 45 },
  { id: "b2", type: "carry", route: "Dubai → Toronto", item: "Leather Wallets x3", sender: "Carlos M.", status: "In Transit", date: "2026-07-22", fee: 30 },
];

const STATUS_COLOR: Record<string, string> = {
  "Pickup Scheduled": "warning",
  "In Transit": "default",
  "Delivered": "success",
  "Escrow Pending": "warning",
  "Requested": "secondary",
  "Completed": "success",
  "Disputed": "danger",
};

export default function DashboardPage() {
  const user = DEMO_USER;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name.split(" ")[0]}! 👋</h1>
          <p className="text-gray-500 mt-0.5">Here's what's happening with your CarryBridge account.</p>
        </div>
        <Badge variant="success" className="text-sm">✓ KYC Full</Badge>
      </div>

      {/* Pending alerts */}
      {user.pendingActions > 0 && (
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <div className="font-bold text-amber-900">You have {user.pendingActions} pending actions</div>
              <div className="text-sm text-amber-700">Respond to booking requests and complete your profile for better match scores.</div>
            </div>
          </div>
          <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white flex-shrink-0">View Actions</Button>
        </div>
      )}

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Trust Score", value: `${user.trustScore}/100`, icon: "🛡️", color: "blue", sub: "Excellent" },
          { label: "Rating", value: `⭐ ${user.rating}`, icon: "⭐", color: "amber", sub: `${user.reviews} reviews` },
          { label: "Completion Rate", value: `${user.completionRate}%`, icon: "✅", color: "green", sub: "All deliveries" },
          { label: "Active Bookings", value: user.activeBookings, icon: "📋", color: "teal", sub: "In progress" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
              <div className="text-xs text-blue-600 font-medium mt-1">{stat.sub}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {QUICK_ACTIONS.map((action) => (
            <Link key={action.label} href={action.href}>
              <div className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group">
                <div className="text-3xl mb-2">{action.icon}</div>
                <div className="text-sm font-semibold text-gray-700 group-hover:text-blue-600">{action.label}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Active bookings */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-gray-900">Active Bookings</h2>
                <Link href="/dashboard/bookings"><Button variant="ghost" size="sm">View All →</Button></Link>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {ACTIVE_BOOKINGS.map((b, i) => (
                <div key={b.id} className={`px-5 py-4 flex items-center gap-4 ${i > 0 ? "border-t border-gray-100" : ""}`}>
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl flex-shrink-0">
                    {b.type === "send" ? "📦" : "✈️"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-gray-900 truncate">{b.item}</div>
                    <div className="text-xs text-gray-500">{b.route} · {formatDate(b.date)}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <Badge variant={STATUS_COLOR[b.status] as any || "secondary"}>{b.status}</Badge>
                    <div className="text-xs text-gray-500 mt-1">${b.fee}</div>
                  </div>
                </div>
              ))}
              {ACTIVE_BOOKINGS.length === 0 && (
                <div className="p-8 text-center text-gray-400">
                  <div className="text-4xl mb-2">📋</div>
                  <div className="text-sm">No active bookings yet</div>
                  <Link href="/find-traveler"><Button size="sm" className="mt-3">Find a Traveler</Button></Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent messages */}
        <div>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-gray-900">Messages</h2>
                <Link href="/dashboard/messages"><Button variant="ghost" size="sm">View All →</Button></Link>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {DEMO_MESSAGES.map((msg, i) => (
                <div key={msg.id} className={`px-5 py-3 flex items-start gap-3 cursor-pointer hover:bg-gray-50 transition-colors ${i > 0 ? "border-t border-gray-100" : ""}`}>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-blue-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {getInitials(msg.sender)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-bold text-gray-900">{msg.sender}</span>
                      <span className="text-xs text-gray-400">{msg.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{msg.text}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* KYC Banner */}
      <Card className="bg-gradient-to-r from-blue-50 to-teal-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="text-4xl">🔐</div>
              <div>
                <div className="font-bold text-gray-900 mb-1">Identity Verification — Complete</div>
                <div className="text-sm text-gray-500">Your KYC is fully approved. You're eligible for all CarryBridge features including escrow and sponsorship.</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="success">✓ Email Verified</Badge>
              <Badge variant="success">✓ Phone Verified</Badge>
              <Badge variant="success">✓ ID Approved</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trusted Trips preview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Suggested Trips For You</h2>
          <Link href="/find-traveler"><Button variant="ghost" size="sm">View All →</Button></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DEMO_TRIPS.slice(0, 2).map((trip) => (
            <div key={trip.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4 hover:shadow-sm transition-shadow">
              <div className="text-3xl">✈️</div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm text-gray-900">{trip.from.city} → {trip.to.city}</div>
                <div className="text-xs text-gray-500">{formatDate(trip.departureDate)} · {trip.freeKg}kg free · ${trip.compensationMin}–${trip.compensationMax}</div>
                <div className="flex items-center gap-1 mt-1">
                  <Badge variant="success" className="text-xs">✓ Verified</Badge>
                  <span className="text-xs text-gray-500">⭐ {trip.traveler.rating}</span>
                </div>
              </div>
              <Link href={`/trips/${trip.id}`}><Button size="sm" variant="outline">View</Button></Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
