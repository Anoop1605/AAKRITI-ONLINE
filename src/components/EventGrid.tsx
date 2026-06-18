import React, { useRef } from 'react';
import type { Event } from '../data/events';
import { EventCard } from './EventCard';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';

interface EventGridProps {
  title: string;
  events: Event[];
  id: string;
}

export const EventGrid: React.FC<EventGridProps> = ({ title, events, id }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !gridRef.current) return;

    // Staggered title entrance
    const titleChars = sectionRef.current.querySelectorAll('.grid-title-char');
    gsap.fromTo(titleChars, 
      { opacity: 0, y: 20 },
      { 
        opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        }
      }
    );

    // Staggered cards entrance
    const cards = gridRef.current.querySelectorAll('.event-card-wrapper');
    gsap.fromTo(cards,
      { y: 60, opacity: 0, rotateX: 8 },
      {
        y: 0, opacity: 1, rotateX: 0,
        duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, []);

  return (
    <section id={id} ref={sectionRef} className="w-full py-24 px-4 bg-void relative z-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display font-bold text-gold text-[clamp(28px,6vw,48px)] text-center mb-16 tracking-wider flex justify-center flex-wrap">
          {title.split('').map((char, i) => (
            <span key={i} className="grid-title-char inline-block opacity-0">
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h2>

        <div 
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 [perspective:1000px]"
        >
          {events.map((event) => (
            <div key={event.id} className="event-card-wrapper opacity-0">
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
