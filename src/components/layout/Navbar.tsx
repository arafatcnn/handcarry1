"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/find-traveler", label: "Find Traveler" },
  { href: "/send-item", label: "Send Item" },
  { href: "/sponsored-ticket", label: "Sponsorship" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/safety", label: "Safety" },
  { href: "/country-rules", label: "Country Rules" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isAuth] = useState(false); // replace with real auth check

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-teal-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">Carry<span className="text-blue-600">Bridge</span></span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-3">
            {isAuth ? (
              <Link href="/dashboard">
                <Button variant="outline" size="sm">Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/login"><Button variant="ghost" size="sm">Sign In</Button></Link>
                <Link href="/signup"><Button size="sm">Get Started</Button></Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100" onClick={() => setOpen(!open)}>
            {open ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-4 border-t border-gray-100 mt-1 pt-3">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg mb-1" onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 mt-3 px-3">
              <Link href="/login" className="flex-1"><Button variant="outline" size="sm" className="w-full">Sign In</Button></Link>
              <Link href="/signup" className="flex-1"><Button size="sm" className="w-full">Get Started</Button></Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
