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
import GlobalCommsWidget from './components/GlobalCommsWidget';
import { WonderlaNoticeModal } from './components/WonderlaNoticeModal';

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
    let lastPingTime = 0;
    let throttleTimeout: ReturnType<typeof setTimeout> | null = null;
    const PING_INTERVAL = 10 * 60 * 1000; // 10 minutes

    const pingBackend = () => {
      lastPingTime = Date.now();
      fetch(`${baseApiUrl}/`)
        .then(() => console.log('Backend wake-up/keep-alive ping successful.'))
        .catch((err) => console.warn('Backend wake-up/keep-alive ping failed:', err));
    };

    // Immediate ping on mount
    pingBackend();

    // Listen to user interactions to keep the backend active
    const handleInteraction = () => {
      if (throttleTimeout) return;

      const now = Date.now();
      if (now - lastPingTime >= PING_INTERVAL) {
        pingBackend();
      }

      // Throttle interaction checks to once every 30 seconds
      throttleTimeout = setTimeout(() => {
        throttleTimeout = null;
      }, 30000);
    };

    const interactionEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    interactionEvents.forEach((event) => {
      window.addEventListener(event, handleInteraction, { passive: true });
    });

    return () => {
      if (throttleTimeout) {
        clearTimeout(throttleTimeout);
      }
      interactionEvents.forEach((event) => {
        window.removeEventListener(event, handleInteraction);
      });
    };
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
      <GlobalCommsWidget />
      <WonderlaNoticeModal />
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
