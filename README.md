# TEDxGramblingStateUniversity

Landing page + application system for the inaugural TEDxGramblingStateUniversity
— presented by the Grambling State University Student Government Association.

Friday, October 23, 2026.

## Stack

- React + TypeScript
- Vite
- React Router (dedicated pages for each application, code-split per route)
- Tailwind CSS v4
- Framer Motion
- Supabase (Postgres + Storage) for application/registration data

## Development

```bash
npm install
cp .env.example .env.local   # then fill in your Supabase project's URL/anon key
npm run dev      # start the dev server
npm run build    # type-check and produce a production build
npm run preview  # preview the production build locally
npm run lint     # oxlint
```

The site works without Supabase configured — every form still renders and
validates, it just shows a friendly inline error on submit instead of
saving anything. See `supabase/README.md` for the full setup (this project
is meant to share your existing Supabase project; it doesn't create a new
one and every object it touches is `tedx_`/`tedx-`-prefixed to stay
isolated from anything else in that project).

## Routes

| Route | Page |
| --- | --- |
| `/` | Landing page (all sections) |
| `/speaker` | Speaker application |
| `/volunteer` | Volunteer application |
| `/audience` | Audience registration |
| `/club` | TEDx Club interest |
| `/speakers`, `/speakers/:slug` | Prepared for future use — see `src/pages/speakers/README.md` |

Each application is its own page (not a modal), lazy-loaded on navigation
so the landing page's initial bundle doesn't carry the form/upload code.

## Asset placeholders

Several sections reference media assets that aren't part of this repo yet.
Each is marked with an `ASSET PLACEHOLDER` comment at its usage site and
falls back to an elegant, hand-built substitute until the real file is
dropped in — no further code changes needed:

| Asset | Section | Location | Status |
| --- | --- | --- | --- |
| `hero-background.mp4` + `hero-poster.jpg` | Hero | `public/hero/` | ✅ Live — real campus b-roll, re-encoded (audio stripped, faststart) |
| `about-editorial.jpg` | About | `public/images/` | ✅ Live — campus gate |
| `tedx-club-collaboration.jpg` | TEDx Club | `public/images/` | ✅ Live — SGA students |
| `footer-panorama.jpg` | Footer | `public/images/` | ✅ Live — Student Success Center at dusk |
| `welcome-video.mp4` | Welcome Video | `public/` | Still a placeholder — not recorded yet |
| `kelly-portrait.jpg` | Meet the Organizer | `public/` | Still a placeholder — not supplied yet |
| `roadmap.svg` | Roadmap | `public/` | Not needed — CSS-drawn timeline in use instead |

Two earlier hero video submissions were screen recordings (one with
burned-in captions/watermark, one with a persistent video-player UI baked
into every frame) and were correctly rejected. The current
`hero-background.mp4` is clean b-roll — verified with `ffprobe`/`ffmpeg`
(valid H.264 High profile, faststart, decodes end-to-end with zero errors)
and by inspecting extracted frames directly; no UI chrome, no watermark.
It could not be visually confirmed playing in *this dev sandbox* — the
headless Chromium bundled with Playwright here has no H.264 decoder at all
(a licensing omission in open-source Chromium builds, confirmed via
`canPlayType`), so it correctly falls back to the gradient in that one
browser. Real Chrome/Safari/Firefox all ship licensed H.264 decoders and
will play it normally — verify in an actual browser after deploying.

`public/images/grambling-tiger-logo.jpg` (the mascot illustration) was
also supplied but isn't wired into any section — it's a graphic/logo, not
documentary photography, so forcing the same photo treatment (desaturation
etc.) onto it would look wrong. It's kept in the repo in case it's useful
for branding elsewhere later.

### Adding real photos

`src/components/EditorialImage.tsx` is the one place the site's photo
treatment lives (desaturation, contrast, rounded corners, shadow, and a
scroll-triggered reveal — fade-up, a slow zoom, or a gentle parallax
depending on where it's used). About, TEDx Club, and Footer are wired to
real photos now; Participate cards and the future Speaker profile page are
still on the placeholder path but wired the same way — passing a real
`src` is the only change needed and the placeholder disappears on its own.
The Organizer headshot and Welcome Video are deliberately left as their
own bespoke placeholders per the brief, since those assets aren't ready
yet.

## Speakers section

`src/data/speakers.ts` exports an empty `SPEAKERS` array, which renders an
anticipation-building "stage is being prepared" state (spotlight, mic
silhouette, stage-light beams — all CSS/SVG, no assets needed). Add
entries there (`photo`, `name`, `talkTitle`, `bio`, and optionally
`talkDescription` / `videoEmbedUrl` / `resources` for later) once speakers
are announced, and the section switches to a card grid automatically — no
component changes required. Each entry also automatically gets a profile
page at `/speakers/:id` (see `src/pages/speakers/README.md` — that route
is prepared architecture, not linked from navigation yet).

## Roadmap status

The Roadmap section's milestone states (completed / current / upcoming) are
computed from the visitor's current date against `src/data/roadmap.ts`, so
the "Up next" milestone updates automatically as the event approaches — no
manual edits required as dates pass. Hovering (or tabbing to) a milestone
shows a tooltip with its date and a short description, also sourced from
that file.

## First-visit loading screen

A one-time black splash (wordmark + "Ideas Worth Spreading", ~1.7s) shows
on a visitor's first load and never again within that browser tab session
(gated on `sessionStorage`, see `src/components/LoadingScreen.tsx`).
Skipped entirely for `prefers-reduced-motion`.

## Admin dashboard

Not built yet, but the data model is ready for it — see "Admin dashboard"
in `supabase/README.md` and the `status` columns already present on each
table in `src/types/tedx.ts`.
