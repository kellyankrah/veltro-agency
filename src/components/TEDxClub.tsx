import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from './Reveal';

export function TEDxClub() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section
      id="tedx-club"
      aria-labelledby="tedx-club-heading"
      className="scroll-mt-24 bg-black px-6 py-28 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <h2
              id="tedx-club-heading"
              className="text-[clamp(1.75rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-tight text-white"
            >
              Great conversations shouldn't happen only once a year.
            </h2>
            <p className="mt-6 text-[16px] leading-[1.7] text-[#B3B3B3] md:text-[18px]">
              Beyond our annual TEDx event, we're exploring the possibility of
              launching the TEDxGramblingStateUniversity Club—a community where
              students gather throughout the year to exchange ideas, watch TED Talks,
              practice public speaking, and grow as leaders.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-2xl border border-[#2A2A2A] bg-[#121212] p-8 md:p-10">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  role="status"
                  className="flex flex-col items-center py-6 text-center"
                >
                  <p className="text-lg font-bold text-white">You're on the list.</p>
                  <p className="mt-2 text-[15px] text-[#B3B3B3]">
                    We'll be in touch as the TEDx Club comes to life.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <p className="mb-6 text-[13px] font-semibold uppercase tracking-[0.2em] text-white/60">
                    Register Interest
                  </p>
                  <div className="flex flex-col gap-5">
                    <div>
                      <label htmlFor="club-name" className="mb-2 block text-[13px] font-medium text-white/70">
                        Name
                      </label>
                      <input
                        id="club-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-lg border border-[#2A2A2A] bg-black px-4 py-3 text-[15px] text-white placeholder:text-[#B3B3B3]/50 focus:border-[#EB0028] focus:outline-none"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="club-email" className="mb-2 block text-[13px] font-medium text-white/70">
                        Email
                      </label>
                      <input
                        id="club-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-[#2A2A2A] bg-black px-4 py-3 text-[15px] text-white placeholder:text-[#B3B3B3]/50 focus:border-[#EB0028] focus:outline-none"
                        placeholder="you@example.com"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="mt-2 inline-flex items-center justify-center rounded-full bg-[#EB0028] px-8 py-3.5 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-[#EB0028]/90"
                    >
                      I'm Interested
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
