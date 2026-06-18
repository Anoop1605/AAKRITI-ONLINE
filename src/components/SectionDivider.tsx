import React, { useRef } from 'react';
import { Flame } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';

export const SectionDivider: React.FC = () => {
  const lanternRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    if (lanternRef.current) {
      gsap.to(lanternRef.current, {
        rotation: 6,
        duration: 2.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        transformOrigin: 'top center'
      });
    }
  }, []);

  return (
    <div className="w-full flex items-center justify-center py-20 relative bg-void">
      <div className="absolute left-0 w-[45%] h-px bg-gradient-to-r from-transparent to-gold/40" />
      <div 
        ref={lanternRef}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="w-px h-6 bg-gold/50" />
        <div className="p-2 border border-gold/30 rounded-full bg-stone-mid/50 backdrop-blur-sm text-gold-bright shadow-[0_0_15px_rgba(240,192,112,0.15)]">
          <Flame size={20} className="opacity-80" />
        </div>
      </div>
      <div className="absolute right-0 w-[45%] h-px bg-gradient-to-l from-transparent to-gold/40" />
    </div>
  );
};
