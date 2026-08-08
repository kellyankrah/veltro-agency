/**
 * Row shapes for the tedx_-prefixed Supabase tables (see
 * supabase/migrations/). Hand-written to mirror the SQL exactly; if the
 * schema changes, update both together.
 *
 * Each `*Status` union exists so a future admin dashboard has somewhere to
 * move applications through a review pipeline without a migration, see
 * supabase/README.md "Admin dashboard".
 */

export type SpeakerApplicationStatus = 'pending' | 'under_review' | 'approved' | 'rejected';

/** Which of the three application branches an applicant took. */
export type ApplicantCategory = 'student' | 'faculty_staff' | 'community';

export interface SpeakerApplicationRow {
  id: string;
  created_at: string;
  status: SpeakerApplicationStatus;
  applicant_category: ApplicantCategory;

  first_name: string;
  last_name: string;
  email: string;
  phone: string;

  // Student only
  major: string | null;
  classification: string | null;

  // Faculty & Staff only
  department: string | null;
  role_title: string | null;

  // Community only
  is_alumni: boolean | null;
  graduation_year: string | null;
  alumni_major: string | null;
  occupation: string | null;
  organization: string | null;

  // The idea, asked the same way regardless of category
  idea_description: string;
  idea_why_it_matters: string;
  idea_origin: string;
  idea_impact: string;

  // Supporting material, all optional, all categories
  resume_path: string | null;
  video_link: string | null;
  website_url: string | null;
  linkedin_url: string | null;
  additional_links: string | null;

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

/** Role options for the TEDx Club interest form - simpler than the full classification list on purpose. */
export type ClubInterestRole = 'student' | 'faculty' | 'staff';

export interface ClubInterestRow {
  id: string;
  created_at: string;

  name: string;
  email: string;
  role: ClubInterestRole;
  why_interested: string;
  club_goals: string;
  interested_in_organizing: boolean;
  notify_if_approved: boolean;
  additional_comments: string | null;
}

export type ClubInterestInsert = Omit<ClubInterestRow, 'id' | 'created_at'>;

/** Areas a volunteer can select interest in - mirrors the checkbox group in the form. */
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

/** Classification options for the volunteer and audience forms. */
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

/** Classification options for students specifically (the speaker form's student branch). */
export const STUDENT_CLASSIFICATION_OPTIONS = [
  'Freshman',
  'Sophomore',
  'Junior',
  'Senior',
  'Graduate Student',
] as const;
