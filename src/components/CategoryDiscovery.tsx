import React, { useRef } from 'react';
import { Swords, Flame, Scroll } from 'lucide-react';
import { useCategoryAnimation } from '../hooks/animations/useCategoryAnimation';
import { categories } from '../data/events';

export const CategoryDiscovery: React.FC = () => {
  const pinSectionRef = useRef<HTMLElement>(null);
  // We now need a ref for each individual card to animate them sequentially
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

  useCategoryAnimation(pinSectionRef, panelsRef);

  const panels = [
    {
      id: 'sports',
      title: 'THE BREATHING DISTRICTS',
      tagline: categories.sports.subtitle,
      icon: <Swords size={64} className="text-[#D4A054] mb-8" />,
      bgClass: 'bg-gradient-to-b from-[#160F14] to-[#0D0810]',
      shadowClass: 'shadow-[inset_0_0_150px_rgba(212,160,84,0.05)]'
    },
    {
      id: 'management',
      title: 'THE COUNCIL GROUNDS',
      tagline: categories.management.subtitle,
      icon: <Scroll size={64} className="text-[#8B5E1A] mb-8" />,
      bgClass: 'bg-gradient-to-b from-[#1A1208] to-[#050407]',
      shadowClass: 'shadow-[inset_0_0_150px_rgba(139,94,26,0.05)]'
    },
    {
      id: 'cultural',
      title: 'THE FESTIVAL REALMS',
      tagline: categories.cultural.subtitle,
      icon: <Flame size={64} className="text-[#C0392B] mb-8" />,
      bgClass: 'bg-gradient-to-b from-[#1A0A0A] to-[#050407]',
      shadowClass: 'shadow-[inset_0_0_150px_rgba(192,57,43,0.05)]'
    }
  ];

  return (
    <section 
      ref={pinSectionRef} 
      className="relative w-full h-[100svh] overflow-hidden bg-void"
      style={{ perspective: '1200px' }}
    >
      {panels.map((panel, i) => (
        <div 
          key={panel.id} 
          ref={el => { panelsRef.current[i] = el; }}
          // Stack them absolutely. 
          className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center ${panel.bgClass} ${panel.shadowClass}`}
          // Z-index trick: Length(3) - index(0) = 3. So the first item is naturally on top!
          style={{ zIndex: panels.length - i, transformOrigin: 'bottom center' }}
        >
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22 opacity=%220.6%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]"></div>
          
          <div className="flex flex-col items-center text-center px-4 z-10">
            {panel.icon}
            <h2 className="font-display font-bold text-text-primary text-[clamp(32px,6vw,64px)] tracking-wider mb-2">
              {panel.title}
            </h2>
            
            <div className="font-sans font-medium text-xs md:text-sm tracking-[0.3em] text-text-ghost/85 uppercase mb-4">
              [ {panel.id === 'sports' ? 'SPORTS DISTRICT' : panel.id === 'management' ? 'MANAGEMENT DISTRICT' : 'CULTURAL DISTRICT'} ]
            </div>

            <p className="font-body italic text-text-body text-[clamp(18px,3vw,24px)]">
              "{panel.tagline}"
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};
