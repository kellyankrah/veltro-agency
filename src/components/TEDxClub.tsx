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
            <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-white/50">
              Exploring interest
            </p>
            <h2
              id="tedx-club-heading"
              className="mt-4 text-[clamp(1.75rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-tight text-white"
            >
              What if the ideas didn't stop at the event?
            </h2>
            <p className="mt-6 text-[16px] leading-[1.7] text-[#B3B3B3] md:text-[18px]">
              We're exploring whether there's enough interest to build a
              TEDxGramblingStateUniversity Club: a potential student-led community for
              public speaking, storytelling, idea development, discussion, debate,
              communication, and speaker preparation. It doesn't exist yet. Telling us
              you're interested is how it might.
            </p>
            <div className="mt-8">
              <Button to="/club" variant="brand">
                Count Me In
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <EditorialImage
              src="/images/tedx-club-collaboration.jpg"
              alt="Grambling State University Student Government Association members together"
              variant="fade-up"
              className="aspect-[4/3] w-full"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
