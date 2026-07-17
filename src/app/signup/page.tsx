"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const STEPS = ["Account Type", "Personal Info", "Security", "Verification"];

export default function SignupPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    role: "sender", fullName: "", email: "", phone: "", country: "", dob: "", password: "", confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const roles = [
    { id: "sender", icon: "📦", title: "Sender / Shipper", desc: "I want to send items internationally through travelers." },
    { id: "traveler", icon: "✈️", title: "Traveler / Carrier", desc: "I travel internationally and have luggage space to monetize." },
    { id: "both", icon: "🔄", title: "Both", desc: "I sometimes send items and sometimes travel with space." },
    { id: "sponsor", icon: "💼", title: "Sponsor / Cargo Owner", desc: "I want to fund traveler tickets in exchange for cargo capacity." },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
          <p className="text-gray-500 mt-1">Join 50,000+ verified CarryBridge users</p>
        </div>

        {/* Progress */}
        <div className="flex items-center mb-6">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className={`flex items-center gap-1.5 ${i <= step ? "text-blue-600" : "text-gray-400"}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 flex-shrink-0 ${i < step ? "bg-blue-600 border-blue-600 text-white" : i === step ? "border-blue-600 text-blue-600" : "border-gray-300"}`}>
                  {i < step ? "✓" : i + 1}
                </div>
                <span className="text-xs hidden sm:block">{s}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 mx-1.5 ${i < step ? "bg-blue-600" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        <Card>
          <CardContent className="p-6">
            {step === 0 && (
              <div className="space-y-4">
                <div className="text-sm font-semibold text-gray-700 mb-3">How will you primarily use CarryBridge?</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {roles.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setForm({...form, role: r.id})}
                      className={`text-left p-4 rounded-xl border-2 transition-all ${form.role === r.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}
                    >
                      <div className="text-2xl mb-1">{r.icon}</div>
                      <div className="font-semibold text-sm text-gray-900">{r.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{r.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <Input label="Full Legal Name *" placeholder="As it appears on your ID" value={form.fullName} onChange={(e) => setForm({...form, fullName: e.target.value})} />
                <Input type="email" label="Email Address *" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
                <Input type="tel" label="Phone Number *" placeholder="+44 7911 123456" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} />
                <Select label="Country of Residence *" options={[{value:"GB",label:"🇬🇧 United Kingdom"},{value:"BD",label:"🇧🇩 Bangladesh"},{value:"AE",label:"🇦🇪 UAE"},{value:"IN",label:"🇮🇳 India"},{value:"US",label:"🇺🇸 USA"},{value:"CA",label:"🇨🇦 Canada"},{value:"AU",label:"🇦🇺 Australia"},{value:"TR",label:"🇹🇷 Turkey"},{value:"MY",label:"🇲🇾 Malaysia"},{value:"FR",label:"🇫🇷 France"}]} placeholder="Select country" value={form.country} onChange={(e) => setForm({...form, country: e.target.value})} />
                <Input type="date" label="Date of Birth *" value={form.dob} onChange={(e) => setForm({...form, dob: e.target.value})} />
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800">
                  🔞 You must be 18 or older to use CarryBridge. Your date of birth is used for age verification only.
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <Input type="password" label="Password *" placeholder="Minimum 8 characters" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} />
                <Input type="password" label="Confirm Password *" placeholder="Repeat your password" value={form.confirmPassword} onChange={(e) => setForm({...form, confirmPassword: e.target.value})} />
                <div className="space-y-2">
                  {["✓ At least 8 characters","✓ Includes uppercase and lowercase","✓ Includes a number","✓ Includes a special character"].map((r) => (
                    <div key={r} className="text-xs text-green-600 flex items-center gap-1">{r}</div>
                  ))}
                </div>
                <div className="space-y-3 pt-2">
                  <label className="flex gap-2 text-sm text-gray-700 cursor-pointer">
                    <input type="checkbox" className="mt-0.5 rounded" required />
                    I agree to the CarryBridge <Link href="/terms" className="text-blue-600 underline">Terms of Service</Link> and <Link href="/privacy" className="text-blue-600 underline">Privacy Policy</Link>
                  </label>
                  <label className="flex gap-2 text-sm text-gray-700 cursor-pointer">
                    <input type="checkbox" className="mt-0.5 rounded" required />
                    I confirm I am 18 years of age or older
                  </label>
                  <label className="flex gap-2 text-sm text-gray-700 cursor-pointer">
                    <input type="checkbox" className="mt-0.5 rounded" required />
                    I understand I must never carry sealed, unknown, or prohibited items
                  </label>
                  <label className="flex gap-2 text-sm text-gray-700 cursor-pointer">
                    <input type="checkbox" className="mt-0.5 rounded" />
                    Send me route alerts and new listing notifications (optional)
                  </label>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center space-y-6">
                <div className="text-5xl">📧</div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Verify Your Email</h3>
                  <p className="text-sm text-gray-500">We've sent a verification link to <strong>{form.email || "your@email.com"}</strong>. Click the link to activate your account.</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-left">
                  <div className="font-bold text-blue-900 text-sm mb-2">Next Steps After Email Verification:</div>
                  <ol className="text-xs text-blue-800 space-y-1.5">
                    <li>1. Verify your phone number with SMS code</li>
                    <li>2. Upload government ID for KYC (passport or national ID)</li>
                    <li>3. Take a selfie for identity match</li>
                    <li>4. Await admin approval (usually within 2–4 hours)</li>
                    <li>5. Start posting or browsing listings!</li>
                  </ol>
                </div>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" onClick={() => {}}>Resend Email</Button>
                  <Link href="/dashboard"><Button>Continue to Dashboard →</Button></Link>
                </div>
              </div>
            )}

            {/* Nav */}
            {step < 3 && (
              <div className="flex justify-between mt-6 pt-5 border-t border-gray-100">
                <Button variant="ghost" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>← Back</Button>
                {step < 2 ? (
                  <Button onClick={() => setStep(step + 1)}>Continue →</Button>
                ) : (
                  <Button onClick={() => { setLoading(true); setTimeout(() => { setLoading(false); setStep(3); }, 1500); }} loading={loading}>Create Account →</Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-semibold hover:underline">Sign in →</Link>
        </p>
      </div>
    </div>
  );
}
