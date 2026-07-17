"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input, Select, Textarea } from "@/components/ui/input";
import { DEMO_USER } from "@/lib/data";
import { getInitials } from "@/lib/utils";

export default function ProfilePage() {
  const user = DEMO_USER;
  const [editing, setEditing] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <Button variant="outline" onClick={() => setEditing(!editing)}>
          {editing ? "Cancel" : "✏️ Edit Profile"}
        </Button>
      </div>

      {/* Profile hero */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-6 flex-wrap">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center text-white font-bold text-2xl">
                {getInitials(user.name)}
              </div>
              <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs hover:bg-blue-700">✏️</button>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                <Badge variant="success">✓ KYC Full</Badge>
                <Badge variant="default">🌍 {user.country}</Badge>
              </div>
              <div className="text-gray-500 text-sm mt-1">{user.email}</div>
              <div className="flex gap-4 mt-3 flex-wrap">
                {[
                  { label: "Rating", value: `⭐ ${user.rating}` },
                  { label: "Reviews", value: user.reviews },
                  { label: "Trust Score", value: `${user.trustScore}/100` },
                  { label: "Completion", value: `${user.completionRate}%` },
                  { label: "Member Since", value: "March 2025" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="font-bold text-gray-900">{s.value}</div>
                    <div className="text-xs text-gray-500">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trust progress */}
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Completion Rate", value: user.completionRate, max: 100, color: "green" },
              { label: "Cancellation Rate", value: user.cancellationRate, max: 100, color: "red", invert: true },
              { label: "Trust Score", value: user.trustScore, max: 100, color: "blue" },
            ].map((metric) => (
              <div key={metric.label}>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>{metric.label}</span>
                  <span className="font-bold">{metric.value}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full bg-${metric.color}-500`} style={{ width: `${metric.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Verification Center */}
      <Card>
        <CardHeader><h2 className="font-bold text-gray-900">🔐 Verification Status</h2></CardHeader>
        <CardContent className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { label: "Email Verified", status: true, icon: "📧" },
              { label: "Phone Verified", status: true, icon: "📱" },
              { label: "Government ID", status: true, icon: "🪪" },
              { label: "Selfie Match", status: true, icon: "🤳" },
              { label: "Address Proof", status: false, icon: "🏠" },
              { label: "Background Check", status: false, icon: "🔍" },
            ].map((v) => (
              <div key={v.label} className={`flex items-center gap-3 rounded-lg p-3 border ${v.status ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"}`}>
                <span className="text-xl">{v.icon}</span>
                <div className="flex-1">
                  <div className="font-medium text-sm text-gray-900">{v.label}</div>
                </div>
                {v.status ? (
                  <Badge variant="success">✓ Verified</Badge>
                ) : (
                  <Button size="sm" variant="outline" className="text-xs">Add →</Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit form */}
      {editing && (
        <Card>
          <CardHeader><h2 className="font-bold text-gray-900">Edit Profile Information</h2></CardHeader>
          <CardContent className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Full Name" defaultValue={user.name} />
              <Input label="Display Name" defaultValue={user.name.split(" ")[0]} />
            </div>
            <Textarea label="Bio" placeholder="Tell travelers and senders about yourself, your travel experience, and your commitment to safe, legal transport." rows={3} />
            <Select label="Preferred Language" options={[{value:"en",label:"English"},{value:"ar",label:"Arabic"},{value:"bn",label:"Bangla"},{value:"hi",label:"Hindi"},{value:"fr",label:"French"},{value:"es",label:"Spanish"},{value:"tr",label:"Turkish"}]} defaultValue="en" />
            <Select label="Preferred Currency" options={[{value:"USD",label:"USD - US Dollar"},{value:"GBP",label:"GBP - British Pound"},{value:"EUR",label:"EUR - Euro"},{value:"BDT",label:"BDT - Bangladeshi Taka"},{value:"AED",label:"AED - UAE Dirham"},{value:"INR",label:"INR - Indian Rupee"}]} defaultValue="USD" />
            <div className="flex gap-3 pt-2">
              <Button onClick={() => setEditing(false)}>Save Changes</Button>
              <Button variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews preview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-gray-900">Recent Reviews</h2>
            <Button variant="ghost" size="sm">View All →</Button>
          </div>
        </CardHeader>
        <CardContent className="p-5 space-y-4">
          {[
            { from: "Arif Rahman", role: "Traveler", rating: 5, text: "Excellent sender. Item perfectly packed, invoice included, no issues at customs. Highly recommend.", date: "June 2026" },
            { from: "Sophie Martin", role: "Traveler", rating: 5, text: "Very responsive, professional, and item exactly as described. Would carry for Jordan again.", date: "May 2026" },
          ].map((r) => (
            <div key={r.from} className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-bold text-sm text-gray-900">{r.from}</span>
                  <span className="text-xs text-gray-500 ml-2">· {r.role} · {r.date}</span>
                </div>
                <div className="text-amber-400">{"★".repeat(r.rating)}</div>
              </div>
              <p className="text-sm text-gray-600">{r.text}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
