import { motion } from 'framer-motion';

interface SubmitButtonProps {
  submitting: boolean;
  children: string;
  submittingLabel?: string;
}

export function SubmitButton({ submitting, children, submittingLabel = 'Submitting…' }: SubmitButtonProps) {
  return (
    <motion.button
      type="submit"
      disabled={submitting}
      aria-busy={submitting}
      whileHover={submitting ? undefined : { scale: 1.02 }}
      whileTap={submitting ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#EB0028] px-8 py-4 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-[#EB0028]/90 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
    >
      {submitting && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
          aria-hidden="true"
        />
      )}
      {submitting ? submittingLabel : children}
    </motion.button>
  );
}
