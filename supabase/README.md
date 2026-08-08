# Supabase setup

This project connects to your **existing** Supabase project (the one also
used by FieldMind). It does not create a new project, and every object it
creates is namespaced with the `tedx_` (tables) / `tedx-` (storage buckets)
prefix so it can't collide with anything FieldMind already owns.

## 1. Run the migrations

In the Supabase dashboard: **SQL Editor → New query**, paste and run, in
order:

1. `migrations/0001_tedx_core_tables.sql`: the four application tables,
   with RLS enabled and an insert-only policy for the public forms.
2. `migrations/0002_tedx_storage.sql`: the `tedx-resumes` (private) and
   `tedx-headshots` (public-read) storage buckets. Only `tedx-resumes` is
   used by the current forms; `tedx-headshots` is unused for now but kept
   for a future per-speaker profile photo.
3. `migrations/0003_tedx_speaker_and_club_redesign.sql`: reshapes the
   speaker application table for its "Student / Faculty & Staff /
   Community" branching, and the Club interest table for its full survey.

All three files are idempotent (`if not exists` / `on conflict do
nothing`), so re-running them is safe.

If you use the Supabase CLI instead:

```bash
supabase db push --db-url "$SUPABASE_DB_URL"
```

## 2. Set environment variables

Copy `.env.example` to `.env.local` and fill in your existing project's
values (Supabase dashboard → Project Settings → API):

```bash
cp .env.example .env.local
```

```
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-public-key>
```

`.env.local` is git-ignored, never commit real credentials. The site reads
these via `import.meta.env` at build time (see `src/lib/supabase.ts`); if
they're missing, forms fail gracefully with an inline error instead of
crashing the page (see "Behavior without credentials" below).

For deployment (Vercel, etc.), set the same two variables in the project's
environment variable settings. Do not hardcode them anywhere in source.

Only the anon/public key is ever used client-side. Nothing in this app uses
or exposes a service-role key.

## 3. Data isolation from FieldMind

- All tables: `public.tedx_speaker_applications`, `public.tedx_volunteer_applications`,
  `public.tedx_audience_registrations`, `public.tedx_club_interest`.
- All storage buckets: `tedx-resumes`, `tedx-headshots`.
- RLS is enabled on every table with an **insert-only** policy for
  `anon`/`authenticated`: the public forms can submit but can never read,
  update, or delete rows (including their own). Nothing here grants any
  access to FieldMind's tables, and nothing FieldMind owns is modified.

## 4. Admin dashboard (not built yet, but the data is ready for it)

Reads/updates (approve a speaker, export a CSV, mark a volunteer
confirmed, etc.) are intentionally not exposed to the anon key. When an
admin surface is built, it should authenticate and either:

- use the Supabase **service role key** from a trusted server context
  (Edge Function, serverless API route) that bypasses RLS, or
- add a scoped RLS policy for an authenticated `admin` role.

`src/types/tedx.ts` already defines the full row shapes (including the
`status` columns each table carries, and the `applicant_category` column
on speaker applications) so an admin UI can be built directly against
those types without touching this schema.

## Behavior without credentials

Until `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` are set, every form
still renders and validates normally. Submission fails with a friendly
inline error ("Something went wrong, please try again") rather than a
crash, so the rest of the site (including a Vercel preview without secrets
configured) stays fully usable.
