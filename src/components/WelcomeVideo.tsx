import { useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from './Reveal';

export function WelcomeVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <section
      id="welcome"
      aria-labelledby="welcome-heading"
      className="scroll-mt-24 bg-black px-6 py-28 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2
            id="welcome-heading"
            className="text-[clamp(1.75rem,4vw,3rem)] font-extrabold leading-tight tracking-tight text-white"
          >
            Welcome to TEDxGramblingStateUniversity
          </h2>
          <p className="mt-5 text-[16px] leading-[1.7] text-[#B3B3B3] md:text-[18px]">
            Hear why TEDx is coming to Grambling — and why this inaugural event is
            worth being part of.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-14">
          {/* ASSET PLACEHOLDER: welcome-video.mp4 — replace this placeholder with a
              <video> element pointing at /welcome-video.mp4 once the asset exists. */}
          <div className="relative mx-auto aspect-video w-full max-w-4xl overflow-hidden rounded-2xl border border-[#2A2A2A] bg-[#121212]">
            <div
              className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#121212] to-black"
              aria-hidden="true"
            />
            <div className="relative flex h-full w-full flex-col items-center justify-center gap-5">
              <motion.button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label="Play welcome video"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-[#EB0028] shadow-[0_0_0_1px_rgba(255,255,255,0.08)] md:h-24 md:w-24"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="ml-1 h-8 w-8 fill-white md:h-9 md:w-9"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.button>
              <p className="text-[13px] font-medium uppercase tracking-[0.15em] text-white/50">
                {playing ? 'Video coming soon' : 'Watch the welcome message'}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
