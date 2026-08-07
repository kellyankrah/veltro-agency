import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ApplicationPageShell } from '../components/ApplicationPageShell';
import { TextField } from '../components/form/TextField';
import { TextAreaField } from '../components/form/TextAreaField';
import { SelectField } from '../components/form/SelectField';
import { CheckboxGroupField } from '../components/form/CheckboxGroupField';
import { SubmitButton } from '../components/form/SubmitButton';
import { FormBanner } from '../components/form/FormBanner';
import { SuccessScreen } from '../components/form/SuccessScreen';
import { useSubmission } from '../hooks/useSubmission';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { firstError, isEmail, required } from '../lib/validation';
import { CLASSIFICATION_OPTIONS, VOLUNTEER_INTEREST_AREAS, type VolunteerApplicationInsert } from '../types/tedx';

interface FormState {
  name: string;
  email: string;
  phone: string;
  classification: string;
  major: string;
  areasOfInterest: string[];
  availability: string;
  experience: string;
  whyVolunteer: string;
}

const INITIAL_STATE: FormState = {
  name: '',
  email: '',
  phone: '',
  classification: '',
  major: '',
  areasOfInterest: [],
  availability: '',
  experience: '',
  whyVolunteer: '',
};

type Errors = Partial<Record<keyof FormState, string>>;

export function VolunteerApplicationPage() {
  const [form, setForm] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState<Errors>({});
  const { status, error, run, isSubmitting, isSuccess } = useSubmission();

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  function validate(): boolean {
    const next: Errors = {
      name: firstError(required(form.name)),
      email: firstError(required(form.email), isEmail(form.email)),
      phone: firstError(required(form.phone)),
      classification: firstError(required(form.classification)),
      areasOfInterest: form.areasOfInterest.length ? undefined : 'Choose at least one area.',
      availability: firstError(required(form.availability)),
      whyVolunteer: firstError(required(form.whyVolunteer)),
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

      const payload: VolunteerApplicationInsert = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        classification: form.classification,
        major: form.major.trim() || null,
        areas_of_interest: form.areasOfInterest,
        availability: form.availability.trim(),
        experience: form.experience.trim() || null,
        why_volunteer: form.whyVolunteer.trim(),
      };

      const { error: insertError } = await supabase.from('tedx_volunteer_applications').insert(payload);
      if (insertError) throw insertError;
    });
  }

  return (
    <ApplicationPageShell
      eyebrow="Participate — Volunteer"
      title="Help create an unforgettable TEDx experience."
      description="Our volunteers are the reason the day runs beautifully. Tell us where you'd like to help."
    >
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <SuccessScreen
            key="success"
            title="You're signed up."
            message="Thank you for offering your time to TEDxGramblingStateUniversity. Our volunteer team will reach out by email with next steps as the event approaches."
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
              <TextField id="phone" label="Phone" type="tel" required value={form.phone} onChange={(v) => set('phone', v)} error={errors.phone} autoComplete="tel" />
              <SelectField id="classification" label="Classification" required options={CLASSIFICATION_OPTIONS} value={form.classification} onChange={(v) => set('classification', v)} error={errors.classification} />
            </div>
            <TextField id="major" label="Major" value={form.major} onChange={(v) => set('major', v)} />

            <CheckboxGroupField
              legend="Areas of Interest"
              required
              options={VOLUNTEER_INTEREST_AREAS}
              values={form.areasOfInterest}
              onChange={(v) => set('areasOfInterest', v)}
              error={errors.areasOfInterest}
            />

            <TextField
              id="availability"
              label="Availability"
              required
              placeholder="e.g. Full day, mornings only, setup the night before…"
              value={form.availability}
              onChange={(v) => set('availability', v)}
              error={errors.availability}
            />
            <TextAreaField id="experience" label="Experience" rows={3} hint="Any relevant experience — optional." value={form.experience} onChange={(v) => set('experience', v)} />
            <TextAreaField
              id="whyVolunteer"
              label="Why do you want to volunteer?"
              required
              rows={4}
              value={form.whyVolunteer}
              onChange={(v) => set('whyVolunteer', v)}
              error={errors.whyVolunteer}
            />

            <SubmitButton submitting={isSubmitting}>Submit Application</SubmitButton>
          </motion.form>
        )}
      </AnimatePresence>
    </ApplicationPageShell>
  );
}
