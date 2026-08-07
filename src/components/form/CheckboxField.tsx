interface CheckboxFieldProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  required?: boolean;
}

/** A single standalone checkbox, e.g. a newsletter opt-in or terms agreement. */
export function CheckboxField({ id, label, checked, onChange, error, required }: CheckboxFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-[14px] text-black">
        <input
          id={id}
          name={id}
          type="checkbox"
          checked={checked}
          required={required}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-black/25 text-[#EB0028] focus:ring-2 focus:ring-[#EB0028]/30"
        />
        <span>{label}</span>
      </label>
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-[13px] font-medium text-[#EB0028]">
          {error}
        </p>
      )}
    </div>
  );
}
