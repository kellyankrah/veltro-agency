import { motion } from 'framer-motion';
import { Reveal } from './Reveal';

interface Card {
  eyebrow: string;
  description: string;
  cta: string;
  href: string;
}

const CARDS: Card[] = [
  {
    eyebrow: 'Speaker',
    description: "Have an idea worth spreading?",
    cta: 'Apply',
    href: '#',
  },
  {
    eyebrow: 'Volunteer',
    description: 'Help create an unforgettable TEDx experience.',
    cta: 'Apply',
    href: '#',
  },
  {
    eyebrow: 'Audience',
    description: 'Experience powerful ideas firsthand.',
    cta: 'Register',
    href: '#',
  },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Participate() {
  return (
    <section
      id="participate"
      aria-labelledby="participate-heading"
      className="scroll-mt-24 bg-[#EB0028] px-6 py-28 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 id="participate-heading" className="sr-only">
            Participate
          </h2>
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-white/80">
            Get Involved
          </p>
          <p className="mt-4 text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold leading-tight tracking-tight text-white">
            Three ways to be part of the story.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3 md:gap-8">
          {CARDS.map((card, i) => (
            <Reveal key={card.eyebrow} delay={i * 0.1} y={28}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="flex h-full flex-col justify-between rounded-2xl bg-[#121212] p-8 md:p-10"
              >
                <div>
                  <h3 className="text-2xl font-bold text-white md:text-[28px]">
                    {card.eyebrow}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-[#B3B3B3] md:text-base">
                    {card.description}
                  </p>
                </div>

                <a
                  href={card.href}
                  className="group mt-10 inline-flex items-center gap-2 text-[15px] font-semibold text-white transition-colors duration-200 hover:text-[#EB0028]"
                >
                  {card.cta}
                  <span
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    &rarr;
                  </span>
                </a>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
