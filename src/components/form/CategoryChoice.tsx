import { motion } from 'framer-motion';
import type { ApplicantCategory } from '../../types/tedx';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const OPTIONS: { value: ApplicantCategory; label: string; hint: string }[] = [
  { value: 'student', label: 'Student', hint: 'Currently enrolled at Grambling' },
  { value: 'faculty_staff', label: 'Faculty / Staff', hint: 'Work at Grambling' },
  { value: 'community', label: 'Community', hint: 'Alumni, or from the wider community' },
];

interface CategoryChoiceProps {
  value: ApplicantCategory | null;
  onChange: (value: ApplicantCategory) => void;
}

/**
 * The application's opening question: "Who are you?" Deliberately not a
 * <select> - three large, equal, elegant choices that set the tone before
 * anything else is asked.
 */
export function CategoryChoice({ value, onChange }: CategoryChoiceProps) {
  return (
    <div>
      <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight text-black">
        Who are you?
      </h2>
      <p className="mt-2 text-[15px] text-black/50">
        This tells us which questions to ask next.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {OPTIONS.map((option, i) => {
          const selected = value === option.value;
          return (
            <motion.button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              aria-pressed={selected}
              className={`flex flex-col items-start rounded-2xl border px-6 py-6 text-left transition-colors duration-200 ${
                selected
                  ? 'border-[#EB0028] bg-[#EB0028]/[0.04]'
                  : 'border-black/12 hover:border-black/30'
              }`}
            >
              <span className="text-lg font-bold text-black">{option.label}</span>
              <span className="mt-1 text-[13px] text-black/50">{option.hint}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
