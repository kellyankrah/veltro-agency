import { Reveal } from './Reveal';
import { SpeakerCard } from './SpeakerCard';
import { SPEAKERS } from '../data/speakers';

export function Speakers() {
  return (
    <section
      id="speakers"
      aria-labelledby="speakers-heading"
      className="scroll-mt-24 bg-white px-6 py-28 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-black/50">
            October 23, 2026
          </p>
          <h2
            id="speakers-heading"
            className="mt-4 text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold leading-tight tracking-tight text-black"
          >
            Speakers
          </h2>
        </Reveal>

        {SPEAKERS.length > 0 ? (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SPEAKERS.map((speaker, i) => (
              <SpeakerCard key={speaker.id} speaker={speaker} delay={i * 0.08} />
            ))}
          </div>
        ) : (
          <Reveal delay={0.1} className="mt-16 flex flex-col items-center rounded-2xl border border-black/10 bg-black/[0.02] px-6 py-20 text-center">
            <span className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#EB0028]">
              Coming Soon
            </span>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-black/60 md:text-base">
              Our inaugural speaker lineup is announced September 12. Applications are open now —
              this could be you.
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
