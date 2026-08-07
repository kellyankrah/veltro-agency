import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ApplicationPageShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Shared chrome for the four dedicated application pages (/speaker,
 * /volunteer, /audience, /club): a dark header banner (so the transparent
 * nav always reads against something dark) followed by the form on a
 * clean white page — each application gets its own full page, not a modal.
 */
export function ApplicationPageShell({ eyebrow, title, description, children }: ApplicationPageShellProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-black px-6 pb-16 pt-32 md:px-10 md:pb-20 md:pt-40">
        <div className="mx-auto max-w-[720px] text-center">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-white/60 transition-colors duration-200 hover:text-white"
          >
            <span aria-hidden="true">&larr;</span> Back to home
          </Link>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#EB0028]"
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
            className="mt-3 text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-tight tracking-tight text-white"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[#B3B3B3] md:text-base"
          >
            {description}
          </motion.p>
        </div>
      </div>

      <main id="main-content" tabIndex={-1} className="mx-auto max-w-[720px] px-6 py-16 md:px-10 md:py-20">
        {children}
      </main>
    </div>
  );
}
