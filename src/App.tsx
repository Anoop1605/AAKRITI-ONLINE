import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ScrollTrigger } from './lib/gsap';
import { PetalCanvas } from './components/PetalCanvas';
import { IntroOverlay } from './components/IntroOverlay';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { EventDetailPage } from './pages/EventDetailPage';
import { RegistrationModal } from './components/RegistrationModal';

function AppContent() {
  const location = useLocation();
  const isDetailPage = location.pathname.startsWith('/events/');

  useEffect(() => {
    // Quality checklist: "ScrollTrigger.normalizeScroll(true) called once in App.tsx"
    ScrollTrigger.normalizeScroll(true);
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
    </Router>
  );
}

export default App;
