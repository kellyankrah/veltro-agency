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

Note on the hero video specifically: the file that was supplied during
development turned out to be a screen-recorded social clip with burned-in
captions and a watermark, not raw event footage, so it was intentionally
**not** wired in — the hero currently always shows its gradient fallback.
Drop a real `hero-background.mp4` (and optionally a `hero-poster.jpg`
first-frame image) into `public/hero/` to activate it.

## Speakers section

`src/data/speakers.ts` exports an empty `SPEAKERS` array, which renders an
elegant "Coming Soon" state. Add entries there (`photo`, `name`,
`talkTitle`, `bio`) once speakers are announced and the section switches to
a card grid automatically — no component changes required.

## Roadmap status

The Roadmap section's milestone states (completed / current / upcoming) are
computed from the visitor's current date against `src/data/roadmap.ts`, so
the "Up next" milestone updates automatically as the event approaches — no
manual edits required as dates pass.

## Admin dashboard

Not built yet, but the data model is ready for it — see "Admin dashboard"
in `supabase/README.md` and the `status` columns already present on each
table in `src/types/tedx.ts`.
