# Future speaker pages: architecture notes

Prepared ahead of need, per the request to future-proof this without fully
building it out yet. Nothing here is linked from navigation today; the
landing page's Speakers section (src/components/Speakers.tsx) is still the
only user-facing entry point until an announcement is ready.

## Routes

- `/speakers` → `SpeakersIndexPage`, which currently redirects to
  `/#speakers` on the landing page. Swap this for a real standalone index
  (reusing the same card grid as the landing section) once there's a
  reason to give speakers their own hub separate from the homepage.
- `/speakers/:slug` → `SpeakerProfilePage`, a working dynamic route
  already: it looks the slug up in `src/data/speakers.ts` and renders
  photo/name/talk title/bio/description/video embed/resources, each with a
  graceful fallback for whatever isn't filled in yet. Redirects to
  `/speakers` if the slug doesn't match any entry.

## Adding a speaker later

1. Add an entry to `SPEAKERS` in `src/data/speakers.ts`, where `id` doubles
   as the URL slug.
2. The landing page's card grid and this profile page both pick it up
   automatically. No component changes needed for the common case.
3. Fill in `talkDescription` / `videoEmbedUrl` / `resources` whenever
   they're ready; the profile page already handles them being absent.

## Multi-year events

If TEDxGramblingStateUniversity runs annually, the natural next step is
namespacing these under a year (`/2026/speakers/:slug`) and keying
`SPEAKERS` (or swapping it for a Supabase table) by event year. Not built
now, noted here so it's a deliberate decision later, not a rewrite.
