"use client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getInitials, formatDate } from "@/lib/utils";

interface TripCardProps {
  trip: any;
  compact?: boolean;
}

export default function TripCard({ trip, compact }: TripCardProps) {
  const { traveler, from, to, departureDate, freeKg, allowedCategories, compensationMin, compensationMax, ticketSponsorship, status } = trip;

  return (
    <Card className="hover:shadow-md transition-shadow group">
      <CardContent className="p-5">
        {/* Header: avatar + name + badges */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-teal-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {getInitials(traveler.name)}
            </div>
            <div>
              <div className="font-semibold text-gray-900 text-sm">{traveler.name}</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                {traveler.verified && (
                  <Badge variant="success" className="text-xs">✓ Verified</Badge>
                )}
                {traveler.kycLevel === "full" && (
                  <Badge variant="default" className="text-xs">🔐 KYC Full</Badge>
                )}
                <span className="text-xs text-gray-500">⭐ {traveler.rating} ({traveler.reviews})</span>
              </div>
            </div>
          </div>
          {ticketSponsorship && (
            <Badge variant="warning">🎫 Open to Sponsorship</Badge>
          )}
        </div>

        {/* Route */}
        <div className="flex items-center gap-2 mb-3 bg-gray-50 rounded-lg p-3">
          <div className="text-center min-w-0 flex-1">
            <div className="font-bold text-gray-900 text-sm truncate">{from.city}</div>
            <div className="text-xs text-gray-500">{from.airport} · {from.country}</div>
          </div>
          <div className="flex flex-col items-center flex-shrink-0 px-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <span className="text-xs text-gray-400">{formatDate(departureDate)}</span>
          </div>
          <div className="text-center min-w-0 flex-1">
            <div className="font-bold text-gray-900 text-sm truncate">{to.city}</div>
            <div className="text-xs text-gray-500">{to.airport} · {to.country}</div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-blue-50 rounded-lg p-2.5">
            <div className="text-xs text-blue-600 font-medium">Free Space</div>
            <div className="font-bold text-blue-900">{freeKg} kg</div>
          </div>
          <div className="bg-teal-50 rounded-lg p-2.5">
            <div className="text-xs text-teal-600 font-medium">Carrying Fee</div>
            <div className="font-bold text-teal-900">
              {compensationMin === compensationMax
                ? `$${compensationMin}`
                : `$${compensationMin}–$${compensationMax}`}
            </div>
          </div>
        </div>

        {/* Categories */}
        {!compact && (
          <div className="mb-4">
            <div className="text-xs text-gray-500 mb-1.5">Accepted Items</div>
            <div className="flex flex-wrap gap-1">
              {allowedCategories.slice(0, 3).map((cat: string) => (
                <span key={cat} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{cat}</span>
              ))}
              {allowedCategories.length > 3 && (
                <span className="text-xs text-gray-400">+{allowedCategories.length - 3} more</span>
              )}
            </div>
          </div>
        )}

        {/* Safety notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 mb-4 text-xs text-amber-800">
          🔍 This traveler will inspect all items before accepting. Full declaration required.
        </div>

        {/* CTA */}
        <div className="flex gap-2">
          <Link href={`/trips/${trip.id}`} className="flex-1">
            <Button variant="primary" size="sm" className="w-full">View Trip</Button>
          </Link>
          <Link href={`/booking/new?trip=${trip.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">Request</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
