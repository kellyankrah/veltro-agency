import { useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/** Standardizes the submitting/success/error lifecycle shared by every application form. */
export function useSubmission() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function run(fn: () => Promise<void>) {
    setStatus('submitting');
    setError(null);
    try {
      await fn();
      setStatus('success');
    } catch (e) {
      setStatus('error');
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    }
  }

  return {
    status,
    error,
    run,
    isSubmitting: status === 'submitting',
    isSuccess: status === 'success',
  };
}
