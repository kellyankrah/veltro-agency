import { Hero } from '../components/Hero';
import { WelcomeVideo } from '../components/WelcomeVideo';
import { About } from '../components/About';
import { Participate } from '../components/Participate';
import { Roadmap } from '../components/Roadmap';
import { Speakers } from '../components/Speakers';
import { TEDxClub } from '../components/TEDxClub';
import { FAQ } from '../components/FAQ';
import { Organizer } from '../components/Organizer';
import { FinalCTA } from '../components/FinalCTA';

export function LandingPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <WelcomeVideo />
      <About />
      <Participate />
      <Roadmap />
      <Speakers />
      <TEDxClub />
      <FAQ />
      <Organizer />
      <FinalCTA />
    </main>
  );
}
