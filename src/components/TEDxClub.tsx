import { Reveal } from './Reveal';
import { Button } from './Button';

export function TEDxClub() {
  return (
    <section
      id="tedx-club"
      aria-labelledby="tedx-club-heading"
      className="scroll-mt-24 bg-black px-6 py-28 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <h2
              id="tedx-club-heading"
              className="text-[clamp(1.75rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-tight text-white"
            >
              Great conversations shouldn't happen only once a year.
            </h2>
            <p className="mt-6 text-[16px] leading-[1.7] text-[#B3B3B3] md:text-[18px]">
              Beyond our annual TEDx event, we're exploring the possibility of
              launching the TEDxGramblingStateUniversity Club—a community where
              students gather throughout the year to exchange ideas, watch TED Talks,
              practice public speaking, and grow as leaders.
            </p>
            <div className="mt-8">
              <Button to="/club" variant="brand">
                I'm Interested
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            {/* ASSET PLACEHOLDER: /images/tedx-club-collaboration.jpg — a warm,
                candid shot of students collaborating. Drop the file in and
                swap this placeholder for an <img>; nothing else changes. */}
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#2A2A2A] bg-gradient-to-br from-[#1a1a1a] via-[#121212] to-black" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
