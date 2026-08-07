import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface SuccessScreenProps {
  title: string;
  message: string;
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Friendly confirmation shown in place of a form after a successful submission. */
export function SuccessScreen({ title, message }: SuccessScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      role="status"
      className="flex flex-col items-center py-16 text-center"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EB0028]"
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" className="h-8 w-8 fill-none stroke-white stroke-[2.5]">
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>

      <h2 className="mt-6 text-2xl font-extrabold text-black md:text-3xl">{title}</h2>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-black/60 md:text-base">{message}</p>

      <Link
        to="/"
        className="mt-8 inline-flex items-center justify-center rounded-full border border-black/15 px-6 py-3 text-[14px] font-semibold text-black transition-colors duration-200 hover:border-black/40"
      >
        Back to home
      </Link>
    </motion.div>
  );
}
