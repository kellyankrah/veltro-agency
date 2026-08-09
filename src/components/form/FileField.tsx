import { useRef } from 'react';
import { errorClass, hintClass, labelClass, requiredMarkClass } from './fieldStyles';

interface FileFieldProps {
  id: string;
  label: string;
  file: File | null;
  onChange: (file: File | null) => void;
  accept: string;
  hint?: string;
  error?: string;
  required?: boolean;
}

export function FileField({ id, label, file, onChange, accept, hint, error, required }: FileFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && (
          <span className={requiredMarkClass} aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="rounded-lg border border-black/15 bg-white px-4 py-2.5 text-[14px] font-semibold text-black transition-colors duration-200 hover:border-black/40"
        >
          {file ? 'Replace file' : 'Choose file'}
        </button>
        <span className="text-[14px] text-black/60">{file ? file.name : 'No file selected'}</span>
        {file && (
          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label={`Remove ${label}`}
            className="text-[13px] font-medium text-[#EB0028] hover:underline"
          >
            Remove
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        id={id}
        name={id}
        type="file"
        accept={accept}
        className="sr-only"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
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
