import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const FLOWS = [
  {
    id: "sender",
    icon: "📦",
    title: "Flow 1: Sender Sends an Item",
    color: "blue",
    steps: [
      { icon: "👤", title: "Create & Verify Account", desc: "Sign up with email, verify phone, complete KYC identity check (passport/ID scan + selfie). You must be 18+." },
      { icon: "📝", title: "Post Shipment Request", desc: "Add item title, category, photos (minimum 3 angles), invoice, declared value, weight, and destination." },
      { icon: "🔍", title: "View Matched Travelers", desc: "Our algorithm surfaces verified travelers on your route with available space and matching categories." },
      { icon: "💬", title: "Send Booking Request", desc: "Initiate booking with a specific traveler. Negotiate fee, duty terms, and pickup details via in-app messages." },
      { icon: "💳", title: "Pay Escrow Deposit", desc: "Sender deposits agreed fee into secure escrow. Funds are held — not released until delivery is confirmed." },
      { icon: "🤝", title: "Schedule Pickup", desc: "Coordinate pickup time and location. Traveler physically inspects, photographs, and confirms each item." },
      { icon: "🌍", title: "Item In Transit", desc: "Real-time status updates. Both sender and recipient receive notifications." },
      { icon: "✅", title: "Recipient Confirms Delivery", desc: "Recipient scans QR code or enters OTP sent by CarryBridge to confirm safe receipt." },
      { icon: "🏆", title: "Escrow Released & Review", desc: "Payment released to traveler. Both parties leave verified reviews that update trust scores." },
    ],
  },
  {
    id: "traveler",
    icon: "✈️",
    title: "Flow 2: Traveler Posts Space",
    color: "teal",
    steps: [
      { icon: "👤", title: "Create & Verify", desc: "Full KYC including identity document, selfie, and phone verification. Traveler background check option." },
      { icon: "✈️", title: "Post Trip Listing", desc: "Enter origin, destination, date, airline (optional), free baggage in kg/lb, accepted categories, and fee expectation." },
      { icon: "🎫", title: "Optional: Seek Sponsorship", desc: "Indicate if you're open to ticket sponsorship in exchange for carrying legal declared cargo." },
      { icon: "📥", title: "Receive Shipper Requests", desc: "Review incoming booking requests with item details, photos, and sender trust score." },
      { icon: "🔍", title: "Inspect Items at Pickup", desc: "Meet sender, open all packages, verify contents match listing, photograph everything. Confirm in app." },
      { icon: "🌍", title: "Travel & Update Status", desc: "Mark as 'Picked Up', 'In Transit', 'Arrived'. Keep recipient updated." },
      { icon: "📦", title: "Deliver to Recipient", desc: "Hand off item. Recipient confirms with OTP/QR. Mark as delivered in app." },
      { icon: "💰", title: "Get Paid", desc: "Escrow automatically releases your fee. Payout to bank account or wallet." },
    ],
  },
  {
    id: "sponsored",
    icon: "🎫",
    title: "Flow 3: Sponsored Traveler",
    color: "amber",
    steps: [
      { icon: "📝", title: "Post Sponsorship Request", desc: "List your desired route, date range, cargo capacity, accepted item categories, and ticket budget needed." },
      { icon: "🔍", title: "Review Sponsor Offers", desc: "Browse sponsors who post cargo requirements matching your route. Review their profile and cargo details." },
      { icon: "💬", title: "Match & Negotiate", desc: "Connect with a sponsor. Negotiate terms, cargo type, and ticket funding amount via in-app messaging." },
      { icon: "🔐", title: "KYC & Item Inspection", desc: "Both parties pass KYC. Traveler physically inspects all cargo — open inspection mandatory." },
      { icon: "💳", title: "Milestone Escrow Funding", desc: "Sponsor deposits full or partial ticket amount. Ticket purchased — proof uploaded to CarryBridge." },
      { icon: "✈️", title: "Travel & Deliver", desc: "Check-in confirmed, departure confirmed, delivery confirmed via OTP. Milestones trigger fund releases." },
      { icon: "🏆", title: "Complete & Review", desc: "All milestones complete. Final payment released. Reviews updated. Trust scores improve." },
    ],
  },
];

const FAQS = [
  { q: "Is CarryBridge legal?", a: "Yes. CarryBridge is a legal marketplace for declared, legal items. We require full item declaration, invoices, and customs compliance. We do not facilitate or encourage customs evasion." },
  { q: "What if the traveler gets stopped at customs?", a: "Travelers are never required to carry unknown items. All items must be declared properly. CarryBridge provides country-specific guidance, but traveler is responsible for knowing the rules of their specific flight and countries." },
  { q: "What happens if an item is lost or damaged?", a: "Our Dispute Center handles all claims. Escrow payment is not released until resolution. Both parties upload evidence. Admin team reviews within 48 hours." },
  { q: "Can I carry medicines?", a: "Personal-use quantities of legally purchased, labeled medicines are generally allowed. Controlled substances, prescription drugs without prescription, or large quantities are prohibited. Always check the destination country rules." },
  { q: "How does escrow work?", a: "When a booking is accepted, the sender deposits the agreed fee into CarryBridge escrow (Stripe-secured). Funds are held until the recipient confirms delivery via OTP. Then payment is released to the traveler minus platform fee." },
  { q: "What is the platform fee?", a: "CarryBridge charges 10–15% platform fee on successful transactions, deducted from escrow before traveler payout. See Pricing page for details." },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-700 to-teal-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-3 bg-white/20 text-white border-white/30">How It Works</Badge>
          <h1 className="text-3xl font-bold mb-2">Structured. Safe. Simple.</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">Every CarryBridge transaction follows a clear, compliance-first workflow. No hidden deals. No anonymous handoffs.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Flows */}
        {FLOWS.map((flow) => (
          <div key={flow.id} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-3xl">{flow.icon}</div>
              <h2 className="text-2xl font-bold text-gray-900">{flow.title}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {flow.steps.map((step, i) => (
                <div key={step.title} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs flex-shrink-0">{i + 1}</div>
                    <div className="text-xl">{step.icon}</div>
                    <div className="font-bold text-gray-900 text-sm">{step.title}</div>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Booking Statuses */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-5">📋 Booking Status Flow</h2>
          <div className="flex flex-wrap gap-2">
            {["Draft","Active","Matched","Requested","Accepted","Escrow Pending","Pickup Scheduled","Picked Up","In Transit","Arrived","Delivered","Completed","Disputed","Cancelled"].map((s) => (
              <span key={s} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium border border-gray-200">
                {s}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4">Each status transition triggers notifications, status updates, and in some cases, payment milestones.</p>
        </div>

        {/* FAQ */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="font-bold text-gray-900 mb-2">Q: {faq.q}</div>
                <div className="text-sm text-gray-600 leading-relaxed">A: {faq.a}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-10 border border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to get started?</h2>
          <p className="text-gray-500 mb-6">Join 50,000+ verified users. Free to create an account.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/signup"><Button size="lg">Create Free Account →</Button></Link>
            <Link href="/safety"><Button size="lg" variant="outline">Read Safety Guide</Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
