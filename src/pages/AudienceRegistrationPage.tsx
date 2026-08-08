import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ApplicationPageShell } from '../components/ApplicationPageShell';
import { TextField } from '../components/form/TextField';
import { TextAreaField } from '../components/form/TextAreaField';
import { SelectField } from '../components/form/SelectField';
import { CheckboxField } from '../components/form/CheckboxField';
import { SubmitButton } from '../components/form/SubmitButton';
import { PrivacyNote } from '../components/form/PrivacyNote';
import { FormBanner } from '../components/form/FormBanner';
import { SuccessScreen } from '../components/form/SuccessScreen';
import { useSubmission } from '../hooks/useSubmission';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { firstError, isEmail, required } from '../lib/validation';
import { CLASSIFICATION_OPTIONS, type AudienceRegistrationInsert } from '../types/tedx';

interface FormState {
  name: string;
  email: string;
  classification: string;
  major: string;
  accessibilityNeeds: string;
  newsletterOptIn: boolean;
}

const INITIAL_STATE: FormState = {
  name: '',
  email: '',
  classification: '',
  major: '',
  accessibilityNeeds: '',
  newsletterOptIn: false,
};

type Errors = Partial<Record<keyof FormState, string>>;

export function AudienceRegistrationPage() {
  const [form, setForm] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState<Errors>({});
  const { status, error, run, isSubmitting, isSuccess } = useSubmission();

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  function validate(): boolean {
    const next: Errors = {
      name: firstError(required(form.name)),
      email: firstError(required(form.email), isEmail(form.email)),
      classification: firstError(required(form.classification)),
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

      const payload: AudienceRegistrationInsert = {
        name: form.name.trim(),
        email: form.email.trim(),
        classification: form.classification,
        major: form.major.trim() || null,
        accessibility_needs: form.accessibilityNeeds.trim() || null,
        newsletter_opt_in: form.newsletterOptIn,
      };

      const { error: insertError } = await supabase.from('tedx_audience_registrations').insert(payload);
      if (insertError) throw insertError;
    });
  }

  return (
    <ApplicationPageShell
      eyebrow="Participate: Audience"
      title="Experience powerful ideas firsthand."
      description="Reserve your seat for the inaugural TEDxGramblingStateUniversity, Friday, October 23, 2026."
    >
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <SuccessScreen
            key="success"
            title="Your seat is saved."
            message="Thank you for becoming part of TEDxGramblingStateUniversity. We've reserved your place for October 23. Keep an eye on your inbox for details as the day gets closer."
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

            <div className="grid gap-5 sm:grid-cols-2">
              <TextField id="name" label="Name" required value={form.name} onChange={(v) => set('name', v)} error={errors.name} autoComplete="name" />
              <TextField id="email" label="Email" type="email" required value={form.email} onChange={(v) => set('email', v)} error={errors.email} autoComplete="email" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <SelectField
                id="classification"
                label="Classification"
                required
                options={CLASSIFICATION_OPTIONS}
                value={form.classification}
                onChange={(v) => set('classification', v)}
                error={errors.classification}
                hint="Student, faculty, staff, alumni, or community member."
              />
              <TextField id="major" label="Major" value={form.major} onChange={(v) => set('major', v)} />
            </div>
            <TextAreaField
              id="accessibilityNeeds"
              label="Special Accessibility Needs"
              rows={3}
              hint="Let us know how we can make the day work for you. Optional."
              value={form.accessibilityNeeds}
              onChange={(v) => set('accessibilityNeeds', v)}
            />
            <CheckboxField
              id="newsletterOptIn"
              label="Keep me updated about TEDxGramblingStateUniversity news and future events."
              checked={form.newsletterOptIn}
              onChange={(v) => set('newsletterOptIn', v)}
            />

            <PrivacyNote />
            <SubmitButton submitting={isSubmitting}>Reserve My Seat</SubmitButton>
          </motion.form>
        )}
      </AnimatePresence>
    </ApplicationPageShell>
  );
}
