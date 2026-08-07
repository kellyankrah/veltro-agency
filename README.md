# TEDxGramblingStateUniversity

Landing page for the inaugural TEDxGramblingStateUniversity — presented by the
Grambling State University Student Government Association.

Friday, October 23, 2026.

## Stack

- React + TypeScript
- Vite
- Tailwind CSS v4
- Framer Motion

## Development

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check and produce a production build
npm run preview  # preview the production build locally
npm run lint     # oxlint
```

## Asset placeholders

A few sections reference media assets that aren't part of this repo yet.
Each is marked with an `ASSET PLACEHOLDER` comment in the source and falls
back to an elegant, hand-built substitute until the real file is dropped in:

| Asset | Section | Location | Fallback |
| --- | --- | --- | --- |
| `hero-background.mp4` | Hero | `public/` | Animated floating gradients |
| `welcome-video.mp4` | Welcome Video | `public/` | Poster card with play button |
| `roadmap.svg` | Roadmap | `public/` | CSS-drawn timeline built from data |
| `kelly-portrait.jpg` | Meet the Organizer | `public/` | Monogram placeholder |

## Roadmap status

The Roadmap section's milestone states (completed / current / future) are
computed from the visitor's current date against `src/data/roadmap.ts`, so
the "Up next" milestone updates automatically as the event approaches — no
manual edits required as dates pass.