import { motion, useReducedMotion } from 'framer-motion';
import type { MilestoneStatus } from '../data/roadmap';

const DOT_CLASSES: Record<MilestoneStatus, string> = {
  completed: 'bg-white border-black/30',
  current: 'bg-[#EB0028] border-[#EB0028]',
  upcoming: 'bg-[#B3B3B3] border-[#B3B3B3]',
};

/** The timeline marker for one milestone — the "current" one pulses gently to draw the eye. */
export function RoadmapDot({ status }: { status: MilestoneStatus }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <span className="relative flex h-4 w-4 shrink-0 items-center justify-center" aria-hidden="true">
      {status === 'current' && !prefersReducedMotion && (
        <motion.span
          className="absolute inset-0 rounded-full bg-[#EB0028]/40"
          animate={{ scale: [1, 2.1, 1], opacity: [0.55, 0, 0.55] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      <span className={`relative h-4 w-4 rounded-full border-2 ${DOT_CLASSES[status]}`} />
    </span>
  );
}
