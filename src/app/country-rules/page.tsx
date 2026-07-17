"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { COUNTRY_RULES } from "@/lib/data";

export default function CountryRulesPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = COUNTRY_RULES.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  const detail = selected ? COUNTRY_RULES.find((c) => c.code === selected) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-700 to-teal-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge className="mb-3 bg-white/20 text-white border-white/30">🌍 Compliance Center</Badge>
          <h1 className="text-3xl font-bold mb-2">Country Rules & Customs Guide</h1>
          <p className="text-green-100 max-w-2xl">Browse country-specific customs rules for hand-carry items. Electronics, food, medicine, batteries, and more.</p>
          <div className="mt-4 bg-amber-500/20 border border-amber-400/30 rounded-xl p-4 max-w-2xl text-sm text-amber-100">
            ⚠️ <strong>Advisory Only:</strong> This information is provided as general guidance and may be outdated. Always verify current rules with official government sources (customs authority, immigration, airline) before travel. CarryBridge is not liable for customs decisions.
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Country list */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Input
                placeholder="Search country..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                icon={<span>🔍</span>}
              />
            </div>
            <div className="space-y-2">
              {filtered.map((c) => (
                <button
                  key={c.code}
                  onClick={() => setSelected(c.code)}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center gap-3 ${selected === c.code ? "border-blue-500 bg-blue-50 shadow-sm" : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"}`}
                >
                  <span className="text-2xl">{c.flag}</span>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{c.name}</div>
                    <div className="text-xs text-gray-500">Threshold: {c.currency} {c.customsThreshold?.toLocaleString()}</div>
                  </div>
                  {(c.strictFood || c.strictMedicine) && (
                    <span className="ml-auto text-red-500 text-xs">⚠️</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-2">
            {!detail ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                <div className="text-5xl mb-4">🌍</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Country</h3>
                <p className="text-gray-500 text-sm">Choose a country from the list to view customs rules, duty thresholds, and category-specific guidance.</p>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Header */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-5xl">{detail.flag}</span>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{detail.name}</h2>
                        <div className="text-sm text-gray-500">ISO Code: {detail.code}</div>
                      </div>
                      {(detail.strictFood || detail.strictMedicine) && (
                        <Badge variant="danger" className="ml-auto">⚠️ High Restriction</Badge>
                      )}
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="font-semibold text-blue-900 mb-1">Duty-Free Threshold</div>
                      <div className="text-2xl font-bold text-blue-700">{detail.currency} {detail.customsThreshold?.toLocaleString()}</div>
                      <div className="text-xs text-blue-600 mt-0.5">Items above this value may attract customs duty</div>
                    </div>
                  </CardContent>
                </Card>

                {/* Rules grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: "📱", title: "Electronics & Phones", content: detail.electronics, warn: false },
                    { icon: "🍎", title: "Food & Agricultural Items", content: detail.food, warn: detail.strictFood },
                    { icon: "💊", title: "Medicine & Health Products", content: detail.medicine, warn: detail.strictMedicine },
                    { icon: "📲", title: "Phones & IMEI Rules", content: detail.phones, warn: false },
                    { icon: "🔋", title: "Lithium Batteries (IATA)", content: detail.batteries, warn: false },
                    { icon: "📝", title: "General Notes", content: detail.notes, warn: false },
                  ].map((rule) => (
                    <Card key={rule.title} className={rule.warn ? "border-red-200" : ""}>
                      <CardContent className="p-4">
                        <div className={`flex items-center gap-2 mb-2 font-bold text-sm ${rule.warn ? "text-red-800" : "text-gray-900"}`}>
                          <span>{rule.icon}</span>{rule.title}
                          {rule.warn && <Badge variant="danger" className="ml-auto text-xs">Strict</Badge>}
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">{rule.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Restricted items */}
                <Card className="border-red-200">
                  <CardContent className="p-5">
                    <div className="font-bold text-red-900 mb-3 flex items-center gap-2">🚫 Restricted / Prohibited Items</div>
                    <div className="flex flex-wrap gap-2">
                      {detail.restricted.map((item) => (
                        <span key={item} className="bg-red-50 text-red-700 border border-red-200 rounded-full px-3 py-1 text-xs font-medium">{item}</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Official links */}
                <Card className="bg-gray-50">
                  <CardContent className="p-5">
                    <div className="font-bold text-gray-900 mb-3">🔗 Official Resources</div>
                    <div className="grid grid-cols-2 gap-2">
                      {["Customs Authority Website","Ministry of Health (Medicines)","Aviation Authority (Batteries)","Embassy / Consulate Info"].map((l) => (
                        <a key={l} href="#" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                          <span>→</span> {l}
                        </a>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-3">Links are advisory. Verify all information with official government sources.</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
