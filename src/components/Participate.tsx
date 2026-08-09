import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Reveal } from './Reveal';
import { CinematicVideoLayer } from './CinematicVideoLayer';

interface Card {
  eyebrow: string;
  description: string;
  cta: string;
  to: string;
  /** ASSET PLACEHOLDER: set once a role-specific photo exists; the card
   *  switches from a flat dark panel to an image card automatically. */
  image?: string;
}

const CARDS: Card[] = [
  {
    eyebrow: 'Speaker',
    description: 'Have an idea worth spreading?',
    cta: 'Submit My Talk',
    to: '/speaker',
  },
  {
    eyebrow: 'Volunteer',
    description: 'Be part of the team that brings it all to life.',
    cta: 'Join the Team',
    to: '/volunteer',
  },
  {
    eyebrow: 'Audience',
    description: 'Experience powerful ideas firsthand.',
    cta: 'Reserve My Seat',
    to: '/audience',
  },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const MotionLink = motion.create(Link);

export function Participate() {
  return (
    <section
      id="participate"
      aria-labelledby="participate-heading"
      className="relative scroll-mt-24 overflow-hidden bg-[#EB0028] px-6 py-28 md:px-10 md:py-36"
    >
      <CinematicVideoLayer />

      <div className="relative mx-auto max-w-[1280px]">
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
              <MotionLink
                to={card.to}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-[#121212] p-8 md:p-10"
              >
                {card.image && (
                  <>
                    <motion.img
                      src={card.image}
                      alt=""
                      loading="lazy"
                      aria-hidden="true"
                      style={{ filter: 'saturate(0.88) contrast(1.06) brightness(0.85)' }}
                      initial={{ scale: 1.05 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: '-10%' }}
                      transition={{ duration: 1.6, delay: i * 0.1, ease: EASE }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
                  </>
                )}

                <div className="relative">
                  <h3 className="text-2xl font-bold text-white md:text-[28px]">
                    {card.eyebrow}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-[#B3B3B3] md:text-base">
                    {card.description}
                  </p>
                </div>

                <span className="relative mt-10 inline-flex items-center gap-2 text-[15px] font-semibold text-white transition-colors duration-200 group-hover:text-[#EB0028]">
                  {card.cta}
                  <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                    &rarr;
                  </span>
                </span>
              </MotionLink>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
