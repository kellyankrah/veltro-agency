export type MilestoneStatus = 'completed' | 'current' | 'upcoming';

export interface Milestone {
  id: string;
  dateLabel: string;
  title: string;
  /** Shown in the roadmap tooltip. */
  description: string;
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
    description: 'Speaker, volunteer, and audience applications go live.',
    start: '2026-08-08',
    end: '2026-08-08',
  },
  {
    id: 'applications-close',
    dateLabel: 'September 13',
    title: 'Applications Close',
    description: 'Last day to submit a speaker or volunteer application.',
    start: '2026-09-13',
    end: '2026-09-13',
  },
  {
    id: 'speaker-announcements',
    dateLabel: 'September 20',
    title: 'Speaker Announcements',
    description: 'Our inaugural speaker lineup is revealed.',
    start: '2026-09-20',
    end: '2026-09-20',
  },
  {
    id: 'speaker-coaching',
    dateLabel: 'September 23 – October 18',
    title: 'Speaker Coaching',
    description: 'Selected speakers work with our team to shape their talks.',
    start: '2026-09-23',
    end: '2026-10-18',
  },
  {
    id: 'final-rehearsal',
    dateLabel: 'October 20',
    title: 'Final Rehearsal',
    description: 'Speakers run their talks on the actual stage.',
    start: '2026-10-20',
    end: '2026-10-20',
  },
  {
    id: 'event-day',
    dateLabel: 'October 23',
    title: 'TEDxGramblingStateUniversity',
    description: 'The inaugural event. Doors open.',
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
    return 'upcoming';
  });
}
