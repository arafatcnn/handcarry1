import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const CATEGORIES = [
  { icon: "🚀", title: "Getting Started", articles: 12 },
  { icon: "🔐", title: "Verification & KYC", articles: 8 },
  { icon: "📦", title: "Sending Items", articles: 15 },
  { icon: "✈️", title: "Traveling & Carrying", articles: 14 },
  { icon: "🎫", title: "Sponsorship", articles: 7 },
  { icon: "💳", title: "Payments & Escrow", articles: 11 },
  { icon: "⚖️", title: "Disputes", articles: 9 },
  { icon: "🌍", title: "Customs & Countries", articles: 20 },
];

const POPULAR = [
  "How does escrow work?",
  "What happens if I'm stopped at customs?",
  "How do I get KYC verified?",
  "Can I cancel a booking?",
  "How to inspect items properly",
  "What's the refund policy?",
  "How is my trust score calculated?",
  "Can I carry medicines legally?",
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-700 to-teal-600 text-white py-14 text-center">
        <Badge className="mb-3 bg-white/20 text-white border-white/30">Help Center</Badge>
        <h1 className="text-3xl font-bold mb-3">How can we help?</h1>
        <div className="max-w-lg mx-auto px-4 mt-5">
          <div className="relative">
            <input className="w-full bg-white rounded-xl px-5 py-3.5 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-lg" placeholder="Search help articles..." />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-xl font-bold text-gray-900 mb-5">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {CATEGORIES.map((c) => (
            <Card key={c.title} className="hover:shadow-md transition-shadow cursor-pointer group">
              <CardContent className="p-5 text-center">
                <div className="text-3xl mb-2">{c.icon}</div>
                <div className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 transition-colors">{c.title}</div>
                <div className="text-xs text-gray-400 mt-1">{c.articles} articles</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-5">Popular Questions</h2>
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 mb-10">
          {POPULAR.map((q) => (
            <button key={q} className="w-full text-left px-5 py-4 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-between group">
              <span>{q}</span>
              <span className="text-gray-400 group-hover:text-blue-500 transition-colors">→</span>
            </button>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200 rounded-2xl p-8 text-center">
          <h3 className="font-bold text-gray-900 text-lg mb-2">Still need help?</h3>
          <p className="text-gray-500 text-sm mb-5">Our compliance and support team is available 24/7 for urgent safety issues.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact"><Button>📧 Contact Support</Button></Link>
            <Link href="/dashboard/disputes"><Button variant="outline">⚖️ File a Dispute</Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
