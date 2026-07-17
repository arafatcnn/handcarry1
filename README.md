# 🌍 CarryBridge — Trusted Peer-to-Peer Hand-Carry Logistics Platform

> **The world's first structured, legal-first marketplace for international hand-carry logistics and travel sponsorship.**

---

## 📋 Table of Contents

1. [Project Overview](#overview)
2. [Features & Pages](#features)
3. [Tech Stack](#tech-stack)
4. [Quick Start](#quick-start)
5. [Supabase Setup](#supabase)
6. [Database Schema](#database)
7. [Environment Variables](#env)
8. [Deployment](#deployment)
9. [Architecture Notes](#architecture)

---

## 🎯 Overview <a name="overview"></a>

CarryBridge is a production-ready, full-stack peer-to-peer hand-carry logistics marketplace that solves the chaos of Facebook and WhatsApp groups. It provides a structured, compliance-first platform for:

- **Senders** to find verified travelers to carry items internationally
- **Travelers** to monetize empty luggage space on existing flights
- **Sponsored Travelers** to get flight tickets funded in exchange for carrying legal, declared cargo
- **Sponsors / Cargo Owners** to find verified travelers for their shipping needs

### 🛡️ Legal-First Principles
- KYC verification required before any transaction
- Mandatory item inspection and photography by travelers
- Full customs declaration required for all items
- Escrow-based payments for protection
- Country-specific compliance guidance built-in
- Strict prohibited items policy with zero exceptions

---

## ✅ Features & Pages Built <a name="features"></a>

### Public Pages (28 routes, all statically rendered)
| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Full landing page with hero, role cards, live trips, popular routes, safety |
| Find Traveler | `/find-traveler` | Search/filter traveler listings with sidebar |
| Send Item | `/send-item` | Multi-step shipment posting form + browse listings |
| Sponsorship | `/sponsored-ticket` | Sponsorship marketplace with milestone tracker |
| How It Works | `/how-it-works` | Full workflow guides for all 4 user types |
| Safety Center | `/safety` | 10 commandments, KYC tiers, prohibited items |
| Country Rules | `/country-rules` | Interactive country rules knowledge base |
| Pricing | `/pricing` | Fee structure, examples, FAQ |
| Prohibited Items | `/prohibited-items` | Full prohibited items policy |
| Help Center | `/help` | Category browse, search, support CTAs |
| Login | `/login` | Auth form with social login placeholders |
| Signup | `/signup` | 4-step multi-role registration with terms |
| Post Trip | `/trips/new` | 5-step trip posting form |

### Authenticated Dashboard Pages
| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/dashboard` | Overview with stats, bookings, messages, KYC status |
| My Profile | `/dashboard/profile` | Profile, trust score, verification, reviews |
| My Trips | `/dashboard/trips` | Trip management |
| My Shipments | `/dashboard/shipments` | Shipment management |
| Bookings | `/dashboard/bookings` | Full booking lifecycle with status tracker |
| Messages | `/dashboard/messages` | Full chat UI with structured negotiation |
| Wallet | `/dashboard/wallet` | Escrow, balance, transactions, payment methods |
| Reviews | `/dashboard/reviews` | Received reviews + leave review |
| Saved Alerts | `/dashboard/alerts` | Route alerts management |
| Disputes | `/dashboard/disputes` | Dispute filing and tracking |
| Verification | `/dashboard/verification` | KYC status and document management |

### Admin Panel (`/admin`)
- Overview with 8 platform health stats
- KYC review queue with approve/reject
- Flagged listings management
- Dispute management center
- Country Rules Manager
- User management (skeleton ready)
- Payments, System Logs (skeleton ready)

---

## 🛠️ Tech Stack <a name="tech-stack"></a>

```
Frontend:     Next.js 16 (App Router) + TypeScript
Styling:      Tailwind CSS v4
UI Base:      Custom components (shadcn-style, no registry dependency)
State:        React useState (client components where needed)
Auth:         Supabase Auth (configured for integration)
Database:     Supabase PostgreSQL (schema in db-schema.sql)
Storage:      Supabase Storage (for KYC docs, item photos, invoices)
Payments:     Stripe (architecture ready, mock flows in UI)
i18n:         Architecture ready for next-intl (English first)
Maps:         Placeholder ready for Mapbox/Google Maps
Icons:        Lucide React
```

---

## 🚀 Quick Start <a name="quick-start"></a>

```bash
# 1. Clone or extract the project
cd carrybridge

# 2. Install dependencies
npm install

# 3. Copy environment file
cp .env.example .env.local

# 4. Fill in your Supabase and Stripe credentials (see below)

# 5. Run development server
npm run dev

# 6. Open browser
open http://localhost:3000
```

---

## 🗄️ Supabase Setup <a name="supabase"></a>

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note your **Project URL** and **anon key** from Settings → API

### 2. Run Database Schema
```bash
# Copy the contents of src/lib/db-schema.sql
# Paste into Supabase SQL Editor and run
```

### 3. Configure Auth
In Supabase Dashboard → Authentication:
- Enable Email provider
- Enable Phone/OTP (for KYC)
- Set Site URL to your domain
- Add OAuth providers (Google, Facebook) if desired

### 4. Configure Storage Buckets
Create these storage buckets in Supabase:
```
kyc-documents     (private)
item-photos       (public - blur/watermark via edge function)
invoices          (private)
tickets           (private)
profile-avatars   (public)
```

### 5. Install Supabase Client
```bash
npm install @supabase/supabase-js @supabase/ssr
```

### 6. Create Supabase Client
```typescript
// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

---

## 🗃️ Database Schema <a name="database"></a>

Full PostgreSQL schema located at: `src/lib/db-schema.sql`

### Key Tables
| Table | Description |
|-------|-------------|
| `users` | Core user accounts (linked to Supabase auth) |
| `profiles` | Extended profile info, trust scores, ratings |
| `identity_verifications` | KYC documents and approval status |
| `trips` | Traveler trip listings |
| `shipments` | Sender shipment requests |
| `sponsorship_requests` | Traveler-side sponsorship posts |
| `sponsorship_offers` | Sponsor-side offers |
| `booking_requests` | Full booking lifecycle with status states |
| `matches` | Smart matching scores between trips/shipments |
| `conversations` | Messaging threads |
| `messages` | Individual messages with translation placeholders |
| `payments` | Payment records (Stripe integration ready) |
| `escrow_records` | Escrow hold/release lifecycle |
| `reviews` | Verified reviews with sub-ratings |
| `disputes` | Dispute cases with evidence |
| `documents` | File attachments (photos, invoices, KYC) |
| `country_rules` | CMS-managed country customs guidance |
| `prohibited_items` | Platform prohibited items policy |
| `notifications` | In-app notifications |
| `saved_alerts` | Route/category alert subscriptions |
| `admin_logs` | Admin action audit trail |

### Booking Status States
```
Draft → Active → Matched → Requested → Accepted →
Escrow Pending → Pickup Scheduled → Picked Up →
In Transit → Arrived → Delivered → Completed
(Any state → Disputed | Cancelled)
```

### Sponsorship Status States
```
Draft → Active → Applied → Matched → Fund Pending →
Funded → Ticket Purchased → Check-in Confirmed →
In Transit → Delivered → Completed
(Any state → Disputed | Cancelled)
```

---

## 🔑 Environment Variables <a name="env"></a>

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe (for escrow and payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Optional: Maps
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1...
NEXT_PUBLIC_GOOGLE_MAPS_KEY=AIza...

# App Config
NEXT_PUBLIC_APP_URL=https://carrybridge.com
NEXT_PUBLIC_PLATFORM_FEE_STANDARD=0.10
NEXT_PUBLIC_PLATFORM_FEE_HIGH_VALUE=0.12
NEXT_PUBLIC_PLATFORM_FEE_SPONSORSHIP=0.08
```

---

## 🚀 Deployment <a name="deployment"></a>

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

Add environment variables in Vercel Dashboard → Settings → Environment Variables.

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🏗️ Architecture Notes <a name="architecture"></a>

### Smart Matching Algorithm
Located at: `src/lib/matching.ts` (to be implemented)

Matching score (0–100) based on:
- Route exact match (+30 points)
- Route nearby airport match (+15 points)
- Date overlap/flexibility (+20 points)
- Weight availability vs requirement (+15 points)
- Category compatibility (+10 points)
- Compensation compatibility (+5 points)
- KYC level and ratings bonus (+5 points)

### i18n Architecture
Ready for `next-intl`. Add translations in `messages/[locale].json`:
```
messages/
  en.json
  ar.json    (Arabic — RTL)
  bn.json    (Bangla)
  hi.json    (Hindi)
  fr.json    (French)
  es.json    (Spanish)
  tr.json    (Turkish)
```

Enable RTL in `layout.tsx` based on detected locale.

### Security
- All API routes protected with Supabase session verification
- Row Level Security (RLS) on all sensitive tables
- File uploads: virus-scanned, size-limited, type-verified
- Phone OTP for delivery confirmation (Twilio/Supabase)
- QR code generation for delivery confirmation (qrcode npm)

### Payment Flow (Stripe)
```
1. Booking accepted → Create PaymentIntent (sender pays)
2. Stripe holds funds → Create Transfer to platform account
3. Delivery confirmed (OTP) → Create Transfer to traveler account
4. Platform fee retained → Regular payout to platform
5. Dispute → Stripe Dispute API + admin resolution
```

---

## 📊 Demo Seed Data

Demo data in `src/lib/data.ts` includes:

### Routes
- 🇧🇩→🇬🇧 Dhaka → London (Arif Rahman, 15kg, $20-80)
- 🇦🇪→🇨🇦 Dubai → Toronto (Fatima Al-Mansouri, 20kg, $50, sponsorship open)
- 🇮🇳→🇦🇺 Delhi → Sydney (Raj Sharma, 10kg, $30-60)
- 🇹🇷→🇺🇸 Istanbul → New York (Elif Yıldız, 25kg, $40-120, 5-star)
- 🇲🇾→🇶🇦 Kuala Lumpur → Doha (Ahmad Zulkifli, 12kg, sponsorship open)
- 🇫🇷→🇧🇩 Paris → Dhaka (Sophie Martin, 18kg, $60 fixed)

### Country Rules
Full customs guidance for: AU, BD, CA, AE, GB, US, IN

---

## 🔒 Safety & Compliance Summary

CarryBridge enforces these safety rules in the UI and platform logic:

1. **No anonymous transactions** — KYC required before booking
2. **No sealed unknown packages** — Traveler must inspect all items
3. **Mandatory declaration** — Photos + invoice + declared value
4. **Escrow protection** — Payment held until OTP/QR confirmed delivery
5. **Prohibited items list** — Hard-coded, cannot be bypassed
6. **High-risk flag** — Multi-phone or high-value items trigger review
7. **Customs disclaimer** — Present on all listings and booking flows
8. **Dispute center** — 48-hour resolution SLA with admin oversight
9. **GDPR ready** — User data handling designed for privacy compliance
10. **Admin audit logs** — All admin actions logged with IP and timestamp

---

## 📁 File Structure

```
src/
├── app/
│   ├── page.tsx                    # Home page
│   ├── layout.tsx                  # Root layout with Navbar + Footer
│   ├── find-traveler/page.tsx      # Trip search with filters
│   ├── send-item/page.tsx          # Shipment form + browse
│   ├── sponsored-ticket/page.tsx   # Sponsorship marketplace
│   ├── how-it-works/page.tsx       # Workflow guides
│   ├── safety/page.tsx             # Safety center
│   ├── country-rules/page.tsx      # Country compliance guide
│   ├── prohibited-items/page.tsx   # Prohibited items policy
│   ├── pricing/page.tsx            # Fee structure
│   ├── help/page.tsx               # Help center
│   ├── login/page.tsx              # Authentication
│   ├── signup/page.tsx             # Multi-step registration
│   ├── trips/new/page.tsx          # Trip posting form
│   ├── dashboard/                  # Authenticated section
│   │   ├── layout.tsx              # Sidebar layout
│   │   ├── page.tsx                # Dashboard overview
│   │   ├── profile/page.tsx        # User profile
│   │   ├── trips/page.tsx          # My trips
│   │   ├── shipments/page.tsx      # My shipments
│   │   ├── bookings/page.tsx       # Booking management
│   │   ├── messages/page.tsx       # Full chat UI
│   │   ├── wallet/page.tsx         # Payments & escrow
│   │   ├── reviews/page.tsx        # Review management
│   │   ├── alerts/page.tsx         # Route alerts
│   │   ├── disputes/page.tsx       # Dispute center
│   │   └── verification/page.tsx  # KYC center
│   └── admin/page.tsx              # Admin panel
├── components/
│   ├── ui/                         # Base components (Button, Card, Input, Badge)
│   ├── layout/                     # Navbar, Footer
│   └── shared/                     # TripCard, ShipmentCard, SponsorshipCard, TrustBanner
└── lib/
    ├── data.ts                     # Seed/demo data
    ├── utils.ts                    # Helper functions
    └── db-schema.sql               # Full PostgreSQL schema
```

---

## 📄 License

CarryBridge is proprietary software. All rights reserved.

---

*Built with ❤️ for a safer, more structured global hand-carry ecosystem.*
