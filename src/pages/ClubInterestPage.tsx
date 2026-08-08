import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ApplicationPageShell } from '../components/ApplicationPageShell';
import { TextField } from '../components/form/TextField';
import { TextAreaField } from '../components/form/TextAreaField';
import { SelectField } from '../components/form/SelectField';
import { CheckboxField } from '../components/form/CheckboxField';
import { SubmitButton } from '../components/form/SubmitButton';
import { FormBanner } from '../components/form/FormBanner';
import { SuccessScreen } from '../components/form/SuccessScreen';
import { useSubmission } from '../hooks/useSubmission';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { firstError, isEmail, required } from '../lib/validation';
import type { ClubInterestInsert, ClubInterestRole } from '../types/tedx';

const ROLE_OPTIONS = ['Student', 'Faculty', 'Staff'] as const;

const FOCUS_AREAS = [
  'Public speaking',
  'Storytelling',
  'Idea development',
  'Discussion',
  'Debate',
  'Communication',
  'Speaker preparation',
];

interface FormState {
  name: string;
  email: string;
  role: ClubInterestRole | '';
  whyInterested: string;
  clubGoals: string;
  interestedInOrganizing: boolean;
  notifyIfApproved: boolean;
  additionalComments: string;
}

const INITIAL_STATE: FormState = {
  name: '',
  email: '',
  role: '',
  whyInterested: '',
  clubGoals: '',
  interestedInOrganizing: false,
  notifyIfApproved: true,
  additionalComments: '',
};

type Errors = Partial<Record<keyof FormState, string>>;

export function ClubInterestPage() {
  const [form, setForm] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState<Errors>({});
  const { status, error, run, isSubmitting, isSuccess } = useSubmission();

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  function validate(): boolean {
    const next: Errors = {
      name: firstError(required(form.name)),
      email: firstError(required(form.email), isEmail(form.email)),
      role: firstError(required(form.role)),
      whyInterested: firstError(required(form.whyInterested)),
      clubGoals: firstError(required(form.clubGoals)),
    };
    setErrors(next);
    return Object.values(next).every((v) => !v);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate() || !form.role) return;

    run(async () => {
      if (!isSupabaseConfigured || !supabase) {
        throw new Error(
          'This form is not connected to a database yet. Please try again later or reach out directly.',
        );
      }

      const payload: ClubInterestInsert = {
        name: form.name.trim(),
        email: form.email.trim(),
        role: form.role.toLowerCase() as ClubInterestRole,
        why_interested: form.whyInterested.trim(),
        club_goals: form.clubGoals.trim(),
        interested_in_organizing: form.interestedInOrganizing,
        notify_if_approved: form.notifyIfApproved,
        additional_comments: form.additionalComments.trim() || null,
      };

      const { error: insertError } = await supabase.from('tedx_club_interest').insert(payload);
      if (insertError) throw insertError;
    });
  }

  return (
    <ApplicationPageShell
      eyebrow="TEDx Club (exploring interest)"
      title="What if the ideas didn't stop at the event?"
      description="We're exploring whether there's enough interest to build a TEDx Club at Grambling, a potential student-led community for public speaking, storytelling, idea development, discussion, debate, communication, and speaker preparation. It doesn't exist yet. Telling us you're interested is how it might."
    >
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <SuccessScreen
            key="success"
            title="You're on the list."
            message="Thank you for becoming part of TEDxGramblingStateUniversity. If there's enough interest to build the Club, you'll be among the first to know, and you told us you'd like to help shape it from the start."
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
            className="flex flex-col gap-6"
          >
            {status === 'error' && error && <FormBanner message={error} />}

            <ul className="flex flex-wrap gap-2" aria-label="Areas the Club would focus on">
              {FOCUS_AREAS.map((area) => (
                <li
                  key={area}
                  className="rounded-full border border-black/10 px-3 py-1 text-[12px] font-medium text-black/60"
                >
                  {area}
                </li>
              ))}
            </ul>

            <div className="grid gap-5 sm:grid-cols-2">
              <TextField id="name" label="Name" required value={form.name} onChange={(v) => set('name', v)} error={errors.name} autoComplete="name" />
              <TextField id="email" label="Email" type="email" required value={form.email} onChange={(v) => set('email', v)} error={errors.email} autoComplete="email" />
            </div>

            <SelectField id="role" label="Student / Faculty / Staff" required options={ROLE_OPTIONS} value={form.role} onChange={(v) => set('role', v as ClubInterestRole)} error={errors.role} />

            <TextAreaField
              id="whyInterested"
              label="Why are you interested?"
              required
              rows={3}
              value={form.whyInterested}
              onChange={(v) => set('whyInterested', v)}
              error={errors.whyInterested}
            />
            <TextAreaField
              id="clubGoals"
              label="What would you like to get from a TEDx Club?"
              required
              rows={3}
              value={form.clubGoals}
              onChange={(v) => set('clubGoals', v)}
              error={errors.clubGoals}
            />

            <CheckboxField
              id="interestedInOrganizing"
              label="I'd be interested in helping organize future TEDx events."
              checked={form.interestedInOrganizing}
              onChange={(v) => set('interestedInOrganizing', v)}
            />
            <CheckboxField
              id="notifyIfApproved"
              label="Notify me if the Club moves forward."
              checked={form.notifyIfApproved}
              onChange={(v) => set('notifyIfApproved', v)}
            />

            <TextAreaField
              id="additionalComments"
              label="Additional Comments"
              rows={3}
              hint="Optional"
              value={form.additionalComments}
              onChange={(v) => set('additionalComments', v)}
            />

            <SubmitButton submitting={isSubmitting}>Count Me In</SubmitButton>
          </motion.form>
        )}
      </AnimatePresence>
    </ApplicationPageShell>
  );
}
