const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /^https?:\/\/.+\..+/i;

export function required(value: string, message = 'This field is required.'): string | undefined {
  return value.trim() ? undefined : message;
}

export function isEmail(value: string, message = 'Enter a valid email address.'): string | undefined {
  if (!value.trim()) return undefined;
  return EMAIL_RE.test(value.trim()) ? undefined : message;
}

export function isUrl(value: string, message = 'Enter a full URL, starting with https://'): string | undefined {
  if (!value.trim()) return undefined;
  return URL_RE.test(value.trim()) ? undefined : message;
}

export function maxWords(value: string, limit: number, message?: string): string | undefined {
  const count = value.trim().split(/\s+/).filter(Boolean).length;
  if (!value.trim() || count <= limit) return undefined;
  return message ?? `Keep it to ${limit} words or fewer (currently ${count}).`;
}

export function maxFileSize(file: File, maxMb: number, message?: string): string | undefined {
  const maxBytes = maxMb * 1024 * 1024;
  if (file.size <= maxBytes) return undefined;
  return message ?? `File must be smaller than ${maxMb}MB.`;
}

/** Runs each validator for a field in order, returning the first error found. */
export function firstError(...validators: Array<string | undefined>): string | undefined {
  return validators.find(Boolean);
}
