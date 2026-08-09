import { motion } from 'framer-motion';

interface StepNavProps {
  onBack?: () => void;
  backLabel?: string;
  continueLabel?: string;
  submitting?: boolean;
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Shared back/continue row for each step of a multi-step form. */
export function StepNav({ onBack, backLabel = 'Back', continueLabel = 'Continue', submitting }: StepNavProps) {
  return (
    <div className="mt-10 flex items-center justify-between gap-4">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="text-[14px] font-semibold text-black/50 transition-colors duration-200 hover:text-black"
        >
          &larr; {backLabel}
        </button>
      ) : (
        <span />
      )}

      <motion.button
        type="submit"
        disabled={submitting}
        aria-busy={submitting}
        whileHover={submitting ? undefined : { scale: 1.02 }}
        whileTap={submitting ? undefined : { scale: 0.98 }}
        transition={{ duration: 0.25, ease: EASE }}
        className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#EB0028] px-8 py-3.5 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-[#EB0028]/90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting && (
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
            aria-hidden="true"
          />
        )}
        {submitting ? 'Submitting…' : continueLabel}
      </motion.button>
    </div>
  );
}
