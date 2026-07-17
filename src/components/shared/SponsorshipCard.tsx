"use client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getInitials } from "@/lib/utils";

export default function SponsorshipCard({ item }: { item: any }) {
  const isRequest = item.type === "request";
  const person = isRequest ? item.traveler : item.sponsor;

  return (
    <Card className="hover:shadow-md transition-shadow border-l-4 border-l-amber-400">
      <CardContent className="p-5">
        {/* Type badge */}
        <div className="flex items-center justify-between mb-3">
          <Badge variant={isRequest ? "warning" : "success"} className="text-xs">
            {isRequest ? "🧳 Traveler Seeking Sponsor" : "💼 Sponsor Seeking Traveler"}
          </Badge>
          {person.verified && <Badge variant="default" className="text-xs">✓ KYC Verified</Badge>}
        </div>

        {/* Person info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {getInitials(person.name)}
          </div>
          <div>
            <div className="font-semibold text-gray-900 text-sm">{person.name}</div>
            <div className="text-xs text-gray-500">⭐ {person.rating} · {person.reviews} reviews</div>
          </div>
        </div>

        {/* Route */}
        <div className="flex items-center gap-2 mb-3 bg-amber-50 rounded-lg p-3">
          <div className="flex-1 text-center">
            <div className="font-bold text-sm text-gray-900">{item.from.city}</div>
            <div className="text-xs text-gray-500">{item.from.country}</div>
          </div>
          <div className="flex flex-col items-center">
            <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <span className="text-xs text-gray-400 text-center mt-0.5 whitespace-nowrap">{item.dateRange}</span>
          </div>
          <div className="flex-1 text-center">
            <div className="font-bold text-sm text-gray-900">{item.to.city}</div>
            <div className="text-xs text-gray-500">{item.to.country}</div>
          </div>
        </div>

        {/* Key info */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-gray-50 rounded-lg p-2.5">
            <div className="text-xs text-gray-500">{isRequest ? "Can Carry" : "Cargo Weight"}</div>
            <div className="font-bold text-sm text-gray-900">
              {isRequest ? `${item.canCarryKg} kg` : `${item.cargoKg} kg`}
            </div>
          </div>
          <div className="bg-amber-50 rounded-lg p-2.5">
            <div className="text-xs text-amber-600">Ticket Budget</div>
            <div className="font-bold text-sm text-amber-900">
              ${isRequest ? item.ticketBudgetNeeded : item.ticketBudget}
              {item.partialOk && <span className="text-xs font-normal text-amber-600 ml-1">(partial OK)</span>}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-600 mb-4 line-clamp-2">{item.description}</p>

        {/* Categories */}
        <div className="flex flex-wrap gap-1 mb-4">
          {(isRequest ? item.acceptedCategories : item.cargoCategories).slice(0,3).map((c: string) => (
            <span key={c} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{c}</span>
          ))}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 mb-4 text-xs text-amber-800">
          🔐 All sponsored trips require escrow funding, KYC verification, and milestone-based release.
        </div>

        <div className="flex gap-2">
          <Link href={`/sponsorship/${item.id}`} className="flex-1">
            <Button variant="primary" size="sm" className="w-full">View Details</Button>
          </Link>
          <Link href={`/sponsorship/${item.id}/apply`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              {isRequest ? "Sponsor This" : "Apply Now"}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
