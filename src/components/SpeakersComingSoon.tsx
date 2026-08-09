import { motion } from 'framer-motion';
import { Reveal } from './Reveal';
import { Button } from './Button';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** A simple, stylized microphone silhouette, decorative only. */
function MicSilhouette() {
  return (
    <svg viewBox="0 0 64 120" className="h-full w-full fill-white" aria-hidden="true">
      <rect x="20" y="0" width="24" height="52" rx="12" />
      <path
        d="M8 46a24 24 0 0 0 48 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <line x1="32" y1="70" x2="32" y2="96" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <line x1="14" y1="118" x2="50" y2="118" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <line x1="32" y1="96" x2="32" y2="118" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

/**
 * The stage-is-being-set state for the Speakers section, shown whenever
 * `SPEAKERS` (src/data/speakers.ts) is still empty. Purely decorative
 * spotlight/beam/mic elements, kept faint so they read as atmosphere,
 * not clutter.
 */
export function SpeakersComingSoon() {
  return (
    <Reveal delay={0.1} className="mt-16">
      <div className="relative overflow-hidden rounded-2xl bg-black px-6 py-24 text-center md:py-28">
        {/* Stage lighting: a soft red spotlight glow plus two faint angled beams. */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-1/2 top-0 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#EB0028]/25 blur-[100px]" />
          <motion.div
            className="absolute left-1/2 top-0 h-[140%] w-24 origin-top -translate-x-[140%] rotate-[10deg] bg-gradient-to-b from-white/10 to-transparent"
            initial={{ opacity: 0.15 }}
            animate={{ opacity: [0.08, 0.2, 0.08] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute left-1/2 top-0 h-[140%] w-24 origin-top translate-x-[40%] -rotate-[10deg] bg-gradient-to-b from-white/10 to-transparent"
            initial={{ opacity: 0.15 }}
            animate={{ opacity: [0.2, 0.08, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute left-1/2 top-8 h-16 w-10 -translate-x-1/2 opacity-[0.08]">
            <MicSilhouette />
          </div>
        </div>

        <div className="relative">
          <span className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#EB0028]">
            Speaker Lineup
          </span>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
            className="mx-auto mt-4 max-w-lg text-[clamp(1.4rem,3vw,2rem)] font-extrabold leading-tight tracking-tight text-white"
          >
            The stage is being prepared.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[#B3B3B3] md:text-base"
          >
            Applications are open now. Our inaugural speakers will be announced September
            12. Until then, the mic is waiting for the right idea. Maybe it's yours.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
            className="mt-8"
          >
            <Button to="/speaker" variant="brand">
              Submit My Talk
            </Button>
          </motion.div>
        </div>
      </div>
    </Reveal>
  );
}
