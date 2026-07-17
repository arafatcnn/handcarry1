"use client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getInitials } from "@/lib/utils";

export default function ShipmentCard({ shipment }: { shipment: any }) {
  const { sender, title, category, weight, declaredValue, currency, from, to, offerPrice, urgency, highRisk, invoiceUploaded, photos } = shipment;

  const urgencyColor = { Low: "secondary", Medium: "warning", High: "danger" } as const;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-blue-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {getInitials(sender.name)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-gray-900 text-sm truncate">{title}</div>
            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
              <Badge variant="default">{category}</Badge>
              <Badge variant={urgencyColor[urgency as keyof typeof urgencyColor]}>{urgency} Urgency</Badge>
              {highRisk && <Badge variant="danger">⚠️ High Value</Badge>}
            </div>
          </div>
        </div>

        {/* Route */}
        <div className="flex items-center gap-2 mb-3 bg-gray-50 rounded-lg p-3">
          <div className="flex-1 text-center">
            <div className="font-bold text-sm text-gray-900">{from.city}</div>
            <div className="text-xs text-gray-500">{from.country}</div>
          </div>
          <svg className="w-5 h-5 text-teal-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          <div className="flex-1 text-center">
            <div className="font-bold text-sm text-gray-900">{to.city}</div>
            <div className="text-xs text-gray-500">{to.country}</div>
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center bg-gray-50 rounded-lg p-2">
            <div className="text-xs text-gray-500">Weight</div>
            <div className="font-bold text-sm text-gray-900">{weight} kg</div>
          </div>
          <div className="text-center bg-gray-50 rounded-lg p-2">
            <div className="text-xs text-gray-500">Declared</div>
            <div className="font-bold text-sm text-gray-900">${declaredValue}</div>
          </div>
          <div className="text-center bg-teal-50 rounded-lg p-2">
            <div className="text-xs text-teal-600">Offer</div>
            <div className="font-bold text-sm text-teal-900">${offerPrice}</div>
          </div>
        </div>

        {/* Trust signals */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {invoiceUploaded && <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">✓ Invoice</span>}
          {photos > 0 && <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">📷 {photos} Photos</span>}
          <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">⭐ {sender.rating}</span>
        </div>

        {/* Safety notice */}
        {highRisk && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-2 mb-4 text-xs text-red-800">
            ⚠️ High-value item — traveler should verify invoice and inspect thoroughly.
          </div>
        )}

        <div className="flex gap-2">
          <Link href={`/shipments/${shipment.id}`} className="flex-1">
            <Button variant="primary" size="sm" className="w-full">View Details</Button>
          </Link>
          <Link href={`/booking/new?shipment=${shipment.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">Offer to Carry</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
