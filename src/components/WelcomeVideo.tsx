import { useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from './Reveal';

export function WelcomeVideo() {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

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
            className="break-words text-[clamp(1.75rem,4vw,3rem)] font-extrabold leading-tight tracking-tight text-white"
          >
            Welcome to TEDx<wbr />Grambling<wbr />State<wbr />University
          </h2>
          <p className="mt-5 text-[16px] leading-[1.7] text-[#B3B3B3] md:text-[18px]">
            Hear why TEDx is coming to Grambling, and why this inaugural event is
            worth being part of.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-14">
          {/* Click-to-play: nothing under /welcome-video.mp4 is fetched until the
              visitor presses play, so the page never pays for video weight it
              didn't ask for. Falls back to the plain gradient card if the poster
              or video ever fails to load. */}
          <div className="relative mx-auto aspect-[4/3] w-full max-w-4xl overflow-hidden rounded-2xl border border-[#2A2A2A] bg-[#121212]">
            {playing && !failed ? (
              <video
                className="h-full w-full object-cover"
                src="/welcome-video.mp4"
                poster="/welcome-poster.jpg"
                controls
                autoPlay
                playsInline
                preload="metadata"
                onError={() => setFailed(true)}
              >
                Your browser doesn&apos;t support embedded video.
              </video>
            ) : (
              <>
                {!failed ? (
                  <img
                    src="/welcome-poster.jpg"
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    style={{ filter: 'saturate(0.88) contrast(1.06) brightness(0.97)' }}
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={() => setFailed(true)}
                  />
                ) : (
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#121212] to-black"
                    aria-hidden="true"
                  />
                )}
                <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
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
                    Watch the welcome message
                  </p>
                </div>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
