import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ApplicationPageShell } from '../components/ApplicationPageShell';
import { TextField } from '../components/form/TextField';
import { TextAreaField } from '../components/form/TextAreaField';
import { SelectField } from '../components/form/SelectField';
import { CheckboxField } from '../components/form/CheckboxField';
import { FileField } from '../components/form/FileField';
import { SubmitButton } from '../components/form/SubmitButton';
import { FormBanner } from '../components/form/FormBanner';
import { SuccessScreen } from '../components/form/SuccessScreen';
import { useSubmission } from '../hooks/useSubmission';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { uploadApplicationFile } from '../lib/uploads';
import { firstError, isEmail, isUrl, maxFileSize, maxWords, required } from '../lib/validation';
import type { SpeakerApplicationInsert } from '../types/tedx';

const HAS_SPOKEN_OPTIONS = ['Yes', 'No'] as const;

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  currentPosition: string;
  linkedin: string;
  instagram: string;
  website: string;
  talkTitle: string;
  oneSentenceSummary: string;
  ideaDescription: string;
  whyRightPerson: string;
  hasSpokenPublicly: string;
  videoLink: string;
  agreedToTerms: boolean;
}

const INITIAL_STATE: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  organization: '',
  currentPosition: '',
  linkedin: '',
  instagram: '',
  website: '',
  talkTitle: '',
  oneSentenceSummary: '',
  ideaDescription: '',
  whyRightPerson: '',
  hasSpokenPublicly: '',
  videoLink: '',
  agreedToTerms: false,
};

type Errors = Partial<Record<keyof FormState | 'resume' | 'headshot', string>>;

export function SpeakerApplicationPage() {
  const [form, setForm] = useState(INITIAL_STATE);
  const [resume, setResume] = useState<File | null>(null);
  const [headshot, setHeadshot] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const { status, error, run, isSubmitting, isSuccess } = useSubmission();

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  function validate(): boolean {
    const next: Errors = {
      firstName: firstError(required(form.firstName)),
      lastName: firstError(required(form.lastName)),
      email: firstError(required(form.email), isEmail(form.email)),
      phone: firstError(required(form.phone)),
      linkedin: form.linkedin ? isUrl(form.linkedin) : undefined,
      website: form.website ? isUrl(form.website) : undefined,
      videoLink: form.videoLink ? isUrl(form.videoLink) : undefined,
      talkTitle: firstError(required(form.talkTitle)),
      oneSentenceSummary: firstError(required(form.oneSentenceSummary)),
      ideaDescription: firstError(required(form.ideaDescription), maxWords(form.ideaDescription, 500)),
      whyRightPerson: firstError(required(form.whyRightPerson)),
      hasSpokenPublicly: firstError(required(form.hasSpokenPublicly)),
      resume: !resume ? 'Please attach your resume.' : maxFileSize(resume, 10),
      headshot: !headshot ? 'Please attach a headshot.' : maxFileSize(headshot, 10),
      agreedToTerms: form.agreedToTerms ? undefined : 'You must agree before submitting.',
    };
    setErrors(next);
    return Object.values(next).every((v) => !v);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) return;

    run(async () => {
      if (!isSupabaseConfigured || !supabase) {
        throw new Error(
          'This form is not connected to a database yet. Please try again later or reach out directly.',
        );
      }

      const [resumePath, headshotPath] = await Promise.all([
        resume ? uploadApplicationFile('tedx-resumes', resume) : Promise.resolve(null),
        headshot ? uploadApplicationFile('tedx-headshots', headshot) : Promise.resolve(null),
      ]);

      const payload: SpeakerApplicationInsert = {
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        organization: form.organization.trim() || null,
        current_position: form.currentPosition.trim() || null,
        linkedin_url: form.linkedin.trim() || null,
        instagram_url: form.instagram.trim() || null,
        website_url: form.website.trim() || null,
        talk_title: form.talkTitle.trim(),
        one_sentence_summary: form.oneSentenceSummary.trim(),
        idea_description: form.ideaDescription.trim(),
        why_right_person: form.whyRightPerson.trim(),
        has_spoken_publicly: form.hasSpokenPublicly === 'Yes',
        video_link: form.videoLink.trim() || null,
        resume_path: resumePath,
        headshot_path: headshotPath,
        agreed_to_terms: form.agreedToTerms,
      };

      const { error: insertError } = await supabase.from('tedx_speaker_applications').insert(payload);
      if (insertError) throw insertError;
    });
  }

  return (
    <ApplicationPageShell
      eyebrow="Participate — Speaker"
      title="Have an idea worth spreading?"
      description="Tell us about it. We're looking for original ideas, not polished résumés — our team will help you shape your talk if you're selected."
    >
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <SuccessScreen
            key="success"
            title="Your application is in."
            message="Thank you for applying to speak at TEDxGramblingStateUniversity. We review every submission and will follow up by email — speaker announcements go out September 12."
          />
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-8"
          >
            {status === 'error' && error && <FormBanner message={error} />}

            <fieldset className="flex flex-col gap-5">
              <legend className="mb-1 text-[13px] font-semibold uppercase tracking-[0.15em] text-black/40">
                About you
              </legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField id="firstName" label="First Name" required value={form.firstName} onChange={(v) => set('firstName', v)} error={errors.firstName} autoComplete="given-name" />
                <TextField id="lastName" label="Last Name" required value={form.lastName} onChange={(v) => set('lastName', v)} error={errors.lastName} autoComplete="family-name" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField id="email" label="Email" type="email" required value={form.email} onChange={(v) => set('email', v)} error={errors.email} autoComplete="email" />
                <TextField id="phone" label="Phone Number" type="tel" required value={form.phone} onChange={(v) => set('phone', v)} error={errors.phone} autoComplete="tel" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField id="organization" label="Organization" value={form.organization} onChange={(v) => set('organization', v)} />
                <TextField id="currentPosition" label="Current Position" value={form.currentPosition} onChange={(v) => set('currentPosition', v)} />
              </div>
              <div className="grid gap-5 sm:grid-cols-3">
                <TextField id="linkedin" label="LinkedIn" type="url" placeholder="https://linkedin.com/in/…" value={form.linkedin} onChange={(v) => set('linkedin', v)} error={errors.linkedin} />
                <TextField id="instagram" label="Instagram" placeholder="@handle" value={form.instagram} onChange={(v) => set('instagram', v)} />
                <TextField id="website" label="Website" type="url" placeholder="https://…" value={form.website} onChange={(v) => set('website', v)} error={errors.website} />
              </div>
            </fieldset>

            <fieldset className="flex flex-col gap-5">
              <legend className="mb-1 text-[13px] font-semibold uppercase tracking-[0.15em] text-black/40">
                Your talk
              </legend>
              <TextField id="talkTitle" label="Talk Title" required value={form.talkTitle} onChange={(v) => set('talkTitle', v)} error={errors.talkTitle} />
              <TextField id="oneSentenceSummary" label="One Sentence Summary" required value={form.oneSentenceSummary} onChange={(v) => set('oneSentenceSummary', v)} error={errors.oneSentenceSummary} />
              <TextAreaField
                id="ideaDescription"
                label="Describe your idea worth spreading"
                required
                rows={8}
                value={form.ideaDescription}
                onChange={(v) => set('ideaDescription', v)}
                error={errors.ideaDescription}
                hint="Up to 500 words."
              />
              <TextAreaField
                id="whyRightPerson"
                label="Why are you the right person to give this talk?"
                required
                rows={4}
                value={form.whyRightPerson}
                onChange={(v) => set('whyRightPerson', v)}
                error={errors.whyRightPerson}
              />
              <SelectField
                id="hasSpokenPublicly"
                label="Have you spoken publicly before?"
                required
                options={HAS_SPOKEN_OPTIONS}
                value={form.hasSpokenPublicly}
                onChange={(v) => set('hasSpokenPublicly', v)}
                error={errors.hasSpokenPublicly}
              />
              <TextField id="videoLink" label="Video Link" type="url" placeholder="https://…" hint="A past talk, pitch, or anything that shows how you present." value={form.videoLink} onChange={(v) => set('videoLink', v)} error={errors.videoLink} />
            </fieldset>

            <fieldset className="flex flex-col gap-5">
              <legend className="mb-1 text-[13px] font-semibold uppercase tracking-[0.15em] text-black/40">
                Attachments
              </legend>
              <FileField id="resume" label="Resume" required accept=".pdf,.doc,.docx" hint="PDF or Word, up to 10MB." file={resume} onChange={setResume} error={errors.resume} />
              <FileField id="headshot" label="Headshot" required accept="image/*" hint="A clear photo of you, up to 10MB." file={headshot} onChange={setHeadshot} error={errors.headshot} />
            </fieldset>

            <CheckboxField
              id="agreedToTerms"
              label="I confirm the information above is accurate and I'm available for speaker coaching if selected."
              required
              checked={form.agreedToTerms}
              onChange={(v) => set('agreedToTerms', v)}
              error={errors.agreedToTerms}
            />

            <SubmitButton submitting={isSubmitting}>Submit Application</SubmitButton>
          </motion.form>
        )}
      </AnimatePresence>
    </ApplicationPageShell>
  );
}
