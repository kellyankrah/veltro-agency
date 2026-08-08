-- TEDxGramblingStateUniversity: speaker application + Club interest redesign
--
-- The speaker application moved from one generic form to a "Who are you?"
-- branch (Student / Faculty & Staff / Community) with a shared set of idea
-- questions, and the TEDx Club form moved from a two-field teaser to a
-- proper interest survey. This migration reshapes both tables in place.
-- Additive/idempotent where possible; the few drops are for fields the new
-- forms no longer collect. Safe to run whether or not 0001/0002 have
-- already been applied against real data (there shouldn't be any yet,
-- this event hasn't launched applications through this schema).

-- ---------------------------------------------------------------------
-- Speaker applications: add the new shape
-- ---------------------------------------------------------------------
alter table public.tedx_speaker_applications
  add column if not exists applicant_category text
    check (applicant_category in ('student', 'faculty_staff', 'community')),
  add column if not exists major text,
  add column if not exists classification text,
  add column if not exists department text,
  add column if not exists role_title text,
  add column if not exists is_alumni boolean,
  add column if not exists graduation_year text,
  add column if not exists alumni_major text,
  add column if not exists occupation text,
  add column if not exists organization text,
  add column if not exists idea_why_it_matters text,
  add column if not exists idea_origin text,
  add column if not exists idea_impact text,
  add column if not exists additional_links text;

-- Old organization/current_position columns are superseded by the pair
-- above (organization is reused; current_position -> role_title).
alter table public.tedx_speaker_applications
  drop column if exists current_position,
  drop column if exists instagram_url,
  drop column if exists talk_title,
  drop column if exists one_sentence_summary,
  drop column if exists why_right_person,
  drop column if exists has_spoken_publicly,
  drop column if exists headshot_path;

comment on column public.tedx_speaker_applications.applicant_category is
  'Which of the three application branches the applicant took: student, faculty_staff, or community.';
comment on column public.tedx_speaker_applications.idea_why_it_matters is
  'Answer to "Why does this idea matter to you?"';
comment on column public.tedx_speaker_applications.idea_origin is
  'Answer to "What experience, insight, research, or perspective led you to this idea?"';
comment on column public.tedx_speaker_applications.idea_impact is
  'Answer to "What do you hope people will think about differently after hearing you?"';

-- ---------------------------------------------------------------------
-- TEDx Club interest: replace the placeholder shape with the real survey
-- ---------------------------------------------------------------------
alter table public.tedx_club_interest
  add column if not exists role text
    check (role in ('student', 'faculty', 'staff')),
  add column if not exists why_interested text,
  add column if not exists club_goals text,
  add column if not exists interested_in_organizing boolean not null default false,
  add column if not exists notify_if_approved boolean not null default true,
  add column if not exists additional_comments text;

alter table public.tedx_club_interest
  drop column if exists classification,
  drop column if exists major,
  drop column if exists club_ideas;
