-- TEDxGramblingStateUniversity: storage buckets for speaker uploads
--
-- Two buckets, both namespaced with the tedx- prefix so they can't collide
-- with anything an existing project (e.g. FieldMind) already has:
--
--   tedx-resumes    private, never publicly readable, insert-only from
--                    the client. A future admin surface would read these
--                    via the service role key or a signed URL.
--   tedx-headshots  public read; headshots are expected to appear
--                    publicly later on the Speakers section, so reads are
--                    open while writes stay insert-only.

insert into storage.buckets (id, name, public)
values
  ('tedx-resumes', 'tedx-resumes', false),
  ('tedx-headshots', 'tedx-headshots', true)
on conflict (id) do nothing;

drop policy if exists tedx_resumes_insert on storage.objects;
create policy tedx_resumes_insert
  on storage.objects
  for insert
  to anon, authenticated
  with check (bucket_id = 'tedx-resumes');

drop policy if exists tedx_headshots_insert on storage.objects;
create policy tedx_headshots_insert
  on storage.objects
  for insert
  to anon, authenticated
  with check (bucket_id = 'tedx-headshots');

drop policy if exists tedx_headshots_select on storage.objects;
create policy tedx_headshots_select
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'tedx-headshots');
