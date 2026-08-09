-- TEDxGramblingStateUniversity: core application tables
--
-- This migration is scoped entirely to `tedx_`-prefixed objects in the
-- `public` schema so it can be run safely against a shared Supabase project
-- (e.g. one already hosting the FieldMind app) without touching any
-- existing tables, policies, or buckets. Every statement is additive and
-- idempotent (IF NOT EXISTS / ON CONFLICT DO NOTHING) so it can be re-run.
--
-- Run this in the Supabase SQL editor, or via:
--   supabase db push --db-url <your-project-db-url>

-- ---------------------------------------------------------------------
-- Speaker applications
-- ---------------------------------------------------------------------
create table if not exists public.tedx_speaker_applications (
  id                    uuid primary key default gen_random_uuid(),
  created_at            timestamptz not null default now(),
  -- Admin-prep: not exposed in the UI yet, but lets a future dashboard
  -- move applications through a review pipeline without a schema change.
  status                text not null default 'pending'
                          check (status in ('pending', 'under_review', 'approved', 'rejected')),

  first_name            text not null,
  last_name             text not null,
  email                 text not null,
  phone                 text not null,
  organization          text,
  current_position      text,
  linkedin_url          text,
  instagram_url         text,
  website_url           text,

  talk_title            text not null,
  one_sentence_summary  text not null,
  idea_description      text not null,
  why_right_person      text not null,
  has_spoken_publicly   boolean not null default false,
  video_link            text,

  -- Storage object paths (see storage bucket policies below), not public URLs.
  resume_path           text,
  headshot_path         text,

  agreed_to_terms       boolean not null default false
                          check (agreed_to_terms = true)
);

comment on table public.tedx_speaker_applications is
  'TEDxGramblingStateUniversity speaker applications. Isolated via the tedx_ prefix.';

-- ---------------------------------------------------------------------
-- Volunteer applications
-- ---------------------------------------------------------------------
create table if not exists public.tedx_volunteer_applications (
  id                  uuid primary key default gen_random_uuid(),
  created_at          timestamptz not null default now(),
  status              text not null default 'pending'
                        check (status in ('pending', 'contacted', 'confirmed', 'declined')),

  name                text not null,
  email               text not null,
  phone               text not null,
  classification      text not null,
  major               text,

  -- Checkbox group, e.g. {"Registration","Stage","Social Media"}
  areas_of_interest   text[] not null default '{}',

  availability        text not null,
  experience          text,
  why_volunteer       text not null
);

comment on table public.tedx_volunteer_applications is
  'TEDxGramblingStateUniversity volunteer applications. Isolated via the tedx_ prefix.';

-- ---------------------------------------------------------------------
-- Audience registrations
-- ---------------------------------------------------------------------
create table if not exists public.tedx_audience_registrations (
  id                    uuid primary key default gen_random_uuid(),
  created_at            timestamptz not null default now(),
  status                text not null default 'confirmed'
                          check (status in ('confirmed', 'waitlisted', 'cancelled')),

  name                  text not null,
  email                 text not null,
  classification        text not null,
  major                 text,
  accessibility_needs   text,
  newsletter_opt_in     boolean not null default false
);

comment on table public.tedx_audience_registrations is
  'TEDxGramblingStateUniversity audience registrations. Isolated via the tedx_ prefix.';

-- ---------------------------------------------------------------------
-- TEDx Club interest
-- ---------------------------------------------------------------------
create table if not exists public.tedx_club_interest (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),

  name              text not null,
  email             text not null,
  classification    text not null,
  major             text,
  club_ideas        text
);

comment on table public.tedx_club_interest is
  'TEDxGramblingStateUniversity Club interest registrations. Isolated via the tedx_ prefix.';

-- ---------------------------------------------------------------------
-- Row Level Security
--
-- Public forms may INSERT their own submission but cannot read, update, or
-- delete any row, including their own. Reads are reserved for a future
-- authenticated admin surface using the service role key (which bypasses
-- RLS entirely) or a dedicated admin policy added later.
-- ---------------------------------------------------------------------
alter table public.tedx_speaker_applications enable row level security;
alter table public.tedx_volunteer_applications enable row level security;
alter table public.tedx_audience_registrations enable row level security;
alter table public.tedx_club_interest enable row level security;

drop policy if exists tedx_speaker_applications_insert on public.tedx_speaker_applications;
create policy tedx_speaker_applications_insert
  on public.tedx_speaker_applications
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists tedx_volunteer_applications_insert on public.tedx_volunteer_applications;
create policy tedx_volunteer_applications_insert
  on public.tedx_volunteer_applications
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists tedx_audience_registrations_insert on public.tedx_audience_registrations;
create policy tedx_audience_registrations_insert
  on public.tedx_audience_registrations
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists tedx_club_interest_insert on public.tedx_club_interest;
create policy tedx_club_interest_insert
  on public.tedx_club_interest
  for insert
  to anon, authenticated
  with check (true);
