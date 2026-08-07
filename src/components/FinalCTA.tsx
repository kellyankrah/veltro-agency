import { Reveal } from './Reveal';
import { Button } from './Button';

export function FinalCTA() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="bg-[#EB0028] px-6 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1280px] text-center">
        <Reveal>
          <h2
            id="final-cta-heading"
            className="mx-auto max-w-4xl text-balance text-[clamp(2.25rem,6vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight text-white"
          >
            One Conversation Can Change Everything.
          </h2>
        </Reveal>

        <Reveal delay={0.15} className="mx-auto mt-8 flex max-w-xl flex-col gap-1">
          <p className="text-[16px] leading-[1.7] text-white/90 md:text-[18px]">
            Not every idea changes the world.
          </p>
          <p className="text-[16px] leading-[1.7] text-white/90 md:text-[18px]">
            But every idea that changes the world starts with one conversation.
          </p>
          <p className="mt-2 text-[16px] leading-[1.7] text-white md:text-[18px]">
            Perhaps the next one begins here.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Button to="/speaker" variant="invert">
            Become a Speaker
          </Button>
          <Button to="/volunteer" variant="invert">
            Volunteer
          </Button>
          <Button to="/audience" variant="invert">
            Join the Audience
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
