import { Reveal } from './Reveal';
import { Button } from './Button';
import { EditorialImage } from './EditorialImage';

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
              Beyond our annual event, we're exploring a TEDxGramblingStateUniversity
              Club—a home for the rest of the year, where students keep the conversation
              going: exchanging ideas, watching TED Talks, practicing public speaking, and
              growing as leaders together.
            </p>
            <div className="mt-8">
              <Button to="/club" variant="brand">
                Count Me In
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            {/* ASSET PLACEHOLDER: /images/tedx-club-collaboration.jpg — a warm,
                candid shot of students collaborating. Pass it as `src` below
                and this placeholder panel disappears on its own. */}
            <EditorialImage alt="" variant="fade-up" className="aspect-[4/3] w-full" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
