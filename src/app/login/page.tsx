"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Supabase auth.signIn integration here
    setTimeout(() => { setLoading(false); window.location.href = "/dashboard"; }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-500 mt-1">Sign in to your CarryBridge account</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                label="Email Address"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                required
                autoComplete="email"
              />
              <div>
                <Input
                  type="password"
                  label="Password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({...form, password: e.target.value})}
                  required
                />
                <div className="text-right mt-1">
                  <Link href="/forgot-password" className="text-xs text-blue-600 hover:underline">Forgot password?</Link>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" loading={loading}>
                Sign In
              </Button>
            </form>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
              <div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-gray-500">or continue with</span></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[{ icon: "G", label: "Google" },{ icon: "f", label: "Facebook" }].map((s) => (
                <button key={s.label} className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                  <span className="font-bold">{s.icon}</span> {s.label}
                </button>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-5 text-xs text-blue-800">
              🔐 All accounts require phone and email verification. KYC verification is required before booking or posting listings.
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-500 mt-5">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-600 font-semibold hover:underline">Create one free →</Link>
        </p>
        <p className="text-center text-xs text-gray-400 mt-3">
          By signing in you agree to our{" "}
          <Link href="/terms" className="underline">Terms of Service</Link> and{" "}
          <Link href="/privacy" className="underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
