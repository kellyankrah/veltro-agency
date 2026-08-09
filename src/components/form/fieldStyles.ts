/** Shared class strings for the application-form field components. */

export const labelClass = 'mb-2 block text-[14px] font-semibold text-black';

export const hintClass = 'mt-1.5 text-[13px] text-black/50';

export const errorClass = 'mt-1.5 text-[13px] font-medium text-[#EB0028]';

export const requiredMarkClass = 'text-[#EB0028]';

export function inputClass(hasError: boolean): string {
  return [
    'w-full rounded-lg border bg-white px-4 py-3 text-[15px] text-black',
    'placeholder:text-black/35 transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-[#EB0028]/30',
    hasError ? 'border-[#EB0028] focus:border-[#EB0028]' : 'border-black/15 focus:border-[#EB0028]',
  ].join(' ');
}
