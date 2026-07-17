"use client";
import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const ADMIN_STATS = [
  { label: "Total Users", value: "52,847", change: "+284 today", icon: "👥", color: "blue" },
  { label: "KYC Pending", value: "143", change: "Needs review", icon: "🔐", color: "amber", urgent: true },
  { label: "Active Listings", value: "3,291", change: "Trips + Shipments", icon: "📋", color: "teal" },
  { label: "Open Disputes", value: "28", change: "Avg 24h resolution", icon: "⚖️", color: "red", urgent: true },
  { label: "Escrow Held", value: "$184,200", change: "Total in escrow", icon: "💳", color: "purple" },
  { label: "Flagged Items", value: "17", change: "Pending review", icon: "🚨", color: "red", urgent: true },
  { label: "Today Revenue", value: "$4,280", change: "Platform fees", icon: "💰", color: "green" },
  { label: "Completion Rate", value: "97.8%", change: "All-time", icon: "✅", color: "green" },
];

const KYC_QUEUE = [
  { id: "u-1042", name: "Md. Karim", country: "🇧🇩", submittedAt: "2h ago", docType: "Passport", status: "pending", risk: "low" },
  { id: "u-1041", name: "Ana Rodrigues", country: "🇧🇷", submittedAt: "3h ago", docType: "National ID", status: "pending", risk: "low" },
  { id: "u-1040", name: "Yusuf Hassan", country: "🇸🇴", submittedAt: "5h ago", docType: "Passport", status: "under_review", risk: "medium" },
  { id: "u-1039", name: "NovaTrade LLC", country: "🇦🇪", submittedAt: "8h ago", docType: "Business ID", status: "pending", risk: "high" },
];

const FLAGGED_LISTINGS = [
  { id: "s-3029", type: "Shipment", title: "iPhone 15 Pro × 8 units", sender: "Unknown Sender", flag: "Commercial quantity electronics", severity: "high" },
  { id: "s-3028", type: "Shipment", title: "Prescription Medication (Unlabeled)", sender: "User-4821", flag: "Unlabeled medicine", severity: "high" },
  { id: "t-2201", type: "Trip", title: "Cash Carrier needed — Dubai to London", sender: "User-9943", flag: "Suspicious description (cash)", severity: "medium" },
];

const OPEN_DISPUTES = [
  { id: "D-501", booking: "B-1031", type: "Non-delivery", raisedBy: "Carlos M.", against: "Traveler X", status: "open", daysOpen: 2 },
  { id: "D-500", booking: "B-1028", type: "Item damage", raisedBy: "Priya N.", against: "Sender Y", status: "under_review", daysOpen: 1 },
  { id: "D-499", booking: "B-1020", type: "Payment dispute", raisedBy: "Elif Y.", against: "Platform", status: "resolved", daysOpen: 3 },
];

const ADMIN_TABS = [
  "Overview", "KYC Queue", "Listings", "Flagged Items", "Disputes", "Users", "Country Rules", "Payments", "System Logs"
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin header */}
      <div className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center text-xs">🛡️</div>
            <span className="font-bold">CarryBridge Admin</span>
          </div>
          <Badge variant="danger">Admin Mode</Badge>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">Logged in as: Super Admin</span>
          <Link href="/dashboard"><Button size="sm" variant="ghost" className="text-gray-300 hover:text-white">← Dashboard</Button></Link>
          <Link href="/"><Button size="sm" variant="ghost" className="text-gray-300 hover:text-white">← Site</Button></Link>
        </div>
      </div>

      <div className="flex">
        {/* Admin sidebar */}
        <aside className="w-56 bg-gray-800 min-h-[calc(100vh-60px)] p-3 flex-shrink-0">
          {ADMIN_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-3 py-2.5 rounded-lg mb-0.5 text-sm font-medium transition-colors ${activeTab === tab ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"}`}
            >
              {tab === "KYC Queue" ? "🔐 " : tab === "Flagged Items" ? "🚨 " : tab === "Disputes" ? "⚖️ " : tab === "Payments" ? "💳 " : ""}
              {tab}
              {tab === "KYC Queue" && <span className="ml-auto float-right bg-amber-500 text-white text-xs rounded-full px-1.5">143</span>}
              {tab === "Flagged Items" && <span className="ml-auto float-right bg-red-500 text-white text-xs rounded-full px-1.5">17</span>}
              {tab === "Disputes" && <span className="ml-auto float-right bg-red-500 text-white text-xs rounded-full px-1.5">28</span>}
            </button>
          ))}
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          {activeTab === "Overview" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
                <p className="text-gray-500 text-sm mt-0.5">Real-time platform health and compliance dashboard</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {ADMIN_STATS.map((s) => (
                  <Card key={s.label} className={s.urgent ? "border-red-200" : ""}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-2xl">{s.icon}</span>
                        {s.urgent && <Badge variant="danger" className="text-xs">Action Needed</Badge>}
                      </div>
                      <div className="text-xl font-bold text-gray-900">{s.value}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
                      <div className="text-xs text-blue-600 font-medium mt-1">{s.change}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick alerts */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-amber-200 col-span-1">
                  <CardHeader><h3 className="font-bold text-amber-900 flex items-center gap-2">🔐 KYC Queue <Badge variant="warning">{KYC_QUEUE.length} pending</Badge></h3></CardHeader>
                  <CardContent className="p-0">
                    {KYC_QUEUE.slice(0, 3).map((u, i) => (
                      <div key={u.id} className={`px-4 py-3 flex items-center gap-3 ${i > 0 ? "border-t border-gray-100" : ""}`}>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{u.name} {u.country}</div>
                          <div className="text-xs text-gray-500">{u.docType} · {u.submittedAt}</div>
                        </div>
                        <div className="ml-auto flex gap-1">
                          <button className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200">✓</button>
                          <button className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200">✗</button>
                        </div>
                      </div>
                    ))}
                    <div className="px-4 py-3 border-t border-gray-100">
                      <button onClick={() => setActiveTab("KYC Queue")} className="text-xs text-blue-600 hover:underline">View all 143 pending →</button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200 col-span-1">
                  <CardHeader><h3 className="font-bold text-red-900 flex items-center gap-2">🚨 Flagged Listings <Badge variant="danger">{FLAGGED_LISTINGS.length}</Badge></h3></CardHeader>
                  <CardContent className="p-0">
                    {FLAGGED_LISTINGS.map((fl, i) => (
                      <div key={fl.id} className={`px-4 py-3 ${i > 0 ? "border-t border-gray-100" : ""}`}>
                        <div className="text-sm font-medium text-gray-900 truncate">{fl.title}</div>
                        <div className="text-xs text-red-600">{fl.flag}</div>
                        <div className="flex gap-1 mt-1.5">
                          <button className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Review</button>
                          <button className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">Remove</button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-orange-200 col-span-1">
                  <CardHeader><h3 className="font-bold text-orange-900 flex items-center gap-2">⚖️ Open Disputes <Badge variant="warning">{OPEN_DISPUTES.filter(d => d.status !== "resolved").length}</Badge></h3></CardHeader>
                  <CardContent className="p-0">
                    {OPEN_DISPUTES.map((d, i) => (
                      <div key={d.id} className={`px-4 py-3 flex items-center gap-3 ${i > 0 ? "border-t border-gray-100" : ""}`}>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">{d.id} — {d.type}</div>
                          <div className="text-xs text-gray-500">{d.raisedBy} vs {d.against} · {d.daysOpen}d open</div>
                        </div>
                        <Badge variant={d.status === "resolved" ? "success" : d.status === "under_review" ? "warning" : "danger"}>
                          {d.status.replace("_"," ")}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "KYC Queue" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">KYC Review Queue</h2>
                <div className="flex gap-3">
                  <Input placeholder="Search by name or ID..." className="w-64" />
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    <option>All Risk Levels</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>
              <Card>
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        {["User ID","Name","Country","Doc Type","Submitted","Risk","Status","Actions"].map((h) => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[...KYC_QUEUE, ...KYC_QUEUE].slice(0,8).map((u, i) => (
                        <tr key={`${u.id}-${i}`} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-4 py-3 text-xs text-gray-500">{u.id}</td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{u.name}</td>
                          <td className="px-4 py-3 text-sm">{u.country}</td>
                          <td className="px-4 py-3 text-xs text-gray-600">{u.docType}</td>
                          <td className="px-4 py-3 text-xs text-gray-500">{u.submittedAt}</td>
                          <td className="px-4 py-3">
                            <Badge variant={u.risk === "high" ? "danger" : u.risk === "medium" ? "warning" : "success"}>
                              {u.risk}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant={u.status === "under_review" ? "warning" : "secondary"}>
                              {u.status.replace("_"," ")}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1">
                              <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200">Review</button>
                              <button className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200">Approve</button>
                              <button className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200">Reject</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "Country Rules" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Country Rules Manager</h2>
                <Button>+ Add Country</Button>
              </div>
              <Card>
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        {["Country","Code","Duty Threshold","Strict Food","Strict Medicine","Last Updated","Actions"].map((h) => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {name:"Australia",code:"AU",threshold:"AUD 1,000",food:true,medicine:true,updated:"2026-05-01"},
                        {name:"Bangladesh",code:"BD",threshold:"BDT 10,000",food:false,medicine:false,updated:"2026-04-15"},
                        {name:"Canada",code:"CA",threshold:"CAD 800",food:false,medicine:false,updated:"2026-03-20"},
                        {name:"UAE",code:"AE",threshold:"AED 3,000",food:false,medicine:true,updated:"2026-05-10"},
                        {name:"United Kingdom",code:"GB",threshold:"GBP 390",food:false,medicine:false,updated:"2026-04-01"},
                        {name:"United States",code:"US",threshold:"USD 800",food:false,medicine:false,updated:"2026-05-15"},
                        {name:"India",code:"IN",threshold:"INR 50,000",food:false,medicine:false,updated:"2026-04-20"},
                      ].map((c) => (
                        <tr key={c.code} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{c.name}</td>
                          <td className="px-4 py-3 text-xs text-gray-500">{c.code}</td>
                          <td className="px-4 py-3 text-xs text-gray-700">{c.threshold}</td>
                          <td className="px-4 py-3">{c.food ? <Badge variant="danger">Strict</Badge> : <span className="text-xs text-gray-400">Normal</span>}</td>
                          <td className="px-4 py-3">{c.medicine ? <Badge variant="danger">Strict</Badge> : <span className="text-xs text-gray-400">Normal</span>}</td>
                          <td className="px-4 py-3 text-xs text-gray-500">{c.updated}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1">
                              <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Edit</button>
                              <button className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">View</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>
          )}

          {(activeTab === "Listings" || activeTab === "Users" || activeTab === "Payments" || activeTab === "System Logs") && (
            <div className="flex items-center justify-center h-64 text-center">
              <div>
                <div className="text-5xl mb-4">🛠️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{activeTab}</h3>
                <p className="text-gray-500">This admin section is structurally defined. Connect to Supabase backend to populate with real data.</p>
                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800 max-w-md mx-auto">
                  Database schema is defined in <code className="bg-blue-100 px-1 rounded">db-schema.sql</code>. All entities, RLS policies, and admin_logs table are ready for integration.
                </div>
              </div>
            </div>
          )}

          {activeTab === "Flagged Items" && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-gray-900">Flagged Listings for Review</h2>
              <div className="space-y-4">
                {FLAGGED_LISTINGS.map((fl) => (
                  <Card key={fl.id} className="border-red-200">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="danger">{fl.type}</Badge>
                            <Badge variant={fl.severity === "high" ? "danger" : "warning"}>{fl.severity} risk</Badge>
                            <span className="text-xs text-gray-500">{fl.id}</span>
                          </div>
                          <div className="font-bold text-gray-900 mb-1">{fl.title}</div>
                          <div className="text-sm text-red-700">🚨 Flag reason: {fl.flag}</div>
                          <div className="text-xs text-gray-500 mt-1">Sender: {fl.sender}</div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <Button size="sm" variant="outline">Review Details</Button>
                          <Button size="sm" variant="success">Approve</Button>
                          <Button size="sm" variant="danger">Remove Listing</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Disputes" && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-gray-900">Dispute Management Center</h2>
              <div className="space-y-4">
                {[...OPEN_DISPUTES, { id: "D-498", booking: "B-1015", type: "Fraud", raisedBy: "Sophie M.", against: "Unknown Sender", status: "escalated", daysOpen: 5 }].map((d) => (
                  <Card key={d.id} className={d.status === "escalated" ? "border-red-400" : d.status === "open" ? "border-amber-300" : ""}>
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={d.status === "resolved" ? "success" : d.status === "escalated" ? "danger" : d.status === "under_review" ? "warning" : "secondary"}>
                              {d.status.replace("_"," ")}
                            </Badge>
                            <span className="text-xs text-gray-500">{d.id} · {d.booking} · {d.daysOpen} day(s) open</span>
                          </div>
                          <div className="font-bold text-gray-900">{d.type}</div>
                          <div className="text-sm text-gray-600 mt-0.5">{d.raisedBy} raised against {d.against}</div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <Button size="sm" variant="outline">View Evidence</Button>
                          <Button size="sm">Assign to Me</Button>
                          {d.status === "open" && <Button size="sm" variant="danger">Escalate</Button>}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
