import { motion } from 'framer-motion';
import { Button } from './Button';
import { HeroBackground } from './HeroBackground';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#EB0028]"
    >
      <HeroBackground />

      <div className="relative z-10 mx-auto flex max-w-[1280px] flex-col items-center px-6 pb-20 pt-32 text-center md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-6 text-[13px] font-semibold uppercase tracking-[0.2em] text-white/80"
        >
          The inaugural TEDx event at Grambling State University
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="max-w-5xl break-words text-[clamp(2.25rem,7vw,5.5rem)] font-extrabold leading-[0.98] tracking-tight text-white"
        >
          TEDx<wbr />Grambling<wbr />State<wbr />University
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.22, ease: EASE }}
          className="mt-8 flex flex-col items-center gap-3"
        >
          <p className="text-2xl font-bold text-white md:text-3xl">Ideas Worth Spreading</p>
          <p className="max-w-xl text-[15px] leading-relaxed text-white/85 md:text-base">
            Presented by the Grambling State University Student Government Association
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.32, ease: EASE }}
          className="mt-6 text-[15px] font-semibold tracking-wide text-white md:text-base"
        >
          Friday, October 23, 2026
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.42, ease: EASE }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <Button to="/speaker" variant="invert">
            Become a Speaker
          </Button>
          <Button to="/volunteer" variant="invert">
            Volunteer
          </Button>
          <Button to="/audience" variant="invert">
            Join the Audience
          </Button>
          <Button to="/#about" variant="outline-invert">
            Learn More
          </Button>
        </motion.div>
      </div>

      <motion.a
        href="#welcome"
        aria-label="Scroll to next section"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <motion.span
          className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/60 p-1.5"
          aria-hidden="true"
        >
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-white"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.span>
      </motion.a>
    </section>
  );
}
