import { supabase } from './supabase';

export type UploadBucket = 'tedx-resumes' | 'tedx-headshots';

/**
 * Uploads a file to the given bucket under a random, collision-proof path
 * and returns the storage object path (not a public URL; callers store
 * the path and resolve a URL only when/if they need one, e.g. a future
 * admin surface signing a private resume for review).
 */
export async function uploadApplicationFile(
  bucket: UploadBucket,
  file: File,
): Promise<string> {
  if (!supabase) {
    throw new Error('Supabase is not configured.');
  }

  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'bin';
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });

  if (error) throw error;
  return path;
}
