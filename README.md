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

| Asset | Section | Location | Fallback |
| --- | --- | --- | --- |
| `hero-background.mp4` + `hero-poster.jpg` | Hero | `public/hero/` | Animated floating gradients (desktop skips straight to the fallback if either file is missing; mobile only ever loads the poster image, never the video) |
| `welcome-video.mp4` | Welcome Video | `public/` | Poster card with play button |
| `roadmap.svg` | Roadmap | `public/` | CSS-drawn timeline built from data |
| `kelly-portrait.jpg` | Meet the Organizer | `public/` | Monogram placeholder |
| `about-editorial.jpg` | About | `public/images/` | Gradient placeholder panel |
| `tedx-club-collaboration.jpg` | TEDx Club | `public/images/` | Gradient placeholder panel |
| `footer-panorama.jpg` | Footer | `public/images/` | Gradient placeholder (footer already has its overlay treatment built in) |

Note on the hero video: two different files have been supplied during
development, and both turned out to be screen recordings (burned-in
captions/watermark the first time; a persistent video-player UI — pause,
volume, more, expand icons — baked into every frame the second time), not
raw event footage, so neither was wired in — the hero currently always
shows its gradient fallback. Drop a real `hero-background.mp4` (and
optionally a `hero-poster.jpg` first-frame image) into `public/hero/` to
activate it; nothing else needs to change for it to take over.

### Adding real photos

`src/components/EditorialImage.tsx` is the one place the site's photo
treatment lives (desaturation, contrast, rounded corners, shadow, and a
scroll-triggered reveal — fade-up, a slow zoom, or a gentle parallax
depending on where it's used). Every placeholder panel (About, TEDx Club,
Participate cards, Footer, and the future Speaker profile page) is already
wired to it — passing a real `src` is the only change needed; the
placeholder disappears on its own. The Organizer headshot and Welcome
Video are deliberately left as their own bespoke placeholders per the
brief, since those assets aren't ready yet.

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
