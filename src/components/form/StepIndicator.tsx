interface Step {
  number: string;
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentIndex: number;
}

/** A minimal "01 About You  02 Your Idea  03 Supporting Material" progress header. */
export function StepIndicator({ steps, currentIndex }: StepIndicatorProps) {
  return (
    <ol className="flex flex-wrap items-center gap-x-6 gap-y-2" aria-label="Application progress">
      {steps.map((step, i) => {
        const state = i < currentIndex ? 'done' : i === currentIndex ? 'current' : 'upcoming';
        return (
          <li key={step.number} className="flex items-center gap-2" aria-current={state === 'current' ? 'step' : undefined}>
            <span
              className={`text-[13px] font-bold tabular-nums ${
                state === 'upcoming' ? 'text-black/25' : 'text-[#EB0028]'
              }`}
            >
              {step.number}
            </span>
            <span
              className={`text-[13px] font-semibold uppercase tracking-wide ${
                state === 'upcoming' ? 'text-black/25' : state === 'current' ? 'text-black' : 'text-black/40'
              }`}
            >
              {step.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
