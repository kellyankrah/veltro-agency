import { errorClass, requiredMarkClass } from './fieldStyles';

interface CheckboxGroupFieldProps {
  legend: string;
  options: readonly string[];
  values: string[];
  onChange: (values: string[]) => void;
  error?: string;
  required?: boolean;
}

/** A labeled group of checkboxes backed by a string[] (e.g. volunteer interest areas). */
export function CheckboxGroupField({
  legend,
  options,
  values,
  onChange,
  error,
  required,
}: CheckboxGroupFieldProps) {
  const toggle = (option: string, checked: boolean) => {
    onChange(checked ? [...values, option] : values.filter((v) => v !== option));
  };

  return (
    <fieldset>
      <legend className="mb-3 text-[14px] font-semibold text-black">
        {legend}
        {required && (
          <span className={requiredMarkClass} aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </legend>
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
        {options.map((option) => {
          const id = `interest-${option.toLowerCase().replace(/\s+/g, '-')}`;
          const checked = values.includes(option);
          return (
            <label
              key={option}
              htmlFor={id}
              className="flex cursor-pointer items-start gap-2 text-[14px] text-black"
            >
              <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={(e) => toggle(option, e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-black/25 text-[#EB0028] focus:ring-2 focus:ring-[#EB0028]/30"
              />
              <span>{option}</span>
            </label>
          );
        })}
      </div>
      {error && (
        <p role="alert" className={errorClass}>
          {error}
        </p>
      )}
    </fieldset>
  );
}
