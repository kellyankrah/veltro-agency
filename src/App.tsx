import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { ScrollToHash } from './components/ScrollToHash';
import { LoadingScreen } from './components/LoadingScreen';
import { LandingPage } from './pages/LandingPage';

// Route-level code splitting: most visitors only ever see the landing
// page, so the four application forms (and their Supabase/upload code)
// stay out of that initial bundle and load on demand when navigated to.
const SpeakerApplicationPage = lazy(() =>
  import('./pages/SpeakerApplicationPage').then((m) => ({ default: m.SpeakerApplicationPage })),
);
const VolunteerApplicationPage = lazy(() =>
  import('./pages/VolunteerApplicationPage').then((m) => ({ default: m.VolunteerApplicationPage })),
);
const AudienceRegistrationPage = lazy(() =>
  import('./pages/AudienceRegistrationPage').then((m) => ({ default: m.AudienceRegistrationPage })),
);
const ClubInterestPage = lazy(() =>
  import('./pages/ClubInterestPage').then((m) => ({ default: m.ClubInterestPage })),
);
// Future-facing routes (see src/pages/speakers/README.md), architecture
// only for now, linked from nowhere yet.
const SpeakersIndexPage = lazy(() =>
  import('./pages/speakers/SpeakersIndexPage').then((m) => ({ default: m.SpeakersIndexPage })),
);
const SpeakerProfilePage = lazy(() =>
  import('./pages/speakers/SpeakerProfilePage').then((m) => ({ default: m.SpeakerProfilePage })),
);

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white" aria-busy="true">
      <span
        className="h-6 w-6 animate-spin rounded-full border-2 border-black/15 border-t-[#EB0028]"
        aria-hidden="true"
      />
      <span className="sr-only">Loading…</span>
    </div>
  );
}

function App() {
  return (
    <>
      <LoadingScreen />
      <ScrollToHash />
      <Navigation />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/speaker" element={<SpeakerApplicationPage />} />
          <Route path="/volunteer" element={<VolunteerApplicationPage />} />
          <Route path="/audience" element={<AudienceRegistrationPage />} />
          <Route path="/club" element={<ClubInterestPage />} />
          <Route path="/speakers" element={<SpeakersIndexPage />} />
          <Route path="/speakers/:slug" element={<SpeakerProfilePage />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
