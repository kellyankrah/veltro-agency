import { Navigate, useParams } from 'react-router-dom';
import { ApplicationPageShell } from '../../components/ApplicationPageShell';
import { EditorialImage } from '../../components/EditorialImage';
import { SPEAKERS } from '../../data/speakers';

/**
 * A working dynamic route ahead of need, see src/pages/speakers/README.md.
 * Renders whatever fields a speaker entry has and gracefully omits the
 * rest, so this doesn't need to change as profiles get filled in over
 * time. Redirects away if the slug doesn't match anyone.
 */
export function SpeakerProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const speaker = SPEAKERS.find((s) => s.id === slug);

  if (!speaker) {
    return <Navigate to="/speakers" replace />;
  }

  return (
    <ApplicationPageShell eyebrow="Speaker" title={speaker.name} description={speaker.talkTitle}>
      <div className="flex flex-col gap-10">
        <EditorialImage src={speaker.photo} alt={speaker.name} variant="fade-up" className="aspect-[4/5] w-full max-w-sm" />

        <p className="text-[16px] leading-[1.7] text-black/70 md:text-[18px]">{speaker.bio}</p>

        {speaker.talkDescription && (
          <p className="text-[16px] leading-[1.7] text-black/70 md:text-[18px]">
            {speaker.talkDescription}
          </p>
        )}

        {speaker.videoEmbedUrl && (
          <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black">
            <iframe
              src={speaker.videoEmbedUrl}
              title={`${speaker.name}: ${speaker.talkTitle}`}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        )}

        {speaker.resources && speaker.resources.length > 0 && (
          <div>
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.15em] text-black/40">
              Resources
            </h2>
            <ul className="mt-3 flex flex-col gap-2">
              {speaker.resources.map((resource) => (
                <li key={resource.url}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-[15px] font-semibold text-[#EB0028] hover:underline"
                  >
                    {resource.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </ApplicationPageShell>
  );
}
