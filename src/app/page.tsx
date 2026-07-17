import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import TrustBanner from "@/components/shared/TrustBanner";
import TripCard from "@/components/shared/TripCard";
import { DEMO_TRIPS, DEMO_SHIPMENTS } from "@/lib/data";

const STATS = [
  { value: "180+", label: "Countries" },
  { value: "50K+", label: "Verified Users" },
  { value: "98%", label: "Delivery Rate" },
  { value: "$0", label: "Hidden Fees" },
];

const HOW_IT_WORKS = [
  {
    step: "1",
    icon: "📦",
    title: "Post Your Need",
    desc: "Sender posts item details with photos, invoice, and declared value. Traveler posts available space and accepted categories.",
  },
  {
    step: "2",
    icon: "🤝",
    title: "Smart Matching",
    desc: "Our algorithm matches senders and travelers by route, date, weight, category, and trust score. You review and negotiate.",
  },
  {
    step: "3",
    icon: "🔐",
    title: "KYC & Inspection",
    desc: "Both parties verify identity. Traveler physically inspects, photographs, and confirms all items before pickup.",
  },
  {
    step: "4",
    icon: "💳",
    title: "Escrow Payment",
    desc: "Sender deposits fee into secure escrow. Funds are only released to traveler upon confirmed delivery.",
  },
  {
    step: "5",
    icon: "✅",
    title: "Deliver & Review",
    desc: "Recipient confirms via OTP. Escrow releases. Both parties leave verified reviews. Trust score updates.",
  },
];

const ROLE_CARDS = [
  {
    icon: "📦",
    title: "Sender / Shipper",
    desc: "Send packages internationally through verified travelers — faster than freight, cheaper than courier.",
    cta: "Post a Shipment",
    href: "/send-item",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: "✈️",
    title: "Traveler / Carrier",
    desc: "Monetize your empty luggage space. Earn carrying fees on your existing trips.",
    cta: "Post a Trip",
    href: "/trips/new",
    color: "from-teal-500 to-teal-600",
  },
  {
    icon: "🎫",
    title: "Sponsored Traveler",
    desc: "Need a flight? Offer to carry legal declared cargo in exchange for full or partial ticket funding.",
    cta: "Find Sponsorship",
    href: "/sponsored-ticket",
    color: "from-amber-500 to-amber-600",
  },
  {
    icon: "💼",
    title: "Sponsor / Cargo Owner",
    desc: "Fund a traveler's ticket in exchange for carrying your legally declared cargo on their route.",
    cta: "Post Sponsorship",
    href: "/sponsorship/new",
    color: "from-purple-500 to-purple-600",
  },
];

const TESTIMONIALS = [
  {
    name: "Arif R.",
    country: "🇧🇩 Bangladesh",
    role: "Frequent Traveler",
    text: "I've made over $1,200 in extra income carrying items on my UK-Dhaka routes. The KYC and escrow systems make me feel completely safe.",
    rating: 5,
  },
  {
    name: "Priya M.",
    country: "🇮🇳 India",
    role: "Regular Sender",
    text: "Sent 4 shipments to family in Australia. Every traveler inspected items, everything declared properly. Zero issues. This is how it should be done.",
    rating: 5,
  },
  {
    name: "Elif Y.",
    country: "🇹🇷 Turkey",
    role: "Sponsored Traveler",
    text: "CarryBridge paid for my Istanbul-New York ticket through a cargo sponsor. All items were legal, fully declared. It changed how I travel.",
    rating: 5,
  },
];

const POPULAR_ROUTES = [
  { from: "Dhaka", to: "London", flag1: "🇧🇩", flag2: "🇬🇧", trips: 24 },
  { from: "Dubai", to: "Toronto", flag1: "🇦🇪", flag2: "🇨🇦", trips: 18 },
  { from: "Delhi", to: "Sydney", flag1: "🇮🇳", flag2: "🇦🇺", trips: 15 },
  { from: "Istanbul", to: "New York", flag1: "🇹🇷", flag2: "🇺🇸", trips: 21 },
  { from: "KL", to: "Doha", flag1: "🇲🇾", flag2: "🇶🇦", trips: 12 },
  { from: "Lagos", to: "London", flag1: "🇳🇬", flag2: "🇬🇧", trips: 9 },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-teal-600 text-white">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-teal-300/20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-128 h-128 rounded-full bg-blue-300/10 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="warning" className="mb-6 text-sm px-4 py-1.5 inline-flex">
              🌍 Now live in 180+ countries
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              The World's Most Trusted<br />
              <span className="text-teal-300">Hand-Carry Marketplace</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Send items internationally through verified travelers. Find flights with empty luggage space. Get your ticket sponsored for carrying legal cargo. No more chaotic WhatsApp groups.
            </p>

            {/* Quick search */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-8 max-w-3xl mx-auto border border-white/20">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="📍 From city or country"
                  className="bg-white rounded-xl px-4 py-3 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 w-full"
                />
                <input
                  type="text"
                  placeholder="📍 To city or country"
                  className="bg-white rounded-xl px-4 py-3 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 w-full"
                />
                <input
                  type="date"
                  className="bg-white rounded-xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 w-full"
                />
              </div>
              <div className="flex gap-2">
                <select className="flex-1 bg-white rounded-xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400">
                  <option value="">All item categories</option>
                  <option>Electronics</option>
                  <option>Clothing & Fashion</option>
                  <option>Documents</option>
                  <option>Food (dry, sealed)</option>
                  <option>Cosmetics & Beauty</option>
                  <option>Medicine / Health</option>
                </select>
                <Link href="/find-traveler">
                  <Button size="lg" className="bg-teal-500 hover:bg-teal-400 text-white border-0 whitespace-nowrap px-8">
                    🔍 Search Trips
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/send-item"><Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 border-0 font-semibold">📦 Send an Item</Button></Link>
              <Link href="/find-traveler"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">✈️ Find Traveler</Button></Link>
              <Link href="/sponsored-ticket"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">🎫 Get Sponsored</Button></Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative bg-blue-800/50 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-4 gap-4">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">{s.value}</div>
                  <div className="text-sm text-blue-200">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BANNER ─────────────────────────────────────────── */}
      <TrustBanner />

      {/* ── ROLE CARDS ───────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Who Uses CarryBridge?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">A structured marketplace built for four key players in the global hand-carry ecosystem.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ROLE_CARDS.map((r) => (
              <Card key={r.title} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className={`h-2 bg-gradient-to-r ${r.color}`} />
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{r.icon}</div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{r.title}</h3>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">{r.desc}</p>
                  <Link href={r.href}>
                    <Button size="sm" variant="outline" className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors">
                      {r.cta} →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="default" className="mb-3">How It Works</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Safe. Simple. Global.</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Every transaction follows a structured, trust-first workflow. No anonymous deals. No sealed unknowns.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.step} className="relative">
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-blue-200 z-0 -translate-y-0.5" />
                )}
                <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm relative z-10 text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mx-auto mb-3 text-sm">
                    {step.step}
                  </div>
                  <div className="text-2xl mb-2">{step.icon}</div>
                  <h3 className="font-bold text-gray-900 text-sm mb-2">{step.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/how-it-works">
              <Button variant="outline" size="lg">See Full Workflow Guide →</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── LIVE TRIPS ───────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Live Trip Listings</h2>
              <p className="text-sm text-gray-500 mt-1">Verified travelers with available space — updated in real time</p>
            </div>
            <Link href="/find-traveler"><Button variant="outline">View All Trips →</Button></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEMO_TRIPS.slice(0, 3).map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR ROUTES ───────────────────────────────────────── */}
      <section className="py-14 bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">Popular Global Routes</h2>
            <p className="text-blue-200 text-sm">Find active trips on the world's most traveled corridors</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {POPULAR_ROUTES.map((r) => (
              <Link
                key={`${r.from}-${r.to}`}
                href={`/find-traveler?from=${r.from}&to=${r.to}`}
                className="bg-blue-600/60 hover:bg-blue-500/60 border border-blue-500/50 rounded-xl p-4 text-center transition-colors group"
              >
                <div className="text-xl mb-1">{r.flag1} → {r.flag2}</div>
                <div className="font-semibold text-sm text-white">{r.from} → {r.to}</div>
                <div className="text-xs text-blue-200 mt-1">{r.trips} active trips</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAFETY SECTION ───────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="danger" className="mb-4">Safety First — Always</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Built for Legal, Declared Transactions Only</h2>
              <p className="text-gray-500 mb-6 leading-relaxed">
                CarryBridge is fundamentally different from chaotic Facebook groups. Every transaction is structured around compliance, transparency, and traveler safety.
              </p>
              <div className="space-y-4">
                {[
                  { icon: "🚫", title: "Zero Unknown Sealed Packages", desc: "Travelers must physically inspect and photograph all items before accepting." },
                  { icon: "📋", title: "Mandatory Declaration", desc: "Every item requires declared value, category, photos, and invoice for high-value goods." },
                  { icon: "⚖️", title: "Customs Responsibility Assigned", desc: "All bookings clearly state who bears customs duty responsibility — no ambiguity." },
                  { icon: "🌍", title: "Country Rule Center", desc: "Built-in guidance for 180+ countries — food, medicine, electronics, battery rules." },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="text-2xl flex-shrink-0">{item.icon}</div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{item.title}</div>
                      <div className="text-sm text-gray-500">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-8">
                <Link href="/safety"><Button>Read Safety Guide →</Button></Link>
                <Link href="/prohibited-items"><Button variant="outline">Prohibited Items</Button></Link>
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-2xl p-8">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">⚠️ Absolutely Prohibited on CarryBridge</h3>
              <div className="space-y-2.5">
                {[
                  "🚫 Drugs, narcotics, or controlled substances",
                  "💣 Weapons, explosives, or hazardous materials",
                  "📦 Unknown or sealed packages (zero exceptions)",
                  "💊 Illegal or undeclared prescription medicines",
                  "🏷️ Counterfeit or pirated goods of any kind",
                  "💰 Undeclared cash over country limits",
                  "🥇 Undeclared gold bullion or precious metals",
                  "🐾 Live animals without proper documentation",
                  "🔞 Pornographic or prohibited content",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-700 bg-white/70 rounded-lg px-3 py-2">
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-red-100 rounded-lg text-xs text-red-800">
                Violation of these rules will result in immediate ban, report to authorities, and legal action where applicable.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900">Trusted by Travelers Worldwide</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <Card key={t.name} className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i} className="text-amber-400">★</span>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed italic">"{t.text}"</p>
                  <div>
                    <div className="font-bold text-sm text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.country} · {t.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-teal-600 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to CarryBridge the World?</h2>
          <p className="text-blue-100 mb-8 text-lg">Join 50,000+ verified users sending items safely across 180+ countries. Free to join. Pay only on successful delivery.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/signup"><Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-bold">Get Started Free →</Button></Link>
            <Link href="/how-it-works"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">Watch How It Works</Button></Link>
          </div>
          <p className="text-xs text-blue-200 mt-6">No credit card required • Free account • KYC verification guided step-by-step</p>
        </div>
      </section>
    </div>
  );
}
