import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ApplicationPageShell } from '../components/ApplicationPageShell';
import { CategoryChoice } from '../components/form/CategoryChoice';
import { StepIndicator } from '../components/form/StepIndicator';
import { StepNav } from '../components/form/StepNav';
import { TextField } from '../components/form/TextField';
import { TextAreaField } from '../components/form/TextAreaField';
import { SelectField } from '../components/form/SelectField';
import { CheckboxField } from '../components/form/CheckboxField';
import { FileField } from '../components/form/FileField';
import { FormBanner } from '../components/form/FormBanner';
import { PrivacyNote } from '../components/form/PrivacyNote';
import { SuccessScreen } from '../components/form/SuccessScreen';
import { useSubmission } from '../hooks/useSubmission';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { uploadApplicationFile } from '../lib/uploads';
import { firstError, isEmail, isUrl, maxWords, required } from '../lib/validation';
import type { ApplicantCategory, SpeakerApplicationInsert } from '../types/tedx';
import { STUDENT_CLASSIFICATION_OPTIONS } from '../types/tedx';

type Step = 'category' | 'about' | 'idea' | 'material';

const STEPS = [
  { number: '01', label: 'About You' },
  { number: '02', label: 'Your Idea' },
  { number: '03', label: 'Supporting Material' },
];

const DEPARTMENTS_HINT = 'e.g. Mass Communication, Biology, Student Affairs…';

interface FormState {
  category: ApplicantCategory | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  // Student
  major: string;
  classification: string;
  // Faculty & Staff
  department: string;
  roleTitle: string;
  // Community
  isAlumni: '' | 'Yes' | 'No';
  graduationYear: string;
  alumniMajor: string;
  occupation: string;
  organization: string;
  // The idea
  ideaDescription: string;
  ideaWhyItMatters: string;
  ideaOrigin: string;
  ideaImpact: string;
  // Supporting material
  videoLink: string;
  websiteUrl: string;
  linkedinUrl: string;
  additionalLinks: string;
  agreedToTerms: boolean;
}

const INITIAL_STATE: FormState = {
  category: null,
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  major: '',
  classification: '',
  department: '',
  roleTitle: '',
  isAlumni: '',
  graduationYear: '',
  alumniMajor: '',
  occupation: '',
  organization: '',
  ideaDescription: '',
  ideaWhyItMatters: '',
  ideaOrigin: '',
  ideaImpact: '',
  videoLink: '',
  websiteUrl: '',
  linkedinUrl: '',
  additionalLinks: '',
  agreedToTerms: false,
};

type Errors = Partial<Record<keyof FormState, string>>;

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function SpeakerApplicationPage() {
  const [step, setStep] = useState<Step>('category');
  const [form, setForm] = useState(INITIAL_STATE);
  const [resume, setResume] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const { status, error, run, isSubmitting, isSuccess } = useSubmission();

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  function validateAbout(): boolean {
    const next: Errors = {
      firstName: firstError(required(form.firstName)),
      lastName: firstError(required(form.lastName)),
      email: firstError(required(form.email), isEmail(form.email)),
      phone: firstError(required(form.phone)),
    };

    if (form.category === 'student') {
      next.major = firstError(required(form.major));
      next.classification = firstError(required(form.classification));
    } else if (form.category === 'faculty_staff') {
      next.department = firstError(required(form.department));
      next.roleTitle = firstError(required(form.roleTitle));
    } else if (form.category === 'community') {
      next.isAlumni = firstError(required(form.isAlumni));
      if (form.isAlumni === 'Yes') {
        next.graduationYear = firstError(required(form.graduationYear));
        next.alumniMajor = firstError(required(form.alumniMajor));
      }
      next.occupation = firstError(required(form.occupation));
    }

    setErrors((e) => ({ ...e, ...next }));
    return Object.values(next).every((v) => !v);
  }

  function validateIdea(): boolean {
    const next: Errors = {
      ideaDescription: firstError(required(form.ideaDescription)),
      ideaWhyItMatters: firstError(required(form.ideaWhyItMatters)),
      ideaOrigin: firstError(required(form.ideaOrigin)),
      ideaImpact: firstError(required(form.ideaImpact), maxWords(form.ideaImpact, 200)),
    };
    setErrors((e) => ({ ...e, ...next }));
    return Object.values(next).every((v) => !v);
  }

  function validateMaterial(): boolean {
    const next: Errors = {
      websiteUrl: form.websiteUrl ? isUrl(form.websiteUrl) : undefined,
      linkedinUrl: form.linkedinUrl ? isUrl(form.linkedinUrl) : undefined,
      videoLink: form.videoLink ? isUrl(form.videoLink) : undefined,
      agreedToTerms: form.agreedToTerms ? undefined : 'You must agree before submitting.',
    };
    setErrors((e) => ({ ...e, ...next }));
    return Object.values(next).every((v) => !v);
  }

  function goToAbout(category: ApplicantCategory) {
    set('category', category);
    setStep('about');
  }

  function handleAboutSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (validateAbout()) setStep('idea');
  }

  function handleIdeaSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (validateIdea()) setStep('material');
  }

  function handleMaterialSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validateMaterial()) return;

    run(async () => {
      if (!isSupabaseConfigured || !supabase || !form.category) {
        throw new Error(
          'This form is not connected to a database yet. Please try again later or reach out directly.',
        );
      }

      const resumePath = resume ? await uploadApplicationFile('tedx-resumes', resume) : null;

      const payload: SpeakerApplicationInsert = {
        applicant_category: form.category,
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        major: form.category === 'student' ? form.major.trim() : null,
        classification: form.category === 'student' ? form.classification : null,
        department: form.category === 'faculty_staff' ? form.department.trim() : null,
        role_title: form.category === 'faculty_staff' ? form.roleTitle.trim() : null,
        is_alumni: form.category === 'community' ? form.isAlumni === 'Yes' : null,
        graduation_year:
          form.category === 'community' && form.isAlumni === 'Yes' ? form.graduationYear.trim() : null,
        alumni_major:
          form.category === 'community' && form.isAlumni === 'Yes' ? form.alumniMajor.trim() : null,
        occupation: form.category === 'community' ? form.occupation.trim() : null,
        organization: form.category === 'community' ? form.organization.trim() || null : null,
        idea_description: form.ideaDescription.trim(),
        idea_why_it_matters: form.ideaWhyItMatters.trim(),
        idea_origin: form.ideaOrigin.trim(),
        idea_impact: form.ideaImpact.trim(),
        resume_path: resumePath,
        video_link: form.videoLink.trim() || null,
        website_url: form.websiteUrl.trim() || null,
        linkedin_url: form.linkedinUrl.trim() || null,
        additional_links: form.additionalLinks.trim() || null,
        agreed_to_terms: form.agreedToTerms,
      };

      const { error: insertError } = await supabase.from('tedx_speaker_applications').insert(payload);
      if (insertError) throw insertError;
    });
  }

  const stepIndex = step === 'about' ? 0 : step === 'idea' ? 1 : step === 'material' ? 2 : -1;

  return (
    <ApplicationPageShell
      eyebrow="Participate: Speaker"
      title="Have an idea worth spreading?"
      description="Tell us about it. We're looking for original ideas, not polished résumés. Our team will help you shape your talk if you're selected."
    >
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <SuccessScreen
            key="success"
            title="Your idea is officially in the running."
            message="Thank you for becoming part of TEDxGramblingStateUniversity. We read every submission with care and will follow up by email. Speaker announcements go out September 20. However this goes, we're glad you raised your hand."
          />
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            {step !== 'category' && (
              <div className="mb-10">
                <StepIndicator steps={STEPS} currentIndex={stepIndex} />
              </div>
            )}

            {status === 'error' && error && (
              <div className="mb-6">
                <FormBanner message={error} />
              </div>
            )}

            <AnimatePresence mode="wait">
              {step === 'category' && (
                <motion.div
                  key="category"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <CategoryChoice value={form.category} onChange={goToAbout} />
                </motion.div>
              )}

              {step === 'about' && (
                <motion.form
                  key="about"
                  onSubmit={handleAboutSubmit}
                  noValidate
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="flex flex-col gap-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <TextField id="firstName" label="First Name" required value={form.firstName} onChange={(v) => set('firstName', v)} error={errors.firstName} autoComplete="given-name" />
                    <TextField id="lastName" label="Last Name" required value={form.lastName} onChange={(v) => set('lastName', v)} error={errors.lastName} autoComplete="family-name" />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <TextField id="email" label="Email" type="email" required value={form.email} onChange={(v) => set('email', v)} error={errors.email} autoComplete="email" />
                    <TextField id="phone" label="Phone Number" type="tel" required value={form.phone} onChange={(v) => set('phone', v)} error={errors.phone} autoComplete="tel" />
                  </div>

                  {form.category === 'student' && (
                    <div className="grid gap-5 sm:grid-cols-2">
                      <TextField id="major" label="Major / Program" required value={form.major} onChange={(v) => set('major', v)} error={errors.major} />
                      <SelectField id="classification" label="Classification" required options={STUDENT_CLASSIFICATION_OPTIONS} value={form.classification} onChange={(v) => set('classification', v)} error={errors.classification} />
                    </div>
                  )}

                  {form.category === 'faculty_staff' && (
                    <div className="grid gap-5 sm:grid-cols-2">
                      <TextField id="department" label="Department" required hint={DEPARTMENTS_HINT} value={form.department} onChange={(v) => set('department', v)} error={errors.department} />
                      <TextField id="roleTitle" label="Role / Title" required value={form.roleTitle} onChange={(v) => set('roleTitle', v)} error={errors.roleTitle} />
                    </div>
                  )}

                  {form.category === 'community' && (
                    <>
                      <SelectField
                        id="isAlumni"
                        label="Are you a Grambling State University alum?"
                        required
                        options={['Yes', 'No']}
                        value={form.isAlumni}
                        onChange={(v) => set('isAlumni', v as FormState['isAlumni'])}
                        error={errors.isAlumni}
                      />
                      {form.isAlumni === 'Yes' && (
                        <div className="grid gap-5 sm:grid-cols-2">
                          <TextField id="graduationYear" label="Graduation Year" required value={form.graduationYear} onChange={(v) => set('graduationYear', v)} error={errors.graduationYear} />
                          <TextField id="alumniMajor" label="Program / Major" required value={form.alumniMajor} onChange={(v) => set('alumniMajor', v)} error={errors.alumniMajor} />
                        </div>
                      )}
                      <TextAreaField
                        id="occupation"
                        label="What do you do?"
                        required
                        rows={2}
                        hint={'Describe it your own way, e.g. "I run a local business" or "I am a retired educator."'}
                        value={form.occupation}
                        onChange={(v) => set('occupation', v)}
                        error={errors.occupation}
                      />
                      <TextField id="organization" label="Organization" hint="Optional" value={form.organization} onChange={(v) => set('organization', v)} />
                    </>
                  )}

                  <StepNav onBack={() => setStep('category')} backLabel="Who are you?" />
                </motion.form>
              )}

              {step === 'idea' && (
                <motion.form
                  key="idea"
                  onSubmit={handleIdeaSubmit}
                  noValidate
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="flex flex-col gap-6"
                >
                  <TextAreaField
                    id="ideaDescription"
                    label="What's the idea you'd like to share?"
                    required
                    rows={5}
                    value={form.ideaDescription}
                    onChange={(v) => set('ideaDescription', v)}
                    error={errors.ideaDescription}
                  />
                  <TextAreaField
                    id="ideaWhyItMatters"
                    label="Why does this idea matter to you?"
                    required
                    rows={4}
                    value={form.ideaWhyItMatters}
                    onChange={(v) => set('ideaWhyItMatters', v)}
                    error={errors.ideaWhyItMatters}
                  />
                  <TextAreaField
                    id="ideaOrigin"
                    label="What experience, insight, research, or perspective led you to this idea?"
                    required
                    rows={4}
                    value={form.ideaOrigin}
                    onChange={(v) => set('ideaOrigin', v)}
                    error={errors.ideaOrigin}
                  />
                  <TextAreaField
                    id="ideaImpact"
                    label="What do you hope people will think about differently after hearing you?"
                    required
                    rows={4}
                    hint="Up to 200 words."
                    value={form.ideaImpact}
                    onChange={(v) => set('ideaImpact', v)}
                    error={errors.ideaImpact}
                  />

                  <StepNav onBack={() => setStep('about')} />
                </motion.form>
              )}

              {step === 'material' && (
                <motion.form
                  key="material"
                  onSubmit={handleMaterialSubmit}
                  noValidate
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="flex flex-col gap-6"
                >
                  <FileField
                    id="resume"
                    label="Resume / CV"
                    accept=".pdf,.doc,.docx"
                    hint="PDF or Word, up to 10MB. Optional."
                    file={resume}
                    onChange={setResume}
                  />
                  <TextField id="videoLink" label="Video Introduction" type="url" placeholder="https://…" hint="Optional. A short video of you, if you have one." value={form.videoLink} onChange={(v) => set('videoLink', v)} error={errors.videoLink} />

                  {form.category === 'faculty_staff' ? (
                    <div className="grid gap-5 sm:grid-cols-2">
                      <TextField id="websiteUrl" label="Website" type="url" placeholder="https://…" hint="Optional" value={form.websiteUrl} onChange={(v) => set('websiteUrl', v)} error={errors.websiteUrl} />
                      <TextField id="linkedinUrl" label="LinkedIn" type="url" placeholder="https://linkedin.com/in/…" hint="Optional" value={form.linkedinUrl} onChange={(v) => set('linkedinUrl', v)} error={errors.linkedinUrl} />
                    </div>
                  ) : (
                    <TextField
                      id="additionalLinks"
                      label={form.category === 'student' ? 'Social Links' : 'Supporting Links'}
                      hint="Optional"
                      value={form.additionalLinks}
                      onChange={(v) => set('additionalLinks', v)}
                    />
                  )}

                  <CheckboxField
                    id="agreedToTerms"
                    label="I confirm the information above is accurate and I'm available for speaker coaching if selected."
                    required
                    checked={form.agreedToTerms}
                    onChange={(v) => set('agreedToTerms', v)}
                    error={errors.agreedToTerms}
                  />

                  <PrivacyNote />
                  <StepNav onBack={() => setStep('idea')} continueLabel="Submit My Talk" submitting={isSubmitting} />
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </ApplicationPageShell>
  );
}
