import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { WelcomeVideo } from './components/WelcomeVideo';
import { About } from './components/About';
import { Participate } from './components/Participate';
import { Roadmap } from './components/Roadmap';
import { TEDxClub } from './components/TEDxClub';
import { FAQ } from './components/FAQ';
import { Organizer } from './components/Organizer';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';

function App() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <Hero />
        <WelcomeVideo />
        <About />
        <Participate />
        <Roadmap />
        <TEDxClub />
        <FAQ />
        <Organizer />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

export default App;
