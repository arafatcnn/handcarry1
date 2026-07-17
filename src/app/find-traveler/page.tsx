"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Select } from "@/components/ui/input";
import TripCard from "@/components/shared/TripCard";
import { DEMO_TRIPS, ITEM_CATEGORIES } from "@/lib/data";

const COUNTRY_OPTIONS = [
  { value: "BD", label: "🇧🇩 Bangladesh" },
  { value: "GB", label: "🇬🇧 United Kingdom" },
  { value: "AE", label: "🇦🇪 UAE / Dubai" },
  { value: "CA", label: "🇨🇦 Canada" },
  { value: "IN", label: "🇮🇳 India" },
  { value: "AU", label: "🇦🇺 Australia" },
  { value: "TR", label: "🇹🇷 Turkey" },
  { value: "US", label: "🇺🇸 United States" },
  { value: "MY", label: "🇲🇾 Malaysia" },
  { value: "QA", label: "🇶🇦 Qatar" },
  { value: "FR", label: "🇫🇷 France" },
  { value: "SG", label: "🇸🇬 Singapore" },
];

export default function FindTravelerPage() {
  const [filters, setFilters] = useState({
    from: "", to: "", date: "", category: "", minKg: "", maxFee: "", verifiedOnly: false, sponsorshipOk: false,
  });
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("date");

  const filtered = DEMO_TRIPS.filter((t) => {
    if (filters.from && t.from.code !== filters.from) return false;
    if (filters.to && t.to.code !== filters.to) return false;
    if (filters.category && !t.allowedCategories.some((c) => c.includes(filters.category))) return false;
    if (filters.verifiedOnly && !t.traveler.verified) return false;
    if (filters.sponsorshipOk && !t.ticketSponsorship) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-teal-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="warning" className="mb-3">Live Listings</Badge>
          <h1 className="text-3xl font-bold mb-2">Find a Traveler</h1>
          <p className="text-blue-100">Browse verified travelers with available luggage space on your route.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* ── FILTER SIDEBAR ── */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-5">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  🔍 Filter Trips
                  <button onClick={() => setFilters({ from:"",to:"",date:"",category:"",minKg:"",maxFee:"",verifiedOnly:false,sponsorshipOk:false })} className="ml-auto text-xs text-blue-600 hover:underline">Reset</button>
                </h3>
                <div className="space-y-4">
                  <Select
                    label="From Country"
                    options={COUNTRY_OPTIONS}
                    placeholder="Any country"
                    value={filters.from}
                    onChange={(e) => setFilters({...filters, from: e.target.value})}
                  />
                  <Select
                    label="To Country"
                    options={COUNTRY_OPTIONS}
                    placeholder="Any country"
                    value={filters.to}
                    onChange={(e) => setFilters({...filters, to: e.target.value})}
                  />
                  <Input
                    type="date"
                    label="Departure Date"
                    value={filters.date}
                    onChange={(e) => setFilters({...filters, date: e.target.value})}
                  />
                  <Select
                    label="Item Category"
                    options={ITEM_CATEGORIES.map((c) => ({ value: c, label: c }))}
                    placeholder="Any category"
                    value={filters.category}
                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                  />
                  <Input
                    type="number"
                    label="Min. Available Space (kg)"
                    placeholder="e.g. 5"
                    value={filters.minKg}
                    onChange={(e) => setFilters({...filters, minKg: e.target.value})}
                  />
                  <Input
                    type="number"
                    label="Max Fee (USD)"
                    placeholder="e.g. 100"
                    value={filters.maxFee}
                    onChange={(e) => setFilters({...filters, maxFee: e.target.value})}
                  />
                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input type="checkbox" className="rounded" checked={filters.verifiedOnly} onChange={(e) => setFilters({...filters, verifiedOnly: e.target.checked})} />
                    KYC Verified Only
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input type="checkbox" className="rounded" checked={filters.sponsorshipOk} onChange={(e) => setFilters({...filters, sponsorshipOk: e.target.checked})} />
                    Open to Ticket Sponsorship
                  </label>
                </div>

                {/* Safety notice */}
                <div className="mt-5 bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
                  ⚠️ Always request item inspection and full declaration before any pickup. Never carry sealed unknown packages.
                </div>

                {/* Alert CTA */}
                <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium border border-blue-200 rounded-lg py-2 hover:bg-blue-50 transition-colors">
                  🔔 Save This Route Alert
                </button>
              </CardContent>
            </Card>
          </div>

          {/* ── RESULTS ── */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="font-semibold text-gray-900">{filtered.length} trips found</span>
                <span className="text-sm text-gray-500 ml-2">matching your criteria</span>
              </div>
              <div className="flex items-center gap-3">
                <select
                  className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="date">Sort: Departure Date</option>
                  <option value="rating">Sort: Rating</option>
                  <option value="space">Sort: Most Space</option>
                  <option value="fee">Sort: Lowest Fee</option>
                </select>
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button onClick={() => setView("grid")} className={`p-1.5 px-2 ${view === "grid" ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}>⊞</button>
                  <button onClick={() => setView("list")} className={`p-1.5 px-2 ${view === "list" ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}>☰</button>
                </div>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">✈️</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No trips found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or save a route alert to get notified when a matching trip is posted.</p>
                <Button onClick={() => setFilters({ from:"",to:"",date:"",category:"",minKg:"",maxFee:"",verifiedOnly:false,sponsorshipOk:false })}>Clear Filters</Button>
              </div>
            ) : (
              <div className={view === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-4"}>
                {filtered.map((trip) => (
                  <TripCard key={trip.id} trip={trip} compact={view === "list"} />
                ))}
              </div>
            )}

            {/* Post trip CTA */}
            <Card className="mt-8 bg-gradient-to-r from-blue-50 to-teal-50 border-blue-200">
              <CardContent className="p-6 text-center">
                <div className="text-2xl mb-2">✈️</div>
                <h3 className="font-bold text-gray-900 mb-2">Are you a traveler with space?</h3>
                <p className="text-sm text-gray-500 mb-4">Post your trip listing and earn money from your empty luggage on your next flight.</p>
                <a href="/trips/new" className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">Post Your Trip →</a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
