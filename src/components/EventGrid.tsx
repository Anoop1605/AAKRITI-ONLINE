import React, { useRef } from 'react';
import { categories } from '../data/events';
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

  const categoryKey = id as keyof typeof categories;
  const categoryInfo = categories[categoryKey];

  const districtLabels: Record<string, string> = {
    sports: 'SPORTS DISTRICT',
    management: 'MANAGEMENT DISTRICT',
    cultural: 'CULTURAL DISTRICT',
  };
  const districtLabel = districtLabels[id] || '';

  useGSAP(() => {
    if (!sectionRef.current || !gridRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
      }
    });

    // Staggered title entrance
    const titleChars = sectionRef.current.querySelectorAll('.grid-title-char');
    const subtitle = sectionRef.current.querySelector('.grid-subtitle');
    const tagline = sectionRef.current.querySelector('.grid-tagline');

    tl.fromTo(titleChars, 
      { opacity: 0, y: 20 },
      { 
        opacity: 1, y: 0, duration: 0.6, stagger: 0.03, ease: 'power2.out'
      }
    );

    if (subtitle) {
      tl.fromTo(subtitle,
        { opacity: 0, y: 12 },
        { opacity: 0.8, y: 0, duration: 0.4, ease: 'power2.out' },
        '-=0.25'
      );
    }

    if (tagline) {
      tl.fromTo(tagline,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.25'
      );
    }

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
        <div className="text-center mb-16 flex flex-col items-center justify-center">
          <h2 className="font-display font-bold text-gold text-[clamp(24px,5vw,48px)] tracking-wider flex justify-center flex-wrap gap-x-[0.3em] gap-y-2 mb-3">
            {title.split(' ').map((word, wordIdx) => (
              <span key={wordIdx} className="inline-block whitespace-nowrap">
                {word.split('').map((char, charIdx) => (
                  <span key={charIdx} className="grid-title-char inline-block opacity-0">
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h2>

          {districtLabel && (
            <div className="grid-subtitle opacity-0 font-sans font-medium text-xs tracking-[0.3em] text-text-ghost/85 uppercase mb-4">
              [ {districtLabel} ]
            </div>
          )}

          {categoryInfo?.subtitle && (
            <p className="grid-tagline opacity-0 font-body italic text-text-body text-[clamp(16px,2.5vw,20px)] max-w-xl leading-relaxed">
              "{categoryInfo.subtitle}"
            </p>
          )}
        </div>

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
