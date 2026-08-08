import { useRef, useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Standardizes the submitting/success/error lifecycle shared by every
 * application form.
 *
 * Guards against duplicate submissions with a synchronous `useRef` flag,
 * not just the `disabled` attribute the UI derives from `isSubmitting`.
 * React state updates aren't reflected in the DOM until the next render,
 * so several clicks (or taps) that land within the same tick, before that
 * re-render happens, would otherwise all pass the "is it disabled yet?"
 * check and each fire their own insert. The ref is set immediately, in
 * the same synchronous call, so only the first of any rapid burst ever
 * reaches the network.
 */
export function useSubmission() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const inFlight = useRef(false);

  async function run(fn: () => Promise<void>) {
    if (inFlight.current) return;
    inFlight.current = true;

    setStatus('submitting');
    setError(null);
    try {
      await fn();
      setStatus('success');
    } catch (e) {
      setStatus('error');
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    } finally {
      inFlight.current = false;
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
