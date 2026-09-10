import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Milestone } from '../data/roadmap';

interface RoadmapTooltipProps {
  milestone: Milestone;
  children: ReactNode;
  /** Tooltip opens above the trigger on desktop, below it on the mobile list. */
  placement?: 'top' | 'bottom';
  /** Alignment of the trigger's own content: center for the desktop column, start for the mobile row. */
  align?: 'center' | 'start';
}

/**
 * Wraps a roadmap milestone marker in a focusable trigger that reveals a
 * small tooltip (title, date, description) on hover or keyboard focus.
 */
export function RoadmapTooltip({ milestone, children, placement = 'top', align = 'center' }: RoadmapTooltipProps) {
  const [open, setOpen] = useState(false);
  const tooltipId = `milestone-tip-${milestone.id}`;

  return (
    <button
      type="button"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      aria-describedby={tooltipId}
      className={`relative flex w-full min-w-0 cursor-default flex-col rounded-lg text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EB0028]/40 ${
        align === 'center' ? 'items-center' : 'items-start'
      }`}
    >
      {children}

      <AnimatePresence>
        {open && (
          <motion.span
            id={tooltipId}
            role="tooltip"
            initial={{ opacity: 0, y: placement === 'top' ? 6 : -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: placement === 'top' ? 6 : -6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`pointer-events-none absolute z-20 w-56 rounded-xl bg-black px-4 py-3 text-left shadow-[0_16px_40px_-12px_rgba(0,0,0,0.4)] ${
              placement === 'top' ? 'bottom-full mb-3' : 'top-full mt-3'
            } ${align === 'center' ? 'left-1/2 -translate-x-1/2' : 'left-0'}`}
          >
            <span className="block text-[11px] font-semibold uppercase tracking-wide text-[#EB0028]">
              {milestone.dateLabel}
            </span>
            <span className="mt-1 block text-[13px] font-bold text-white">{milestone.title}</span>
            <span className="mt-1 block text-[12px] leading-relaxed text-[#B3B3B3]">
              {milestone.description}
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
