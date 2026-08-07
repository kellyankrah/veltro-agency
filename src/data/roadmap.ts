export type MilestoneStatus = 'completed' | 'current' | 'future';

export interface Milestone {
  id: string;
  dateLabel: string;
  title: string;
  /** ISO date the milestone begins. */
  start: string;
  /** ISO date the milestone is considered resolved by. */
  end: string;
}

export const MILESTONES: Milestone[] = [
  {
    id: 'applications-open',
    dateLabel: 'August 8',
    title: 'Applications Open',
    start: '2026-08-08',
    end: '2026-08-08',
  },
  {
    id: 'applications-close',
    dateLabel: 'September 5',
    title: 'Applications Close',
    start: '2026-09-05',
    end: '2026-09-05',
  },
  {
    id: 'speaker-announcements',
    dateLabel: 'September 12',
    title: 'Speaker Announcements',
    start: '2026-09-12',
    end: '2026-09-12',
  },
  {
    id: 'speaker-coaching',
    dateLabel: 'September 15 – October 18',
    title: 'Speaker Coaching',
    start: '2026-09-15',
    end: '2026-10-18',
  },
  {
    id: 'final-rehearsal',
    dateLabel: 'October 20',
    title: 'Final Rehearsal',
    start: '2026-10-20',
    end: '2026-10-20',
  },
  {
    id: 'event-day',
    dateLabel: 'October 23',
    title: 'TEDxGramblingStateUniversity',
    start: '2026-10-23',
    end: '2026-10-23',
  },
];

/**
 * Derives each milestone's status from the current date: everything whose
 * end date has passed is complete, the next upcoming milestone is "current",
 * and everything after that is still ahead.
 */
export function getMilestoneStatuses(
  milestones: Milestone[],
  now: Date = new Date(),
): MilestoneStatus[] {
  const today = now.getTime();
  let currentAssigned = false;

  return milestones.map((milestone) => {
    const end = new Date(`${milestone.end}T23:59:59`).getTime();
    const start = new Date(`${milestone.start}T00:00:00`).getTime();

    if (end < today) return 'completed';
    if (!currentAssigned && (today >= start || end >= today)) {
      currentAssigned = true;
      return 'current';
    }
    return 'future';
  });
}
