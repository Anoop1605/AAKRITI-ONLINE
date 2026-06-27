import React, { useRef } from 'react';
import { Swords, Flame, Scroll } from 'lucide-react';
import { useCategoryAnimation } from '../hooks/animations/useCategoryAnimation';
import { categories } from '../data/events';

export const CategoryDiscovery: React.FC = () => {
  const pinSectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useCategoryAnimation(pinSectionRef, trackRef);

  const panels = [
    {
      id: 'sports',
      title: categories.sports.title,
      tagline: categories.sports.subtitle,
      icon: <Swords size={64} className="text-[#D4A054] mb-8" />,
      bgClass: 'bg-gradient-to-b from-[#160F14] to-[#0D0810]',
      shadowClass: 'shadow-[inset_0_0_150px_rgba(212,160,84,0.05)]'
    },
    {
      id: 'management',
      title: categories.management.title,
      tagline: categories.management.subtitle,
      icon: <Scroll size={64} className="text-[#8B5E1A] mb-8" />,
      bgClass: 'bg-gradient-to-b from-[#1A1208] to-[#050407]',
      shadowClass: 'shadow-[inset_0_0_150px_rgba(139,94,26,0.05)]'
    },
    {
      id: 'cultural',
      title: categories.cultural.title,
      tagline: categories.cultural.subtitle,
      icon: <Flame size={64} className="text-[#C0392B] mb-8" />,
      bgClass: 'bg-gradient-to-b from-[#1A0A0A] to-[#050407]',
      shadowClass: 'shadow-[inset_0_0_150px_rgba(192,57,43,0.05)]'
    }
  ];

  return (
    <section ref={pinSectionRef} className="category-pin-section relative w-full h-[100svh] overflow-hidden bg-void">
      <div 
        ref={trackRef} 
        className="category-track absolute top-0 left-0 h-full flex"
        style={{ width: '300vw' }}
      >
        {panels.map((panel, i) => (
          <div 
            key={panel.id} 
            className={`w-[100vw] h-full flex flex-col items-center justify-center relative ${panel.bgClass} ${panel.shadowClass}`}
          >
            {/* Background texture noise */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22 opacity=%220.6%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]"></div>
            
            <div className="panel-content flex flex-col items-center text-center px-4 z-10" style={{ opacity: i === 0 ? 1 : 0 }}>
              {panel.icon}
              <h2 className="font-display font-bold text-text-primary text-[clamp(32px,6vw,64px)] tracking-wider mb-4">
                {panel.title}
              </h2>
              <p className="font-body italic text-text-body text-[clamp(18px,3vw,24px)]">
                "{panel.tagline}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
