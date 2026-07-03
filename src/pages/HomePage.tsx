import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { CategoryDiscovery } from '../components/CategoryDiscovery';
import { SectionDivider } from '../components/SectionDivider';
import { EventGrid } from '../components/EventGrid';
import { CTABanner } from '../components/CTABanner';
import { Footer } from '../components/Footer';
import { events, categories } from '../data/events';

export const HomePage = () => {
  const location = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (navType === 'POP') return;

    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Wait a short delay for elements and scrolltrigger to settle
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [location.hash, navType]);

  const sportsEvents = events.filter(e => e.category === 'sports');
  const culturalEvents = events.filter(e => e.category === 'cultural');
  const managementEvents = events.filter(e => e.category === 'management');

  return (
    <main className="relative z-10 bg-transparent">
      <Hero />
      
      {/* Three Pillars Reveal Header */}
      <section className="w-full py-24 flex items-center justify-center bg-void">
        <h2 className="font-display text-text-primary text-[clamp(24px,5vw,40px)] tracking-widest uppercase opacity-80">
          Three Realms Await
        </h2>
      </section>

      <CategoryDiscovery />
      
      <SectionDivider />
      <EventGrid id="sports" title={categories.sports.title} events={sportsEvents} />
      
      <SectionDivider />
      <EventGrid id="management" title={categories.management.title} events={managementEvents} />
      
      <SectionDivider />
      <EventGrid id="cultural" title={categories.cultural.title} events={culturalEvents} />
      
      {/* Final Registration CTA */}
      <CTABanner />
      
      <Footer />
    </main>
  );
};
