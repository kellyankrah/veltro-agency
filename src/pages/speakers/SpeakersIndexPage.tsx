import { Navigate } from 'react-router-dom';

/**
 * Placeholder for a future standalone speakers hub — see
 * src/pages/speakers/README.md. For now it simply sends visitors to the
 * landing page's Speakers section, which is the real, working experience.
 */
export function SpeakersIndexPage() {
  return <Navigate to="/#speakers" replace />;
}
