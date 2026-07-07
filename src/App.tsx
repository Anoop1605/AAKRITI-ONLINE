import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
    // Quality checklist: "ScrollTrigger.normalizeScroll(true) called once in App.tsx"
    ScrollTrigger.normalizeScroll(true);

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
      <AppContent />
      <Analytics />
    </Router>
  );
}

export default App;
