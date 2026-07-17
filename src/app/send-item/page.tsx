"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input, Select, Textarea } from "@/components/ui/input";
import ShipmentCard from "@/components/shared/ShipmentCard";
import { DEMO_SHIPMENTS, ITEM_CATEGORIES } from "@/lib/data";

const STEPS = ["Item Details", "Origin & Destination", "Photos & Docs", "Offer & Terms", "Review & Post"];

export default function SendItemPage() {
  const [activeTab, setActiveTab] = useState<"browse" | "post">("browse");
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    title: "", category: "", description: "", weight: "", dimensions: "",
    declaredValue: "", currency: "USD", quantity: "1", fromCity: "", fromCountry: "",
    toCity: "", toCountry: "", dateFlexibility: "±3 days", preferredDate: "",
    urgency: "medium", offerPrice: "", dutyResponsibility: "sender", customsNotes: "",
    invoiceUploaded: false, inspectionAllowed: true,
    isElectronics: false, brand: "", model: "", imei: "", quantity2: "1",
  });

  const isHighRisk = formData.category === "Electronics" && parseInt(formData.quantity2) > 1;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-700 to-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="warning" className="mb-3">Senders</Badge>
          <h1 className="text-3xl font-bold mb-2">Send an Item Internationally</h1>
          <p className="text-teal-100">Post your shipment and let verified travelers carry it for you. Cheaper than freight, faster than traditional courier.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-8 gap-1">
          {(["browse","post"] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
              {tab === "browse" ? "📦 Browse Shipment Requests" : "➕ Post New Shipment"}
            </button>
          ))}
        </div>

        {activeTab === "browse" ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="font-semibold text-gray-900">{DEMO_SHIPMENTS.length} open shipment requests</span>
                <span className="text-sm text-gray-500 ml-2">— travelers, find a shipment to carry</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DEMO_SHIPMENTS.map((s) => <ShipmentCard key={s.id} shipment={s} />)}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            {/* Progress Steps */}
            <div className="flex items-center mb-8">
              {STEPS.map((s, i) => (
                <div key={s} className="flex items-center flex-1 last:flex-none">
                  <div className={`flex items-center gap-2 ${i <= step ? "text-blue-600" : "text-gray-400"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${i < step ? "bg-blue-600 border-blue-600 text-white" : i === step ? "border-blue-600 text-blue-600" : "border-gray-300 text-gray-400"}`}>
                      {i < step ? "✓" : i + 1}
                    </div>
                    <span className="text-xs font-medium hidden sm:block">{s}</span>
                  </div>
                  {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 mx-2 ${i < step ? "bg-blue-600" : "bg-gray-200"}`} />}
                </div>
              ))}
            </div>

            {/* Safety Warning */}
            <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 mb-6 flex gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <div className="font-bold text-amber-900 text-sm mb-1">CarryBridge Compliance Notice</div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  You are responsible for ensuring all items are legal in both origin and destination countries. Provide accurate declared value and category. CarryBridge requires full transparency — senders who misrepresent items will be permanently banned and reported to authorities.
                </p>
              </div>
            </div>

            {/* Step Content */}
            <Card>
              <CardHeader>
                <h2 className="font-bold text-gray-900">Step {step + 1}: {STEPS[step]}</h2>
              </CardHeader>
              <CardContent className="p-6 space-y-5">

                {step === 0 && (
                  <>
                    <Input label="Item Title *" placeholder="e.g. Samsung Galaxy S24 (1 unit, personal use)" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                    <Select label="Category *" options={ITEM_CATEGORIES.map((c) => ({value:c,label:c}))} placeholder="Select category" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value, isElectronics: e.target.value === "Electronics"})} />

                    {formData.isElectronics && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                        <div className="font-bold text-red-900 text-sm mb-3">📱 Electronics — Additional Required Details</div>
                        <div className="grid grid-cols-2 gap-3">
                          <Input label="Brand" placeholder="e.g. Samsung, Apple" value={formData.brand} onChange={(e) => setFormData({...formData, brand: e.target.value})} />
                          <Input label="Model" placeholder="e.g. Galaxy S24 Ultra" value={formData.model} onChange={(e) => setFormData({...formData, model: e.target.value})} />
                          <Input label="IMEI / Serial (optional)" placeholder="For phones" value={formData.imei} onChange={(e) => setFormData({...formData, imei: e.target.value})} />
                          <Input type="number" label="Quantity *" min="1" max="5" value={formData.quantity2} onChange={(e) => setFormData({...formData, quantity2: e.target.value})} />
                        </div>
                        {isHighRisk && (
                          <div className="mt-3 bg-red-100 rounded-lg p-3 text-xs text-red-800">
                            ⚠️ More than 1 phone/device may be considered commercial quantity in many countries (UK, USA, Australia, Bangladesh). This listing will be flagged for admin review. Traveler must be explicitly informed.
                          </div>
                        )}
                        <div className="mt-3 text-xs text-red-700 bg-red-100 rounded-lg p-2">
                          🔋 Lithium battery items must follow IATA airline rules. Loose batteries in carry-on only. Declare battery capacity.
                        </div>
                      </div>
                    )}

                    <Textarea label="Description *" placeholder="Describe the item clearly — color, condition, purpose. Be specific." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={4} />
                    <div className="grid grid-cols-2 gap-4">
                      <Input type="number" label="Weight (kg) *" placeholder="0.5" value={formData.weight} onChange={(e) => setFormData({...formData, weight: e.target.value})} />
                      <Input label="Dimensions (cm)" placeholder="L × W × H" value={formData.dimensions} onChange={(e) => setFormData({...formData, dimensions: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input type="number" label="Declared Value (USD) *" placeholder="0.00" value={formData.declaredValue} onChange={(e) => setFormData({...formData, declaredValue: e.target.value})} />
                      <Input type="number" label="Quantity" value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})} />
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800">
                      💡 Declared value must match your invoice. Undervaluing items for customs purposes is illegal and violates CarryBridge terms. Your account may be suspended.
                    </div>
                  </>
                )}

                {step === 1 && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Origin City *" placeholder="e.g. London" value={formData.fromCity} onChange={(e) => setFormData({...formData, fromCity: e.target.value})} />
                      <Select label="Origin Country *" options={[{value:"GB",label:"🇬🇧 UK"},{value:"AE",label:"🇦🇪 UAE"},{value:"US",label:"🇺🇸 USA"},{value:"CA",label:"🇨🇦 Canada"},{value:"IN",label:"🇮🇳 India"},{value:"AU",label:"🇦🇺 Australia"},{value:"BD",label:"🇧🇩 Bangladesh"}]} placeholder="Select" value={formData.fromCountry} onChange={(e) => setFormData({...formData, fromCountry: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Destination City *" placeholder="e.g. Dhaka" value={formData.toCity} onChange={(e) => setFormData({...formData, toCity: e.target.value})} />
                      <Select label="Destination Country *" options={[{value:"GB",label:"🇬🇧 UK"},{value:"AE",label:"🇦🇪 UAE"},{value:"US",label:"🇺🇸 USA"},{value:"CA",label:"🇨🇦 Canada"},{value:"IN",label:"🇮🇳 India"},{value:"AU",label:"🇦🇺 Australia"},{value:"BD",label:"🇧🇩 Bangladesh"}]} placeholder="Select" value={formData.toCountry} onChange={(e) => setFormData({...formData, toCountry: e.target.value})} />
                    </div>
                    <Select label="Date Flexibility" options={[{value:"exact",label:"Exact date only"},{value:"±3 days",label:"±3 days"},{value:"±5 days",label:"±5 days"},{value:"flexible",label:"Flexible (within 2 weeks)"}]} value={formData.dateFlexibility} onChange={(e) => setFormData({...formData, dateFlexibility: e.target.value})} />
                    <Input type="date" label="Preferred Delivery Date" value={formData.preferredDate} onChange={(e) => setFormData({...formData, preferredDate: e.target.value})} />
                    <Select label="Urgency" options={[{value:"low",label:"Low — flexible"},{value:"medium",label:"Medium — within 2 weeks"},{value:"high",label:"High — within 5 days"}]} value={formData.urgency} onChange={(e) => setFormData({...formData, urgency: e.target.value})} />
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                      <div className="text-4xl mb-3">📷</div>
                      <div className="font-semibold text-gray-700 mb-1">Upload Item Photos</div>
                      <div className="text-sm text-gray-500 mb-3">Minimum 3 photos from different angles. Include original packaging, label, and condition.</div>
                      <Button variant="outline" size="sm">Choose Photos</Button>
                      <div className="text-xs text-gray-400 mt-2">JPG, PNG • Max 5MB each • Up to 8 photos</div>
                    </div>

                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                      <div className="text-3xl mb-2">🧾</div>
                      <div className="font-semibold text-gray-700 mb-1">Upload Invoice / Proof of Purchase</div>
                      <div className="text-sm text-gray-500 mb-3">Required for items over $100. Must match declared value.</div>
                      <Button variant="outline" size="sm">Upload Invoice</Button>
                    </div>

                    <label className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-lg p-4 cursor-pointer">
                      <input type="checkbox" checked={formData.inspectionAllowed} onChange={(e) => setFormData({...formData, inspectionAllowed: e.target.checked})} className="mt-0.5 rounded" />
                      <div>
                        <div className="font-semibold text-green-900 text-sm">✓ I allow the traveler to inspect all items before acceptance</div>
                        <div className="text-xs text-green-700 mt-0.5">This is required. Travelers must inspect items in person. No sealed unknown packages allowed.</div>
                      </div>
                    </label>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-xs text-red-800">
                      <strong>Prohibited Item Reminder:</strong> Do not post drugs, weapons, counterfeit goods, excessive cash, or any item banned in either country. Violations result in permanent ban and legal reporting.
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <Input type="number" label="Your Carrying Fee Offer (USD) *" placeholder="e.g. 50" value={formData.offerPrice} onChange={(e) => setFormData({...formData, offerPrice: e.target.value})} />
                    <div className="bg-blue-50 rounded-lg p-3 text-xs text-blue-800">
                      💡 Typical rates: $20–$40 for light items, $50–$120 for electronics, $30–$80/kg for bulk. Be fair — good offers attract better traveler ratings.
                    </div>
                    <Select label="Customs Duty Responsibility *" options={[{value:"sender",label:"Sender pays all duties"},{value:"recipient",label:"Recipient pays duties"},{value:"shared",label:"Shared (agreed in chat)"},{value:"none",label:"No duties expected (gift allowance)"}]} value={formData.dutyResponsibility} onChange={(e) => setFormData({...formData, dutyResponsibility: e.target.value})} />
                    <Textarea label="Special Customs Notes" placeholder="e.g. Item is within personal use limit. Invoice included. Duty-free gift. Etc." value={formData.customsNotes} onChange={(e) => setFormData({...formData, customsNotes: e.target.value})} rows={3} />

                    <div className="space-y-3">
                      {[
                        "I confirm all information is accurate and truthful",
                        "I understand misrepresenting items is a CarryBridge violation and may be illegal",
                        "I accept that the traveler may reject items that do not match this description",
                        "I agree to CarryBridge Terms of Service and Sender Liability Policy",
                      ].map((term) => (
                        <label key={term} className="flex items-start gap-2 text-sm text-gray-700 cursor-pointer">
                          <input type="checkbox" className="mt-0.5 rounded flex-shrink-0" />
                          <span>{term}</span>
                        </label>
                      ))}
                    </div>
                  </>
                )}

                {step === 4 && (
                  <div className="space-y-5">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                      <h3 className="font-bold text-green-900 mb-3">✅ Ready to Post</h3>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        {[["Item", formData.title || "—"],["Category",formData.category||"—"],["Weight",formData.weight?`${formData.weight} kg`:"—"],["Declared Value",formData.declaredValue?`$${formData.declaredValue}`:"—"],["Route",`${formData.fromCity} → ${formData.toCity}`],["Offer Fee",formData.offerPrice?`$${formData.offerPrice}`:"—"]].map(([k,v]) => (
                          <div key={k}><div className="text-gray-500 text-xs">{k}</div><div className="font-medium text-gray-900">{v}</div></div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800">
                      🔔 Your listing will be reviewed by our compliance system. High-value or flagged items may require manual admin review (1–4 hours). You'll receive an email notification.
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between pt-4 border-t border-gray-100">
                  <Button variant="ghost" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>← Back</Button>
                  {step < STEPS.length - 1 ? (
                    <Button onClick={() => setStep(step + 1)}>Continue →</Button>
                  ) : (
                    <Button variant="success">🚀 Post Shipment Request</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
