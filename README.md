# TEDxGramblingStateUniversity

Landing page + application system for the inaugural TEDxGramblingStateUniversity,
presented by the Grambling State University Student Government Association.

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

The site works without Supabase configured. Every form still renders and
validates, it just shows a friendly inline error on submit instead of
saving anything. See `supabase/README.md` for the full setup (this project
is meant to share your existing Supabase project; it doesn't create a new
one and every object it touches is `tedx_`/`tedx-`-prefixed to stay
isolated from anything else in that project).

## Routes

| Route | Page |
| --- | --- |
| `/` | Landing page (all sections) |
| `/speaker` | Speaker application (multi-step, branches by applicant type) |
| `/volunteer` | Volunteer application |
| `/audience` | Audience registration |
| `/club` | TEDx Club interest survey |
| `/speakers`, `/speakers/:slug` | Prepared for future use, see `src/pages/speakers/README.md` |

Each application is its own page (not a modal), lazy-loaded on navigation
so the landing page's initial bundle doesn't carry the form/upload code.

## Speaker application

The application opens with "Who are you?": **Student**, **Faculty & Staff**,
or **Community**. That choice determines the rest of the "About You" step;
"Your Idea" and "Supporting Material" are the same for everyone. No field
asks why someone is "qualified", the questions are about the idea itself
(what it is, why it matters, where it came from, what you hope it changes).

- **Student**: major, classification.
- **Faculty & Staff**: department, role/title.
- **Community**: whether they're a GSU alum (and if so, grad year + major),
  an open-ended "What do you do?" (never a dropdown of occupations),
  organization (optional).

Supporting material (resume, video introduction, links) is optional for
every branch. See `src/pages/SpeakerApplicationPage.tsx` and
`src/components/form/CategoryChoice.tsx`.

## TEDx Club

The Club does not exist yet. The site is explicit about that: the landing
section and `/club` both frame it as "we're exploring whether there's
enough interest", never as an established program, and nothing on the
Roadmap references it (the Roadmap tracks the actual event: applications,
selection, announcement, coaching, rehearsal, event day). The interest
form collects role (student/faculty/staff), why they're interested, what
they'd want from it, whether they'd help organize, and whether to notify
them if it moves forward, no promises about meeting cadence.

## Asset placeholders

Several sections reference media assets that aren't part of this repo yet.
Each is marked with an `ASSET PLACEHOLDER` comment at its usage site and
falls back to an elegant, hand-built substitute until the real file is
dropped in, no further code changes needed:

| Asset | Section | Location | Status |
| --- | --- | --- | --- |
| `hero-background.mp4` + `hero-poster.jpg` | Hero, Participate | `public/hero/` | Live: real campus b-roll, re-encoded (audio stripped, faststart) |
| `about-editorial.jpg` | About | `public/images/` | Live: campus gate |
| `tedx-club-collaboration.jpg` | TEDx Club | `public/images/` | Live: SGA students |
| `footer-panorama.jpg` | Footer | `public/images/` | Live: Student Success Center at dusk |
| `welcome-video.mp4` | Welcome Video | `public/` | Still a placeholder, not recorded yet |
| `kelly-portrait.jpg` | Meet the Organizer | `public/` | Still a placeholder, not supplied yet |
| `roadmap.svg` | Roadmap | `public/` | Not needed, CSS-drawn timeline in use instead |

Two earlier hero video submissions were screen recordings (one with
burned-in captions/watermark, one with a persistent video-player UI baked
into every frame) and were correctly rejected. The current
`hero-background.mp4` is clean b-roll, verified with `ffprobe`/`ffmpeg`
(valid H.264 High profile, faststart, decodes end-to-end with zero errors)
and by inspecting extracted frames directly: no UI chrome, no watermark.
It could not be visually confirmed playing in *this dev sandbox*: the
headless Chromium bundled with Playwright here has no H.264 decoder at all
(a licensing omission in open-source Chromium builds, confirmed via
`canPlayType`), so it correctly falls back to the gradient in that one
browser. Real Chrome/Safari/Firefox all ship licensed H.264 decoders and
will play it normally, worth a check in an actual browser after deploying.

The same video (same 12% opacity, blur, desaturation, red wash, vignette,
grain, and slow Ken Burns scale) also plays behind the Participate section
(Speaker / Volunteer / Audience), so the two most cinematic moments on the
page share one consistent treatment instead of drifting apart over time.
Both sections render it through the shared `CinematicVideoLayer` component
(`src/components/CinematicVideoLayer.tsx`); `HeroBackground.tsx` is now a
thin wrapper around it. If the video or poster is ever unavailable,
Participate just falls back to its plain TED-red background (it never
depended on the video visually), and Hero falls back to the original
animated gradient blobs.

Four other supplied images are kept in `public/images/` but intentionally
**not** used anywhere:

- `Tiger-scaled.jpg`: the real campus tiger statue. It was briefly used as
  a faint edge overlay in About, then removed at the client's request. The
  About section now has a plain background, nothing behind the text.
- `grambling-tiger-logo.jpg`: a mascot illustration, not documentary
  photography, so the site's photo treatment (desaturation etc.) doesn't
  suit it.
- `Screen+Shot+2020-01-16+at+1.04.13+PM.webp`: a real photo, but of the
  TEDxCulverCity team, an unrelated TEDx event. Using it would misrepresent
  who's involved with this one.
- `TED-talk-2016.webp`: a real, well-known press photo from an official
  flagship TED conference (not a TEDx event). Independent TEDx licenses
  don't permit presenting an event as affiliated with TED's main
  conference, and the photo is almost certainly copyrighted press
  photography this project has no rights to.
- `ted-speaker-high-fidelity-v2-2x.webp`: reads as AI-generated (note the
  filename and the malformed "TED" signage in the image itself), which the
  brief explicitly asked to avoid.

### Adding real photos

`src/components/EditorialImage.tsx` is the one place the site's photo
treatment lives (desaturation, contrast, rounded corners, shadow, and a
scroll-triggered reveal: fade-up, a slow zoom, or a gentle parallax
depending on where it's used). About, TEDx Club, and Footer are wired to
real photos now; Participate cards and the future Speaker profile page are
still on the placeholder path but wired the same way, passing a real `src`
is the only change needed and the placeholder disappears on its own.
Participate specifically is still waiting on genuine photography (a
speaker on stage, volunteers behind the scenes, the audience from behind);
none of the currently supplied images fit those roles, so the cards stay
text-only for now rather than using a stand-in that looks like stock
photography. The Organizer headshot and Welcome Video are deliberately
left as their own bespoke placeholders per the brief, since those assets
aren't ready yet.

## Speakers section

`src/data/speakers.ts` exports an empty `SPEAKERS` array, which renders an
anticipation-building "stage is being prepared" state (spotlight, mic
silhouette, stage-light beams, all CSS/SVG, no assets needed). Add entries
there (`photo`, `name`, `talkTitle`, `bio`, and optionally
`talkDescription` / `videoEmbedUrl` / `resources` for later) once speakers
are announced, and the section switches to a card grid automatically, no
component changes required. Each entry also automatically gets a profile
page at `/speakers/:id` (see `src/pages/speakers/README.md`, that route is
prepared architecture, not linked from navigation yet).

## Roadmap status

The Roadmap section's milestone states (completed / current / upcoming) are
computed from the visitor's current date against `src/data/roadmap.ts`, so
the "Up next" milestone updates automatically as the event approaches, no
manual edits required as dates pass. Hovering (or tabbing to) a milestone
shows a tooltip with its date and a short description, also sourced from
that file.

## First-visit loading screen

A one-time black splash (wordmark + "Ideas Worth Spreading", about 1.7s)
shows on a visitor's first load and never again within that browser tab
session (gated on `sessionStorage`, see `src/components/LoadingScreen.tsx`).
Skipped entirely for `prefers-reduced-motion`.

## Admin dashboard

Not built yet, but the data model is ready for it, see "Admin dashboard"
in `supabase/README.md` and the `status` columns already present on each
table in `src/types/tedx.ts`.
