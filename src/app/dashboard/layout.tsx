"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { DEMO_USER } from "@/lib/data";
import { getInitials } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", icon: "🏠", label: "Dashboard" },
  { href: "/dashboard/profile", icon: "👤", label: "My Profile" },
  { href: "/dashboard/trips", icon: "✈️", label: "My Trips" },
  { href: "/dashboard/shipments", icon: "📦", label: "My Shipments" },
  { href: "/dashboard/bookings", icon: "📋", label: "Bookings" },
  { href: "/dashboard/messages", icon: "💬", label: "Messages", badge: 3 },
  { href: "/dashboard/wallet", icon: "💳", label: "Wallet & Payments" },
  { href: "/dashboard/reviews", icon: "⭐", label: "Reviews" },
  { href: "/dashboard/alerts", icon: "🔔", label: "Saved Alerts" },
  { href: "/dashboard/disputes", icon: "⚖️", label: "Disputes" },
  { href: "/dashboard/verification", icon: "🔐", label: "Verification Center" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const user = DEMO_USER;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-gray-50">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-16 left-0 z-40 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* User summary */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center text-white font-bold text-sm">
              {getInitials(user.name)}
            </div>
            <div className="min-w-0">
              <div className="font-bold text-gray-900 text-sm truncate">{user.name}</div>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-xs text-green-600 font-medium">✓ Verified</span>
                <span className="text-xs text-gray-400">·</span>
                <span className="text-xs text-gray-500">⭐ {user.rating}</span>
              </div>
            </div>
          </div>
          {/* Trust score */}
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Trust Score</span>
              <span className="font-bold text-blue-600">{user.trustScore}/100</span>
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-teal-500 rounded-full" style={{ width: `${user.trustScore}%` }} />
            </div>
          </div>
        </div>

        {/* Pending actions */}
        {user.pendingActions > 0 && (
          <div className="mx-4 mt-3 bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
            ⚡ {user.pendingActions} pending actions require your attention
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm font-medium transition-colors",
                  active ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <span>{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">{item.badge}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-gray-100 space-y-2">
          <Link href="/admin" className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            🛡️ Admin Panel
          </Link>
          <Link href="/" className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            ← Back to Site
          </Link>
          <button className="flex items-center gap-2 text-xs text-red-500 hover:text-red-700 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors w-full text-left">
            🚪 Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-gray-200 bg-white sticky top-16 z-20">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="font-semibold text-gray-900">Dashboard</span>
        </div>
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
