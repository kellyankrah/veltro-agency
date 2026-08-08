export interface SpeakerResource {
  label: string;
  url: string;
}

export interface Speaker {
  /** Also doubles as the /speakers/:slug URL segment; keep it URL-safe (lowercase, hyphenated). */
  id: string;
  photo: string;
  name: string;
  talkTitle: string;
  /** Short bio shown on the card grid. */
  bio: string;

  // --- Fields for the future individual /speakers/:slug profile page. All
  // optional so a speaker can be announced (card grid) before their full
  // profile is ready. SpeakerProfilePage renders sensible fallbacks for
  // whichever of these are still missing.
  talkDescription?: string;
  videoEmbedUrl?: string;
  resources?: SpeakerResource[];
}

/**
 * Empty until speakers are announced (September 12, see the Roadmap).
 * The Speakers section renders an elegant "Coming Soon" state whenever
 * this array is empty, and switches to a card grid automatically the
 * moment entries are added here, no component changes required. Each
 * entry also automatically gets a profile page at /speakers/:id.
 *
 * Example entry once ready:
 * {
 *   id: 'jane-doe',
 *   photo: '/images/speakers/jane-doe.jpg',
 *   name: 'Jane Doe',
 *   talkTitle: 'The Idea That Changed My Classroom',
 *   bio: 'Jane is a senior at Grambling State University studying…',
 *   talkDescription: 'A longer description of the talk for the profile page…',
 *   videoEmbedUrl: 'https://www.youtube.com/embed/…',
 *   resources: [{ label: 'Read the research', url: 'https://…' }],
 * }
 */
export const SPEAKERS: Speaker[] = [];
