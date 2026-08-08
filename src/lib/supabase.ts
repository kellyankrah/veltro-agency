import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * True once real Supabase credentials are configured. Forms check this
 * before attempting a submission so the site degrades gracefully (a clear
 * inline message instead of a crash) in environments, like a preview
 * deploy, where env vars haven't been set yet.
 */
export const isSupabaseConfigured = Boolean(url && anonKey);

/**
 * Client for the TEDxGramblingStateUniversity tables/buckets living in an
 * existing, shared Supabase project. Every object this app touches is
 * namespaced (`tedx_` tables, `tedx-` buckets), see supabase/README.md.
 * `null` when unconfigured; callers must check `isSupabaseConfigured` first.
 */
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anonKey as string)
  : null;

if (!isSupabaseConfigured && import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.warn(
    '[tedx] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not set. Forms will render but submissions will fail gracefully. See supabase/README.md.',
  );
}
