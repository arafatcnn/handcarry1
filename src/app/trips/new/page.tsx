"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input, Select, Textarea } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ITEM_CATEGORIES } from "@/lib/data";

const STEPS = ["Flight Details", "Baggage & Space", "Compensation", "Rules & Terms", "Review"];

export default function NewTripPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    fromCity:"",fromCountry:"",fromAirport:"",toCity:"",toCountry:"",toAirport:"",
    departureDate:"",arrivalDate:"",airline:"",baggageType:"both",
    freeKg:"",freeLb:"",categories:[] as string[],
    compensationType:"negotiable",compMin:"",compMax:"",currency:"USD",
    ticketSponsorship:false,pickupAvailable:false,pickupAddress:"",
    dropAvailable:false,dropAddress:"",notes:"",
  });

  const toggleCategory = (cat: string) => {
    setForm((f) => ({
      ...f,
      categories: f.categories.includes(cat) ? f.categories.filter((c) => c !== cat) : [...f.categories, cat],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Post a Trip Listing ✈️</h1>
          <p className="text-gray-500 mt-1">Share your available luggage space and earn from items you carry.</p>
        </div>

        {/* Progress */}
        <div className="flex items-center mb-6">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className={`flex items-center gap-1.5 ${i <= step ? "text-blue-600" : "text-gray-400"}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${i < step ? "bg-blue-600 border-blue-600 text-white" : i === step ? "border-blue-600" : "border-gray-300"}`}>
                  {i < step ? "✓" : i + 1}
                </div>
                <span className="text-xs hidden sm:block whitespace-nowrap">{s}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 mx-1.5 ${i < step ? "bg-blue-600" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        <Card>
          <CardHeader><h2 className="font-bold text-gray-900">Step {step + 1}: {STEPS[step]}</h2></CardHeader>
          <CardContent className="p-6 space-y-5">
            {step === 0 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Origin City *" placeholder="e.g. Dhaka" value={form.fromCity} onChange={(e) => setForm({...form,fromCity:e.target.value})} />
                  <Select label="Origin Country *" options={[{value:"BD",label:"🇧🇩 Bangladesh"},{value:"GB",label:"🇬🇧 UK"},{value:"AE",label:"🇦🇪 UAE"},{value:"IN",label:"🇮🇳 India"},{value:"TR",label:"🇹🇷 Turkey"},{value:"MY",label:"🇲🇾 Malaysia"},{value:"FR",label:"🇫🇷 France"},{value:"US",label:"🇺🇸 USA"}]} placeholder="Select" value={form.fromCountry} onChange={(e) => setForm({...form,fromCountry:e.target.value})} />
                </div>
                <Input label="Origin Airport Code (IATA)" placeholder="e.g. DAC, LHR, DXB" value={form.fromAirport} onChange={(e) => setForm({...form,fromAirport:e.target.value.toUpperCase()})} />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Destination City *" placeholder="e.g. London" value={form.toCity} onChange={(e) => setForm({...form,toCity:e.target.value})} />
                  <Select label="Destination Country *" options={[{value:"BD",label:"🇧🇩 Bangladesh"},{value:"GB",label:"🇬🇧 UK"},{value:"AE",label:"🇦🇪 UAE"},{value:"CA",label:"🇨🇦 Canada"},{value:"AU",label:"🇦🇺 Australia"},{value:"US",label:"🇺🇸 USA"},{value:"QA",label:"🇶🇦 Qatar"}]} placeholder="Select" value={form.toCountry} onChange={(e) => setForm({...form,toCountry:e.target.value})} />
                </div>
                <Input label="Destination Airport Code (IATA)" placeholder="e.g. LHR, JFK, YYZ" value={form.toAirport} onChange={(e) => setForm({...form,toAirport:e.target.value.toUpperCase()})} />
                <div className="grid grid-cols-2 gap-4">
                  <Input type="date" label="Departure Date *" value={form.departureDate} onChange={(e) => setForm({...form,departureDate:e.target.value})} />
                  <Input type="date" label="Arrival Date" value={form.arrivalDate} onChange={(e) => setForm({...form,arrivalDate:e.target.value})} />
                </div>
                <Input label="Airline (optional)" placeholder="e.g. Biman Bangladesh, Emirates" value={form.airline} onChange={(e) => setForm({...form,airline:e.target.value})} />
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800">
                  🔒 Your exact flight number is never shown publicly. It's only shared with matched and confirmed booking partners.
                </div>
              </>
            )}
            {step === 1 && (
              <>
                <Select label="Baggage Type *" options={[{value:"checked",label:"Checked luggage only"},{value:"cabin",label:"Cabin/carry-on only"},{value:"both",label:"Both checked and cabin"}]} value={form.baggageType} onChange={(e) => setForm({...form,baggageType:e.target.value})} />
                <div className="grid grid-cols-2 gap-4">
                  <Input type="number" label="Available Space (kg) *" placeholder="e.g. 15" value={form.freeKg} onChange={(e) => setForm({...form,freeKg:e.target.value})} />
                  <Input type="number" label="Available Space (lb)" placeholder="e.g. 33" value={form.freeLb} onChange={(e) => setForm({...form,freeLb:e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Accepted Item Categories *</label>
                  <div className="flex flex-wrap gap-2">
                    {ITEM_CATEGORIES.map((cat) => (
                      <button key={cat} type="button" onClick={() => toggleCategory(cat)} className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${form.categories.includes(cat) ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"}`}>
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
                  ⚠️ By selecting categories, you confirm you are willing to physically inspect items in those categories before carrying. You may decline any item that seems unsafe or undeclared.
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <Select label="Compensation Type *" options={[{value:"negotiable",label:"Negotiable (you discuss per item)"},{value:"fixed",label:"Fixed rate per kg"},{value:"ticket_sponsorship",label:"Seeking ticket sponsorship"},{value:"free",label:"Free (charitable/family)"}]} value={form.compensationType} onChange={(e) => setForm({...form,compensationType:e.target.value})} />
                {form.compensationType !== "free" && (
                  <div className="grid grid-cols-2 gap-4">
                    <Input type="number" label="Min Fee (USD)" placeholder="20" value={form.compMin} onChange={(e) => setForm({...form,compMin:e.target.value})} />
                    <Input type="number" label="Max Fee (USD)" placeholder="100" value={form.compMax} onChange={(e) => setForm({...form,compMax:e.target.value})} />
                  </div>
                )}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="rounded" checked={form.ticketSponsorship} onChange={(e) => setForm({...form,ticketSponsorship:e.target.checked})} />
                    <div>
                      <div className="text-sm font-medium text-gray-900">🎫 Open to ticket sponsorship</div>
                      <div className="text-xs text-gray-500">Allow sponsors to pay for my ticket in exchange for carrying their declared cargo</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="rounded" checked={form.pickupAvailable} onChange={(e) => setForm({...form,pickupAvailable:e.target.checked})} />
                    <div className="text-sm font-medium text-gray-900">🚗 Pickup available (I can collect from sender)</div>
                  </label>
                  {form.pickupAvailable && <Input label="Pickup Area" placeholder="e.g. Central London, Zone 1-3" value={form.pickupAddress} onChange={(e) => setForm({...form,pickupAddress:e.target.value})} />}
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="rounded" checked={form.dropAvailable} onChange={(e) => setForm({...form,dropAvailable:e.target.checked})} />
                    <div className="text-sm font-medium text-gray-900">📍 Drop-off available at destination</div>
                  </label>
                  {form.dropAvailable && <Input label="Drop-off Area" placeholder="e.g. Dhaka, Gulshan/Banani area" value={form.dropAddress} onChange={(e) => setForm({...form,dropAddress:e.target.value})} />}
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <Textarea label="Additional Notes" placeholder="e.g. I prefer lightweight items. Available for pickup on weekday evenings. WhatsApp communication preferred (through platform only)." rows={4} value={form.notes} onChange={(e) => setForm({...form,notes:e.target.value})} />
                <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                  <div className="font-bold text-red-900 mb-3">CarryBridge Traveler Rules — Please Confirm</div>
                  <div className="space-y-2">
                    {[
                      "I will physically inspect and photograph all items before pickup",
                      "I will never carry any sealed, unknown, or uninspected package",
                      "I will declare all carried items honestly at customs",
                      "I will not carry drugs, weapons, counterfeit goods, or any prohibited items",
                      "I understand I am responsible for items I knowingly carry through customs",
                      "I will only communicate and receive payment through CarryBridge",
                      "I agree to CarryBridge Traveler Terms, Safety Policy, and Carrier Liability",
                    ].map((rule) => (
                      <label key={rule} className="flex gap-2 text-sm text-gray-700 cursor-pointer">
                        <input type="checkbox" className="mt-0.5 rounded flex-shrink-0" required />
                        <span>{rule}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}
            {step === 4 && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                  <h3 className="font-bold text-green-900 mb-3">✅ Review Your Trip Listing</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {[
                      ["Route", `${form.fromCity || "—"} → ${form.toCity || "—"}`],
                      ["Date", form.departureDate || "—"],
                      ["Airline", form.airline || "Not specified"],
                      ["Free Space", form.freeKg ? `${form.freeKg} kg` : "—"],
                      ["Fee Range", form.compMin ? `$${form.compMin}–$${form.compMax}` : "Negotiable"],
                      ["Sponsorship", form.ticketSponsorship ? "Yes, open" : "No"],
                      ["Categories", `${form.categories.length} selected`],
                      ["Pickup", form.pickupAvailable ? "Yes" : "No"],
                    ].map(([k,v]) => (
                      <div key={k}><div className="text-gray-500 text-xs">{k}</div><div className="font-medium text-gray-900">{v}</div></div>
                    ))}
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-xs text-blue-800">
                  Your listing will be reviewed by our automated compliance system. It will go live within minutes unless flagged. You'll receive email and in-app notification.
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4 border-t border-gray-100">
              <Button variant="ghost" onClick={() => setStep(Math.max(0, step-1))} disabled={step===0}>← Back</Button>
              {step < STEPS.length - 1
                ? <Button onClick={() => setStep(step+1)}>Continue →</Button>
                : <Button variant="success">🚀 Post Trip Listing</Button>
              }
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
