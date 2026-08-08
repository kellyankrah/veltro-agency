import { Reveal } from './Reveal';

export function Organizer() {
  return (
    <section
      id="organizer"
      aria-labelledby="organizer-heading"
      className="scroll-mt-24 bg-black px-6 py-28 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid items-center gap-14 md:grid-cols-[minmax(0,380px)_1fr] md:gap-20">
          <Reveal>
            {/* ASSET PLACEHOLDER: kelly-portrait.jpg - replace the monogram below
                with an <img src="/kelly-portrait.jpg" alt="Kelly Ankrah" /> once available. */}
            <div className="mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-[#2A2A2A] bg-gradient-to-br from-[#1a1a1a] via-[#121212] to-black shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-[clamp(4rem,10vw,6rem)] font-extrabold tracking-tight text-white/15">
                  KA
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-white/60">
              Meet the Organizer
            </p>
            <h2
              id="organizer-heading"
              className="mt-4 text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold leading-tight tracking-tight text-white"
            >
              Kelly Ankrah
            </h2>
            <div className="mt-6 flex flex-col gap-5">
              <p className="text-[16px] leading-[1.7] text-[#B3B3B3] md:text-[18px]">
                TEDxGramblingStateUniversity is proudly organized by Kelly Ankrah,
                Junior Class President of the Grambling State University Student
                Government Association.
              </p>
              <p className="text-[16px] leading-[1.7] text-[#B3B3B3] md:text-[18px]">
                Driven by a passion for leadership, innovation, and human development,
                Kelly believes universities should be places where ideas are shared as
                boldly as they are discovered.
              </p>
              <p className="text-[16px] leading-[1.7] text-[#B3B3B3] md:text-[18px]">
                Through the Student Government Association, he is committed to
                creating opportunities that empower students, elevate voices across
                campus, and strengthen the culture of leadership at Grambling.
              </p>
              <p className="text-[16px] leading-[1.7] text-white md:text-[18px]">
                TEDxGramblingStateUniversity reflects that vision: a platform where
                ideas become conversations, conversations become action, and action
                creates lasting impact.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
