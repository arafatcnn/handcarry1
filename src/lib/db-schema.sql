-- ═══════════════════════════════════════════════════════════════════════════
-- CARRYBRIDGE DATABASE SCHEMA — PostgreSQL / Supabase
-- ═══════════════════════════════════════════════════════════════════════════

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis"; -- optional: for geo queries

-- ─── USERS ───────────────────────────────────────────────────────────────────
CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id         UUID UNIQUE, -- Supabase auth.users reference
  email           TEXT UNIQUE NOT NULL,
  phone           TEXT,
  full_name       TEXT NOT NULL,
  display_name    TEXT,
  date_of_birth   DATE,
  country_code    CHAR(2),      -- ISO 3166-1 alpha-2
  preferred_lang  VARCHAR(10) DEFAULT 'en',
  preferred_currency CHAR(3) DEFAULT 'USD',
  preferred_units VARCHAR(10) DEFAULT 'metric', -- metric | imperial
  role            TEXT[] DEFAULT ARRAY['sender'], -- sender | traveler | sponsor | admin
  is_active       BOOLEAN DEFAULT TRUE,
  is_banned       BOOLEAN DEFAULT FALSE,
  ban_reason      TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── PROFILES ────────────────────────────────────────────────────────────────
CREATE TABLE profiles (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  bio             TEXT,
  avatar_url      TEXT,
  cover_url       TEXT,
  languages       TEXT[],        -- spoken languages
  passport_countries TEXT[],     -- countries of passports held
  linkedin_url    TEXT,
  trust_score     INTEGER DEFAULT 0 CHECK (trust_score BETWEEN 0 AND 100),
  is_verified_email BOOLEAN DEFAULT FALSE,
  is_verified_phone BOOLEAN DEFAULT FALSE,
  rating_avg      NUMERIC(3,2) DEFAULT 0,
  rating_count    INTEGER DEFAULT 0,
  completion_rate NUMERIC(5,2) DEFAULT 0,
  cancellation_rate NUMERIC(5,2) DEFAULT 0,
  successful_trips  INTEGER DEFAULT 0,
  successful_shipments INTEGER DEFAULT 0,
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── IDENTITY VERIFICATIONS (KYC) ────────────────────────────────────────────
CREATE TABLE identity_verifications (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
  kyc_level       TEXT DEFAULT 'none', -- none | basic | full
  id_type         TEXT,               -- passport | national_id | driver_license
  id_number_hash  TEXT,               -- hashed, never stored plain
  id_country      CHAR(2),
  id_expiry       DATE,
  selfie_url      TEXT,               -- Supabase Storage
  id_front_url    TEXT,
  id_back_url     TEXT,
  address_proof_url TEXT,
  status          TEXT DEFAULT 'pending', -- pending | approved | rejected | expired
  reviewed_by     UUID REFERENCES users(id),
  reviewed_at     TIMESTAMPTZ,
  rejection_reason TEXT,
  submitted_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ─── TRIPS ───────────────────────────────────────────────────────────────────
CREATE TABLE trips (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  traveler_id     UUID REFERENCES users(id) ON DELETE CASCADE,
  from_country    CHAR(2) NOT NULL,
  from_city       TEXT NOT NULL,
  from_airport    VARCHAR(4),     -- IATA code
  to_country      CHAR(2) NOT NULL,
  to_city         TEXT NOT NULL,
  to_airport      VARCHAR(4),
  departure_date  DATE NOT NULL,
  arrival_date    DATE,
  departure_time  TIME,
  airline         TEXT,
  flight_number   TEXT,           -- private, not shown publicly
  baggage_type    TEXT,           -- checked | cabin | both
  free_kg         NUMERIC(6,2) NOT NULL,
  free_lb         NUMERIC(6,2),
  allowed_categories TEXT[],
  compensation_type TEXT,         -- fixed | negotiable | ticket_sponsorship | free
  compensation_min NUMERIC(10,2),
  compensation_max NUMERIC(10,2),
  compensation_currency CHAR(3),
  ticket_sponsorship BOOLEAN DEFAULT FALSE,
  pickup_available BOOLEAN DEFAULT FALSE,
  pickup_address  TEXT,
  drop_available  BOOLEAN DEFAULT FALSE,
  drop_address    TEXT,
  notes           TEXT,
  status          TEXT DEFAULT 'active', -- draft | active | booked | completed | cancelled
  is_private      BOOLEAN DEFAULT FALSE,
  views           INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── SHIPMENTS ───────────────────────────────────────────────────────────────
CREATE TABLE shipments (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id       UUID REFERENCES users(id) ON DELETE CASCADE,
  recipient_id    UUID REFERENCES users(id),
  title           TEXT NOT NULL,
  category        TEXT NOT NULL,
  description     TEXT NOT NULL,
  weight_kg       NUMERIC(6,2) NOT NULL,
  dimensions_cm   TEXT,           -- "L x W x H cm"
  declared_value  NUMERIC(10,2),
  declared_currency CHAR(3),
  quantity        INTEGER DEFAULT 1,
  is_high_risk    BOOLEAN DEFAULT FALSE,
  high_risk_reason TEXT,
  from_country    CHAR(2) NOT NULL,
  from_city       TEXT NOT NULL,
  to_country      CHAR(2) NOT NULL,
  to_city         TEXT NOT NULL,
  date_flexibility TEXT,          -- exact | ±3days | ±5days | flexible
  preferred_date  DATE,
  urgency         TEXT DEFAULT 'medium', -- low | medium | high
  offer_price     NUMERIC(10,2),
  offer_currency  CHAR(3) DEFAULT 'USD',
  duty_responsibility TEXT DEFAULT 'sender', -- sender | recipient | shared
  customs_notes   TEXT,
  invoice_uploaded BOOLEAN DEFAULT FALSE,
  inspection_allowed BOOLEAN DEFAULT TRUE,
  recipient_otp   TEXT,           -- hashed OTP for delivery confirmation
  status          TEXT DEFAULT 'active',
  delivery_confirmed_at TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── SHIPMENT DOCUMENTS ───────────────────────────────────────────────────────
CREATE TABLE documents (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type     TEXT NOT NULL,  -- shipment | verification | sponsorship
  entity_id       UUID NOT NULL,
  doc_type        TEXT NOT NULL,  -- invoice | photo | id_scan | ticket | imei
  url             TEXT NOT NULL,  -- Supabase Storage
  file_name       TEXT,
  file_size_bytes INTEGER,
  uploaded_by     UUID REFERENCES users(id),
  is_verified     BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── SPONSORSHIP REQUESTS (Traveler seeking sponsor) ─────────────────────────
CREATE TABLE sponsorship_requests (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  traveler_id     UUID REFERENCES users(id) ON DELETE CASCADE,
  from_country    CHAR(2),
  from_city       TEXT,
  from_airport    VARCHAR(4),
  to_country      CHAR(2),
  to_city         TEXT,
  to_airport      VARCHAR(4),
  date_range_start DATE,
  date_range_end   DATE,
  can_carry_kg    NUMERIC(6,2),
  accepted_categories TEXT[],
  ticket_budget_needed NUMERIC(10,2),
  partial_ok      BOOLEAN DEFAULT TRUE,
  description     TEXT,
  status          TEXT DEFAULT 'active', -- draft | active | applied | matched | funded | completed | cancelled
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── SPONSORSHIP OFFERS (Sponsor seeking traveler) ───────────────────────────
CREATE TABLE sponsorship_offers (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sponsor_id      UUID REFERENCES users(id) ON DELETE CASCADE,
  from_country    CHAR(2),
  from_city       TEXT,
  from_airport    VARCHAR(4),
  to_country      CHAR(2),
  to_city         TEXT,
  to_airport      VARCHAR(4),
  date_range_start DATE,
  date_range_end   DATE,
  cargo_kg        NUMERIC(6,2),
  cargo_categories TEXT[],
  cargo_description TEXT,
  ticket_budget   NUMERIC(10,2),
  ticket_currency CHAR(3) DEFAULT 'USD',
  partial_ok      BOOLEAN DEFAULT FALSE,
  description     TEXT,
  status          TEXT DEFAULT 'active',
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── BOOKING REQUESTS ────────────────────────────────────────────────────────
CREATE TABLE booking_requests (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id         UUID REFERENCES trips(id),
  shipment_id     UUID REFERENCES shipments(id),
  sender_id       UUID REFERENCES users(id),
  traveler_id     UUID REFERENCES users(id),
  agreed_fee      NUMERIC(10,2),
  fee_currency    CHAR(3),
  duty_agreement  TEXT,
  pickup_details  TEXT,
  dropoff_details TEXT,
  traveler_notes  TEXT,
  sender_notes    TEXT,
  status          TEXT DEFAULT 'requested',
  -- statuses: draft | requested | accepted | escrow_pending | pickup_scheduled
  --           picked_up | in_transit | arrived | delivered | completed | disputed | cancelled
  item_inspected_at TIMESTAMPTZ,   -- traveler confirmed inspection
  picked_up_at    TIMESTAMPTZ,
  in_transit_at   TIMESTAMPTZ,
  arrived_at      TIMESTAMPTZ,
  delivered_at    TIMESTAMPTZ,
  completed_at    TIMESTAMPTZ,
  cancelled_by    UUID REFERENCES users(id),
  cancelled_at    TIMESTAMPTZ,
  cancellation_reason TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── MATCHES (Smart Matching Engine results) ──────────────────────────────────
CREATE TABLE matches (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id         UUID REFERENCES trips(id),
  shipment_id     UUID REFERENCES shipments(id),
  match_score     INTEGER CHECK (match_score BETWEEN 0 AND 100),
  route_score     INTEGER,
  date_score      INTEGER,
  weight_score    INTEGER,
  category_score  INTEGER,
  compensation_score INTEGER,
  verification_score INTEGER,
  rating_score    INTEGER,
  is_notified     BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── CONVERSATIONS ───────────────────────────────────────────────────────────
CREATE TABLE conversations (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id      UUID REFERENCES booking_requests(id),
  participant_ids UUID[] NOT NULL,
  last_message_at TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── MESSAGES ────────────────────────────────────────────────────────────────
CREATE TABLE messages (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id       UUID REFERENCES users(id),
  body            TEXT NOT NULL,
  message_type    TEXT DEFAULT 'text', -- text | offer | counter_offer | system | otp
  is_read         BOOLEAN DEFAULT FALSE,
  translated_body TEXT,               -- placeholder for auto-translation
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── PAYMENTS ────────────────────────────────────────────────────────────────
CREATE TABLE payments (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id      UUID REFERENCES booking_requests(id),
  payer_id        UUID REFERENCES users(id),
  payee_id        UUID REFERENCES users(id),
  amount          NUMERIC(10,2) NOT NULL,
  currency        CHAR(3) NOT NULL,
  payment_type    TEXT, -- escrow | platform_fee | sponsorship | payout | refund
  stripe_payment_intent_id TEXT,     -- Stripe integration
  stripe_transfer_id TEXT,
  status          TEXT DEFAULT 'pending', -- pending | processing | held | released | refunded | failed
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── ESCROW RECORDS ──────────────────────────────────────────────────────────
CREATE TABLE escrow_records (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id      UUID REFERENCES booking_requests(id),
  payment_id      UUID REFERENCES payments(id),
  amount          NUMERIC(10,2),
  currency        CHAR(3),
  held_at         TIMESTAMPTZ,
  release_trigger TEXT,   -- delivery_confirmed | admin_override | dispute_resolved
  released_at     TIMESTAMPTZ,
  platform_fee    NUMERIC(10,2),
  traveler_payout NUMERIC(10,2),
  status          TEXT DEFAULT 'held' -- held | released | refunded | disputed
);

-- ─── REVIEWS ─────────────────────────────────────────────────────────────────
CREATE TABLE reviews (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id      UUID REFERENCES booking_requests(id),
  reviewer_id     UUID REFERENCES users(id),
  reviewee_id     UUID REFERENCES users(id),
  role_context    TEXT, -- sender_reviewing_traveler | traveler_reviewing_sender
  rating          INTEGER CHECK (rating BETWEEN 1 AND 5),
  title           TEXT,
  body            TEXT,
  communication   INTEGER CHECK (communication BETWEEN 1 AND 5),
  reliability     INTEGER CHECK (reliability BETWEEN 1 AND 5),
  compliance      INTEGER CHECK (compliance BETWEEN 1 AND 5),
  is_public       BOOLEAN DEFAULT TRUE,
  response        TEXT, -- reviewee can respond
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── DISPUTES ────────────────────────────────────────────────────────────────
CREATE TABLE disputes (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id      UUID REFERENCES booking_requests(id),
  raised_by       UUID REFERENCES users(id),
  against_user    UUID REFERENCES users(id),
  dispute_type    TEXT, -- non_delivery | fraud | item_damage | payment | customs_issue | other
  description     TEXT NOT NULL,
  evidence_urls   TEXT[],
  status          TEXT DEFAULT 'open', -- open | under_review | resolved | escalated | closed
  admin_assigned  UUID REFERENCES users(id),
  resolution      TEXT,
  resolved_at     TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── COUNTRY RULES ───────────────────────────────────────────────────────────
CREATE TABLE country_rules (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  country_code    CHAR(2) UNIQUE NOT NULL,
  country_name    TEXT NOT NULL,
  customs_threshold NUMERIC(10,2),
  threshold_currency CHAR(3),
  electronics_rule TEXT,
  food_rule       TEXT,
  medicine_rule   TEXT,
  phone_rule      TEXT,
  battery_rule    TEXT,
  general_notes   TEXT,
  restricted_items TEXT[],
  last_reviewed   DATE,
  is_published    BOOLEAN DEFAULT TRUE,
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── PROHIBITED ITEMS ────────────────────────────────────────────────────────
CREATE TABLE prohibited_items (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category        TEXT NOT NULL,
  description     TEXT NOT NULL,
  severity        TEXT DEFAULT 'absolute', -- absolute | conditional
  icon            TEXT,
  is_active       BOOLEAN DEFAULT TRUE
);

-- ─── NOTIFICATIONS ───────────────────────────────────────────────────────────
CREATE TABLE notifications (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
  type            TEXT, -- match | message | booking | payment | review | dispute | alert
  title           TEXT,
  body            TEXT,
  link            TEXT,
  is_read         BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── SAVED ALERTS ────────────────────────────────────────────────────────────
CREATE TABLE saved_alerts (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
  alert_type      TEXT, -- trip | shipment | sponsorship
  from_country    CHAR(2),
  from_city       TEXT,
  to_country      CHAR(2),
  to_city         TEXT,
  date_from       DATE,
  date_to         DATE,
  category        TEXT,
  weight_min      NUMERIC(6,2),
  weight_max      NUMERIC(6,2),
  price_min       NUMERIC(10,2),
  price_max       NUMERIC(10,2),
  is_active       BOOLEAN DEFAULT TRUE,
  last_triggered  TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── ADMIN LOGS ──────────────────────────────────────────────────────────────
CREATE TABLE admin_logs (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id        UUID REFERENCES users(id),
  action          TEXT NOT NULL,
  entity_type     TEXT,
  entity_id       UUID,
  notes           TEXT,
  ip_address      INET,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS) POLICIES — Supabase
-- ═══════════════════════════════════════════════════════════════════════════
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE disputes ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_alerts ENABLE ROW LEVEL SECURITY;

-- Users can read their own row; admins see all
CREATE POLICY "users_self_read" ON users FOR SELECT USING (auth.uid() = auth_id);
CREATE POLICY "profiles_public_read" ON profiles FOR SELECT USING (TRUE);
CREATE POLICY "trips_public_read" ON trips FOR SELECT USING (status = 'active');
CREATE POLICY "shipments_public_read" ON shipments FOR SELECT USING (status = 'active');
CREATE POLICY "own_notifications" ON notifications FOR ALL USING (user_id = (SELECT id FROM users WHERE auth_id = auth.uid()));
-- (Full production policies should be added per entity and role)

-- ═══════════════════════════════════════════════════════════════════════════
-- INDEXES
-- ═══════════════════════════════════════════════════════════════════════════
CREATE INDEX idx_trips_route ON trips(from_country, to_country, departure_date);
CREATE INDEX idx_trips_status ON trips(status);
CREATE INDEX idx_shipments_route ON shipments(from_country, to_country);
CREATE INDEX idx_shipments_status ON shipments(status);
CREATE INDEX idx_bookings_status ON booking_requests(status);
CREATE INDEX idx_messages_conv ON messages(conversation_id, created_at);
CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);
CREATE INDEX idx_matches_score ON matches(match_score DESC);
