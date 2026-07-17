"use client";
import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Select, Textarea } from "@/components/ui/input";
import SponsorshipCard from "@/components/shared/SponsorshipCard";
import { DEMO_SPONSORSHIPS } from "@/lib/data";

const MILESTONE_STATUSES = [
  { key: "fund_pending", label: "Fund Pending", icon: "⏳", desc: "Sponsor reviewing application" },
  { key: "funded", label: "Funded", icon: "💳", desc: "Ticket payment confirmed in escrow" },
  { key: "ticket_purchased", label: "Ticket Purchased", icon: "🎫", desc: "Ticket proof uploaded" },
  { key: "checkin_confirmed", label: "Check-in Confirmed", icon: "✈️", desc: "Boarding pass verified" },
  { key: "in_transit", label: "In Transit", icon: "🌍", desc: "Flight departed" },
  { key: "delivered", label: "Delivered", icon: "✅", desc: "Items delivered, OTP confirmed" },
  { key: "completed", label: "Completed", icon: "🏆", desc: "All milestones complete" },
];

export default function SponsoredTicketPage() {
  const [activeTab, setActiveTab] = useState<"browse" | "request" | "offer">("browse");
  const [typeFilter, setTypeFilter] = useState<"all" | "request" | "offer">("all");

  const filtered = DEMO_SPONSORSHIPS.filter((s) => typeFilter === "all" || s.type === typeFilter);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-amber-600 to-orange-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge className="mb-3 bg-white/20 text-white border-white/30">🎫 Travel Sponsorship</Badge>
          <h1 className="text-3xl font-bold mb-2">Sponsored Travel Marketplace</h1>
          <p className="text-amber-100 max-w-2xl">Get your flight funded in exchange for carrying legal, declared cargo — or find a verified traveler to carry your goods on a route you're funding.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* How Sponsorship Works */}
        <div className="bg-white border border-amber-200 rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-gray-900 mb-5 text-lg">How Sponsorship Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="font-semibold text-amber-700 mb-3">🧳 For Travelers Seeking Sponsorship</div>
              <ol className="space-y-2 text-sm text-gray-600">
                {["Post your desired route, dates, and cargo capacity","Sponsors review your profile and KYC verification","Accept a sponsor offer and agree on cargo terms","All cargo must be declared and inspected before pickup","Ticket funded via escrow — released in milestones","Complete delivery → funds released in full"].map((s,i) => (
                  <li key={i} className="flex gap-2"><span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex-shrink-0 flex items-center justify-center text-xs font-bold">{i+1}</span>{s}</li>
                ))}
              </ol>
            </div>
            <div>
              <div className="font-semibold text-purple-700 mb-3">💼 For Sponsors / Cargo Owners</div>
              <ol className="space-y-2 text-sm text-gray-600">
                {["Post your cargo route, weight, categories, and ticket budget","Review verified traveler applications","Select traveler based on rating, verification, and fit","Open cargo inspection by traveler is mandatory","Fund ticket through escrow with milestone structure","Delivery OTP confirmation triggers final payment"].map((s,i) => (
                  <li key={i} className="flex gap-2"><span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex-shrink-0 flex items-center justify-center text-xs font-bold">{i+1}</span>{s}</li>
                ))}
              </ol>
            </div>
          </div>
          <div className="mt-5 bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-800">
            🔐 <strong>Safety requirement:</strong> All sponsored travel cargo must be fully declared, invoiced, photographed, and physically inspected by the traveler before pickup. No sealed, unknown, or undeclared packages. Both parties must pass KYC verification before funds are released.
          </div>
        </div>

        {/* Milestone Tracker */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-gray-900 mb-5">📍 Sponsorship Milestone System</h2>
          <div className="flex overflow-x-auto gap-2 pb-2">
            {MILESTONE_STATUSES.map((m, i) => (
              <div key={m.key} className="flex items-center flex-shrink-0">
                <div className={`text-center ${i === 1 ? "opacity-100" : "opacity-50"}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg mx-auto ${i === 1 ? "bg-amber-500 shadow-md" : "bg-gray-100"}`}>{m.icon}</div>
                  <div className="text-xs font-bold text-gray-900 mt-1 whitespace-nowrap">{m.label}</div>
                  <div className="text-xs text-gray-500 max-w-20">{m.desc}</div>
                </div>
                {i < MILESTONE_STATUSES.length - 1 && <div className="w-8 h-0.5 bg-gray-200 mx-1 flex-shrink-0" />}
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6 gap-1">
          {([["browse","🔍 Browse Listings"],["request","🧳 Post as Traveler"],["offer","💼 Post as Sponsor"]] as [string,string][]).map(([tab,label]) => (
            <button key={tab} onClick={() => setActiveTab(tab as typeof activeTab)} className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === tab ? "border-amber-500 text-amber-700" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
              {label}
            </button>
          ))}
        </div>

        {activeTab === "browse" && (
          <div>
            <div className="flex gap-2 mb-6">
              {([["all","All Listings"],["request","Travelers Seeking Sponsors"],["offer","Sponsors Seeking Travelers"]] as [string,string][]).map(([f,l]) => (
                <button key={f} onClick={() => setTypeFilter(f as typeof typeFilter)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${typeFilter === f ? "bg-amber-600 text-white" : "bg-white text-gray-600 border border-gray-300 hover:border-amber-400"}`}>{l}</button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((s) => <SponsorshipCard key={s.id} item={s} />)}
            </div>
          </div>
        )}

        {activeTab === "request" && (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-6 space-y-5">
                <div className="text-center mb-4">
                  <div className="text-3xl mb-2">🧳</div>
                  <h2 className="font-bold text-gray-900 text-xl">Post a Sponsorship Request</h2>
                  <p className="text-sm text-gray-500">Tell sponsors your route, capacity, and what kind of cargo you can carry.</p>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
                  ✅ Only verified users (KYC approved) can post sponsorship requests. Your profile, ratings, and completion rate will be visible to sponsors.
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Origin City *" placeholder="Dhaka" />
                  <Input label="Destination City *" placeholder="London" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input type="date" label="Earliest Travel Date" />
                  <Input type="date" label="Latest Travel Date" />
                </div>
                <Input type="number" label="Max Cargo Capacity (kg) *" placeholder="e.g. 15" />
                <Select label="Accepted Item Categories *" options={[{value:"clothing",label:"Clothing & Fashion"},{value:"electronics",label:"Electronics"},{value:"documents",label:"Documents"},{value:"food",label:"Food (dry, sealed)"},{value:"cosmetics",label:"Cosmetics"},{value:"jewelry",label:"Jewelry (declared)"}]} placeholder="Select categories (multi)" />
                <Input type="number" label="Full Ticket Budget Needed (USD) *" placeholder="e.g. 850" />
                <label className="flex gap-2 text-sm text-gray-700 cursor-pointer">
                  <input type="checkbox" className="mt-0.5 rounded" />
                  I'm open to partial ticket sponsorship
                </label>
                <Textarea label="About You & Your Offer" placeholder="Describe your carrier experience, previous deliveries, and any special notes about your capacity." rows={4} />
                <div className="space-y-2">
                  {["I confirm I will inspect all cargo physically before pickup","I will not carry any sealed or unknown packages","All items I carry will be fully declared at customs","I am 18+ and my identity will be verified before booking"].map((t) => (
                    <label key={t} className="flex gap-2 text-sm text-gray-700 cursor-pointer">
                      <input type="checkbox" className="mt-0.5 rounded flex-shrink-0" />
                      <span>{t}</span>
                    </label>
                  ))}
                </div>
                <Button className="w-full" size="lg">Post Sponsorship Request →</Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "offer" && (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-6 space-y-5">
                <div className="text-center mb-4">
                  <div className="text-3xl mb-2">💼</div>
                  <h2 className="font-bold text-gray-900 text-xl">Post a Sponsorship Offer</h2>
                  <p className="text-sm text-gray-500">Describe your cargo route and budget to attract verified traveler applications.</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                  ✅ All cargo in sponsorship deals must be fully declared, photographed, and available for inspection. No exceptions. Sponsors who misrepresent cargo will be permanently banned.
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Origin City *" placeholder="Dubai" />
                  <Input label="Destination City *" placeholder="Toronto" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input type="date" label="Earliest Travel Date" />
                  <Input type="date" label="Latest Travel Date" />
                </div>
                <Input type="number" label="Cargo Weight (kg) *" placeholder="e.g. 15" />
                <Select label="Cargo Category *" options={[{value:"electronics",label:"Electronics (phones, devices)"},{value:"clothing",label:"Clothing & Fashion"},{value:"documents",label:"Documents"},{value:"cosmetics",label:"Cosmetics"},{value:"food",label:"Food (dry, sealed, packaged)"},{value:"jewelry",label:"Jewelry (declared)"}]} placeholder="Select" />
                <Textarea label="Cargo Description *" placeholder="Describe items clearly: brand, model, quantity, declared value, invoices available." rows={4} />
                <Input type="number" label="Ticket Budget You'll Fund (USD) *" placeholder="e.g. 1200" />
                <label className="flex gap-2 text-sm text-gray-700 cursor-pointer">
                  <input type="checkbox" className="mt-0.5 rounded" />
                  I'm open to funding only partial ticket cost
                </label>
                <div className="space-y-2">
                  {["All cargo is legally purchased and properly invoiced","I will provide full item access for traveler inspection","I accept that the traveler may decline any item","Ticket funding will be placed in escrow before carrier accepts","I agree to CarryBridge Sponsor Terms and Liability Policy"].map((t) => (
                    <label key={t} className="flex gap-2 text-sm text-gray-700 cursor-pointer">
                      <input type="checkbox" className="mt-0.5 rounded flex-shrink-0" />
                      <span>{t}</span>
                    </label>
                  ))}
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700" size="lg">Post Sponsor Offer →</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
