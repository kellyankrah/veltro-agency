import { motion } from 'framer-motion';
import { Reveal } from './Reveal';
import { RoadmapDot } from './RoadmapDot';
import { RoadmapTooltip } from './RoadmapTooltip';
import { MILESTONES, getMilestoneStatuses, type MilestoneStatus } from '../data/roadmap';

const TITLE_CLASSES: Record<MilestoneStatus, string> = {
  completed: 'text-black',
  current: 'text-[#EB0028]',
  upcoming: 'text-[#B3B3B3]',
};

const LINE_CLASSES: Record<MilestoneStatus, string> = {
  completed: 'bg-black/25',
  current: 'bg-[#EB0028]',
  upcoming: 'bg-[#B3B3B3]/40',
};

export function Roadmap() {
  const statuses = getMilestoneStatuses(MILESTONES);
  const currentIndex = statuses.indexOf('current');
  const progressIndex = currentIndex === -1 ? statuses.length - 1 : currentIndex;

  return (
    <section
      id="roadmap"
      aria-labelledby="roadmap-heading"
      className="scroll-mt-24 bg-white px-6 py-28 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-black/50">
            The Road to October 23
          </p>
          <h2
            id="roadmap-heading"
            className="mt-4 text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold leading-tight tracking-tight text-black"
          >
            Roadmap
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[14px] text-black/40">
            Hover or tab through a milestone for the details.
          </p>
        </Reveal>

        {/* ASSET PLACEHOLDER: roadmap.svg could replace this CSS-drawn timeline. */}
        <div className="mt-28 hidden md:block">
          <div className="relative flex items-start justify-between">
            <div className="absolute left-0 right-0 top-[7px] flex h-[2px]">
              {MILESTONES.slice(0, -1).map((milestone, i) => (
                <div
                  key={milestone.id}
                  className={`h-full flex-1 transition-colors duration-500 ${
                    i < progressIndex ? LINE_CLASSES.completed : LINE_CLASSES.upcoming
                  }`}
                />
              ))}
            </div>

            {MILESTONES.map((milestone, i) => {
              const status = statuses[i];
              return (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 flex w-full flex-col items-center px-2 text-center"
                >
                  <RoadmapTooltip milestone={milestone} placement="top">
                    <RoadmapDot status={status} />
                    <span className="mt-6 text-[13px] font-medium uppercase tracking-wide text-black/40">
                      {milestone.dateLabel}
                    </span>
                    <span className={`mt-2 text-[15px] font-bold leading-snug ${TITLE_CLASSES[status]}`}>
                      {milestone.title}
                    </span>
                  </RoadmapTooltip>
                  {status === 'current' && (
                    <span className="mt-3 rounded-full bg-[#EB0028]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#EB0028]">
                      Up next
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <ol className="mt-16 flex flex-col md:hidden">
          {MILESTONES.map((milestone, i) => {
            const status = statuses[i];
            const isLast = i === MILESTONES.length - 1;
            return (
              <motion.li
                key={milestone.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex gap-5 pb-10 last:pb-0"
              >
                <div className="flex flex-col items-center">
                  <RoadmapDot status={status} />
                  {!isLast && (
                    <span
                      className={`mt-1 w-[2px] flex-1 ${
                        i < progressIndex ? LINE_CLASSES.completed : LINE_CLASSES.upcoming
                      }`}
                      aria-hidden="true"
                    />
                  )}
                </div>
                <RoadmapTooltip milestone={milestone} placement="bottom" align="start">
                  <div className="-mt-1">
                    <span className="block text-[13px] font-medium uppercase tracking-wide text-black/40">
                      {milestone.dateLabel}
                    </span>
                    <span className={`mt-1 block text-base font-bold leading-snug ${TITLE_CLASSES[status]}`}>
                      {milestone.title}
                    </span>
                    {status === 'current' && (
                      <span className="mt-2 inline-block rounded-full bg-[#EB0028]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#EB0028]">
                        Up next
                      </span>
                    )}
                  </div>
                </RoadmapTooltip>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
