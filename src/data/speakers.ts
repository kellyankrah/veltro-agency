export interface Speaker {
  id: string;
  photo: string;
  name: string;
  talkTitle: string;
  bio: string;
}

/**
 * Empty until speakers are announced (September 12 — see the Roadmap).
 * The Speakers section renders an elegant "Coming Soon" state whenever
 * this array is empty, and switches to a card grid automatically the
 * moment entries are added here — no component changes required.
 *
 * Example entry once ready:
 * {
 *   id: 'jane-doe',
 *   photo: '/images/speakers/jane-doe.jpg',
 *   name: 'Jane Doe',
 *   talkTitle: 'The Idea That Changed My Classroom',
 *   bio: 'Jane is a senior at Grambling State University studying…',
 * }
 */
export const SPEAKERS: Speaker[] = [];
