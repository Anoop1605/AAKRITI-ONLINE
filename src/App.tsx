import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (navType !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [pathname, navType]);

  return null;
}
import { ScrollTrigger } from './lib/gsap';
import { PetalCanvas } from './components/PetalCanvas';
import { IntroOverlay } from './components/IntroOverlay';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { EventDetailPage } from './pages/EventDetailPage';
import { RegistrationModal } from './components/RegistrationModal';
import { Analytics } from '@vercel/analytics/react';

function AppContent() {
  const location = useLocation();
  const isDetailPage = location.pathname.startsWith('/events/');

  useEffect(() => {
    // Only enable normalizeScroll immediately if the intro has already played.
    // If the intro is running, IntroOverlay will enable it when the animation finishes.
    const introAlreadyPlayed = sessionStorage.getItem('introPlayed');
    if (introAlreadyPlayed) {
      ScrollTrigger.normalizeScroll(true);
    }

    // Ping backend health check to wake/spin up the server
    const baseApiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';
    fetch(`${baseApiUrl}/health`)
      .then(() => console.log('Backend wake-up ping successful.'))
      .catch((err) => console.warn('Backend wake-up ping failed:', err));
  }, []);

  return (
    <>
      <PetalCanvas />
      <IntroOverlay />
      
      {/* Conditionally hide Navbar on detail pages */}
      {!isDetailPage && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events/:eventId" element={<EventDetailPage />} />
      </Routes>

      <RegistrationModal />
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
      <Analytics />
    </Router>
  );
}

export default App;
