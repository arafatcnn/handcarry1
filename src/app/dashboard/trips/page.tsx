import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DEMO_TRIPS } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default function MyTripsPage() {
  const myTrips = DEMO_TRIPS.slice(0, 3);
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Trips</h1>
        <Link href="/trips/new"><Button>+ Post New Trip</Button></Link>
      </div>
      {myTrips.map((trip) => (
        <Card key={trip.id}>
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-gray-900">{trip.from.city} → {trip.to.city}</span>
                  <Badge variant="success">{trip.status}</Badge>
                </div>
                <div className="text-sm text-gray-500">{formatDate(trip.departureDate)} · {trip.airline || "Airline private"}</div>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{trip.freeKg} kg free</span>
                  <span className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">${trip.compensationMin}–${trip.compensationMax}</span>
                  {trip.ticketSponsorship && <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">🎫 Sponsorship open</span>}
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">Edit</Button>
                <Button size="sm" variant="ghost">Deactivate</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      {myTrips.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <div className="text-5xl mb-3">✈️</div>
          <h3 className="font-bold text-gray-900 mb-2">No trips posted yet</h3>
          <p className="text-gray-500 mb-5">Post your first trip to start earning from your empty luggage space.</p>
          <Link href="/trips/new"><Button>Post Your First Trip →</Button></Link>
        </div>
      )}
    </div>
  );
}
