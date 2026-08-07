import { errorClass, hintClass, inputClass } from './fieldStyles';

interface TextAreaFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  hint?: string;
  rows?: number;
}

export function TextAreaField({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  required,
  hint,
  rows = 5,
}: TextAreaFieldProps) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <label htmlFor={id} className="block text-[14px] font-semibold text-black">
          {label}
          {required && (
            <span className="text-[#EB0028]" aria-hidden="true">
              {' '}
              *
            </span>
          )}
        </label>
        <span className="text-[12px] text-black/40" aria-hidden="true">
          {wordCount} words
        </span>
      </div>
      <textarea
        id={id}
        name={id}
        value={value}
        placeholder={placeholder}
        required={required}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        className={inputClass(Boolean(error)) + ' resize-y'}
      />
      {hint && !error && (
        <p id={hintId} className={hintClass}>
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className={errorClass}>
          {error}
        </p>
      )}
    </div>
  );
}
