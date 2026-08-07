import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ApplicationPageShell } from '../components/ApplicationPageShell';
import { TextField } from '../components/form/TextField';
import { TextAreaField } from '../components/form/TextAreaField';
import { SelectField } from '../components/form/SelectField';
import { SubmitButton } from '../components/form/SubmitButton';
import { FormBanner } from '../components/form/FormBanner';
import { SuccessScreen } from '../components/form/SuccessScreen';
import { useSubmission } from '../hooks/useSubmission';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { firstError, isEmail, required } from '../lib/validation';
import { CLASSIFICATION_OPTIONS, type ClubInterestInsert } from '../types/tedx';

interface FormState {
  name: string;
  email: string;
  classification: string;
  major: string;
  clubIdeas: string;
}

const INITIAL_STATE: FormState = {
  name: '',
  email: '',
  classification: '',
  major: '',
  clubIdeas: '',
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

      const payload: ClubInterestInsert = {
        name: form.name.trim(),
        email: form.email.trim(),
        classification: form.classification,
        major: form.major.trim() || null,
        club_ideas: form.clubIdeas.trim() || null,
      };

      const { error: insertError } = await supabase.from('tedx_club_interest').insert(payload);
      if (insertError) throw insertError;
    });
  }

  return (
    <ApplicationPageShell
      eyebrow="TEDx Club"
      title="Great conversations shouldn't happen only once a year."
      description="Register your interest in the TEDxGramblingStateUniversity Club — a year-round community for ideas, TED Talks, and public speaking practice."
    >
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <SuccessScreen
            key="success"
            title="You're on the list."
            message="We'll be in touch as the TEDx Club comes to life — thank you for helping shape it."
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
              <SelectField id="classification" label="Classification" required options={CLASSIFICATION_OPTIONS} value={form.classification} onChange={(v) => set('classification', v)} error={errors.classification} />
              <TextField id="major" label="Major" value={form.major} onChange={(v) => set('major', v)} />
            </div>
            <TextAreaField
              id="clubIdeas"
              label="What would you like to see in a TEDx Club?"
              rows={4}
              hint="Optional, but we'd love to hear it."
              value={form.clubIdeas}
              onChange={(v) => set('clubIdeas', v)}
            />

            <SubmitButton submitting={isSubmitting}>I'm Interested</SubmitButton>
          </motion.form>
        )}
      </AnimatePresence>
    </ApplicationPageShell>
  );
}
