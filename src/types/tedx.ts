/**
 * Row shapes for the tedx_-prefixed Supabase tables (see
 * supabase/migrations/). Hand-written to mirror the SQL exactly; if the
 * schema changes, update both together.
 *
 * Each `*Status` union exists so a future admin dashboard has somewhere to
 * move applications through a review pipeline without a migration — see
 * supabase/README.md "Admin dashboard".
 */

export type SpeakerApplicationStatus = 'pending' | 'under_review' | 'approved' | 'rejected';

export interface SpeakerApplicationRow {
  id: string;
  created_at: string;
  status: SpeakerApplicationStatus;

  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  organization: string | null;
  current_position: string | null;
  linkedin_url: string | null;
  instagram_url: string | null;
  website_url: string | null;

  talk_title: string;
  one_sentence_summary: string;
  idea_description: string;
  why_right_person: string;
  has_spoken_publicly: boolean;
  video_link: string | null;

  resume_path: string | null;
  headshot_path: string | null;

  agreed_to_terms: boolean;
}

export type SpeakerApplicationInsert = Omit<SpeakerApplicationRow, 'id' | 'created_at' | 'status'>;

export type VolunteerApplicationStatus = 'pending' | 'contacted' | 'confirmed' | 'declined';

export interface VolunteerApplicationRow {
  id: string;
  created_at: string;
  status: VolunteerApplicationStatus;

  name: string;
  email: string;
  phone: string;
  classification: string;
  major: string | null;
  areas_of_interest: string[];
  availability: string;
  experience: string | null;
  why_volunteer: string;
}

export type VolunteerApplicationInsert = Omit<VolunteerApplicationRow, 'id' | 'created_at' | 'status'>;

export type AudienceRegistrationStatus = 'confirmed' | 'waitlisted' | 'cancelled';

export interface AudienceRegistrationRow {
  id: string;
  created_at: string;
  status: AudienceRegistrationStatus;

  name: string;
  email: string;
  classification: string;
  major: string | null;
  accessibility_needs: string | null;
  newsletter_opt_in: boolean;
}

export type AudienceRegistrationInsert = Omit<AudienceRegistrationRow, 'id' | 'created_at' | 'status'>;

export interface ClubInterestRow {
  id: string;
  created_at: string;

  name: string;
  email: string;
  classification: string;
  major: string | null;
  club_ideas: string | null;
}

export type ClubInterestInsert = Omit<ClubInterestRow, 'id' | 'created_at'>;

/** Areas a volunteer can select interest in — mirrors the checkbox group in the form. */
export const VOLUNTEER_INTEREST_AREAS = [
  'Registration',
  'Speaker Support',
  'Photography',
  'Videography',
  'Social Media',
  'Stage',
  'Guest Experience',
  'Operations',
] as const;

/** Shared classification options across the volunteer, audience, and club forms. */
export const CLASSIFICATION_OPTIONS = [
  'Freshman',
  'Sophomore',
  'Junior',
  'Senior',
  'Graduate Student',
  'Faculty',
  'Staff',
  'Alumni',
  'Community Member',
] as const;
